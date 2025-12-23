import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Users, Laptop, Truck, DollarSign,
  Network, Phone, Calendar, BookOpen, FileText
} from 'lucide-react';
import { getDepartmentById } from '../../services/mockData';

const DeptStandard = () => {
  const { departmentId } = useParams();
  const [department, setDepartment] = useState(null);

  const iconMap = {
    Users, Laptop, Truck, DollarSign, GitBranch: Users, FileText, Map: FileText, Building2: Users
  };

  useEffect(() => {
    const fetchDepartment = async () => {
      const data = await getDepartmentById(departmentId);
      setDepartment(data);
    };
    fetchDepartment();
  }, [departmentId]);

  const standardActions = [
    { id: 1, name: 'היררכיה', icon: Network, color: 'from-blue-500 to-blue-600', description: 'מבנה ארגוני ותפקידים' },
    { id: 2, name: 'פרטי התקשרות', icon: Phone, color: 'from-purple-500 to-purple-600', description: 'אנשי קשר ומידע' },
    { id: 3, name: 'לוח אירועים', icon: Calendar, color: 'from-orange-500 to-orange-600', description: 'פגישות ואירועים' },
    { id: 4, name: 'בסיס ידע', icon: BookOpen, color: 'from-green-500 to-green-600', description: 'מסמכים ונהלים' },
    { id: 5, name: 'תצוגת תוכן', icon: FileText, color: 'from-red-500 to-red-600', description: 'פרסומים ועדכונים' }
  ];

  if (!department) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex p-8 bg-white/40 backdrop-blur-md rounded-full mb-4 animate-pulse">
            <div className="w-16 h-16 bg-slate-200/60 rounded-full" />
          </div>
          <p className="text-slate-500 font-light">טוען...</p>
        </div>
      </div>
    );
  }

  const DepartmentIcon = iconMap[department.icon] || Users;

  const getColorClass = (color) => {
    const colorMap = {
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      green: 'bg-green-500',
      red: 'bg-red-500'
    };
    return colorMap[color] || 'bg-primary';
  };

  return (
    <div className="h-full overflow-auto p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-4 bg-gradient-to-br ${getColorClass(department.color)} rounded-2xl shadow-lg`}>
            <DepartmentIcon size={48} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-light text-slate-800">{department.name}</h1>
            <p className="text-slate-500 text-lg">{department.description}</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        <div className="glass-card p-6 text-center">
          <p className="text-3xl font-light text-slate-800 mb-1">24</p>
          <p className="text-sm text-slate-600">חברי צוות</p>
        </div>
        <div className="glass-card p-6 text-center">
          <p className="text-3xl font-light text-slate-800 mb-1">156</p>
          <p className="text-sm text-slate-600">פעולות החודש</p>
        </div>
        <div className="glass-card p-6 text-center">
          <p className="text-3xl font-light text-primary mb-1">פעיל</p>
          <p className="text-sm text-slate-600">סטטוס</p>
        </div>
      </div>

      {/* 5 Standard Action Buttons */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-light text-slate-800 mb-6">תפריט ראשי</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {standardActions.map((action) => {
            const ActionIcon = action.icon;
            return (
              <button
                key={action.id}
                className="group relative h-52 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-90`} />
                <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                  <div className="p-5 bg-white/20 backdrop-blur-sm rounded-full mb-4 group-hover:scale-110 transition-transform duration-500">
                    <ActionIcon size={44} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-light mb-2">{action.name}</h2>
                  <p className="text-white/80 text-sm text-center">{action.description}</p>
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Department Info */}
      <div className="glass-card p-8 mt-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-light text-slate-800 mb-4">מידע נוסף</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-slate-700 mb-2">אודות האגף</h3>
            <p className="text-slate-600 leading-relaxed">
              {department.name} אחראי על ניהול, תכנון וביצוע פעילות מרכזית בארגון.
              האגף מעניק שירותים ותמיכה לכלל היחידות הארגוניות.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-slate-700 mb-3">קישורים מהירים</h3>
            <div className="space-y-2">
              {['נהלים ותקנות', 'טפסים ומסמכים', 'צור קשר'].map((link, idx) => (
                <button
                  key={idx}
                  className="w-full text-right px-4 py-2 bg-white/40 backdrop-blur-sm rounded-lg hover:bg-white/60 transition-all text-slate-700 text-sm"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeptStandard;
