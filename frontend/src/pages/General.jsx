import { Info, ExternalLink, BookOpen, HelpCircle, Mail, Phone, FileText } from 'lucide-react';

const General = () => {
  const infoCards = [
    {
      id: 1,
      icon: BookOpen,
      title: 'מדריכים והדרכות',
      description: 'מדריכים מפורטים לשימוש במערכת',
      color: 'blue',
      link: '#'
    },
    {
      id: 2,
      icon: HelpCircle,
      title: 'שאלות נפוצות',
      description: 'תשובות לשאלות הנפוצות ביותר',
      color: 'purple',
      link: '#'
    },
    {
      id: 3,
      icon: FileText,
      title: 'מסמכים רשמיים',
      description: 'נהלים, טפסים ומסמכים רשמיים',
      color: 'orange',
      link: '#'
    },
    {
      id: 4,
      icon: Mail,
      title: 'צור קשר',
      description: 'שלח פנייה לתמיכה הטכנית',
      color: 'green',
      link: 'mailto:support@organization.com'
    },
    {
      id: 5,
      icon: Phone,
      title: 'מוקד תמיכה',
      description: 'טלפון: 03-1234567',
      color: 'red',
      link: 'tel:031234567'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-500', hover: 'hover:bg-blue-50' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-500', hover: 'hover:bg-purple-50' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-500', hover: 'hover:bg-orange-50' },
      green: { bg: 'bg-green-500', text: 'text-green-500', hover: 'hover:bg-green-50' },
      red: { bg: 'bg-red-500', text: 'text-red-500', hover: 'hover:bg-red-50' }
    };
    return colorMap[color];
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Info size={32} className="text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">מידע כללי</h1>
            <p className="text-slate-600 mt-1">משאבים, מדריכים וקישורים שימושיים</p>
          </div>
        </div>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {infoCards.map((card) => {
          const IconComponent = card.icon;
          const colors = getColorClasses(card.color);

          return (
            <a
              key={card.id}
              href={card.link}
              className={`group bg-white border-2 border-slate-200 rounded-lg p-6 transition-all ${colors.hover} hover:border-slate-300 hover:shadow-md block`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${colors.bg}/10 group-hover:scale-110 transition-transform flex-shrink-0`}>
                  <IconComponent size={24} className={colors.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-slate-800 group-hover:text-slate-900">
                      {card.title}
                    </h3>
                    <ExternalLink size={14} className="text-slate-400 group-hover:text-slate-600" />
                  </div>
                  <p className="text-sm text-slate-600">{card.description}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Quick Info Section */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">מידע מהיר</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-slate-700 mb-2">שעות פעילות</h3>
            <p className="text-sm text-slate-600">ראשון - חמישי: 08:00 - 17:00</p>
            <p className="text-sm text-slate-600">שישי: 08:00 - 13:00</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-700 mb-2">פרטי התקשרות</h3>
            <p className="text-sm text-slate-600">טלפון: 03-1234567</p>
            <p className="text-sm text-slate-600">דוא״ל: info@organization.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
