import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowRight, FileText, Image, Database, Link2,
  Target, Beaker, BarChart3, Wifi, ShieldCheck, GraduationCap,
  ChevronDown, ChevronUp, User, Calendar, Phone
} from 'lucide-react';
import { getDepartmentSections, getSectionContent, getSectionAbout } from '../../services/mockData';

const SectionLayout = () => {
  const { sectionId } = useParams();
  const navigate = useNavigate();
  const [section, setSection] = useState(null);
  const [contentType, setContentType] = useState('documents');
  const [content, setContent] = useState([]);
  const [aboutInfo, setAboutInfo] = useState(null);
  const [showAbout, setShowAbout] = useState(false);

  const iconMap = {
    Target, Beaker, BarChart3, Wifi, ShieldCheck, GraduationCap
  };

  const contentTypes = [
    { id: 'documents', label: 'מסמכים', icon: FileText },
    { id: 'media', label: 'מדיה', icon: Image },
    { id: 'data', label: 'נתונים', icon: Database },
    { id: 'links', label: 'קישורים', icon: Link2 }
  ];

  useEffect(() => {
    const fetchData = async () => {
      const sectionsData = await getDepartmentSections('complex');
      const foundSection = sectionsData.find(s => s.id === parseInt(sectionId));
      setSection(foundSection);

      const contentData = await getSectionContent(sectionId, contentType);
      setContent(contentData);

      const about = await getSectionAbout(sectionId);
      setAboutInfo(about);
    };

    fetchData();
  }, [sectionId, contentType]);

  const getColorClass = (color) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-500', gradient: 'from-blue-500 to-blue-600' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-500', gradient: 'from-purple-500 to-purple-600' },
      orange: { bg: 'bg-orange-500', text: 'text-orange-500', gradient: 'from-orange-500 to-orange-600' },
      green: { bg: 'bg-green-500', text: 'text-green-500', gradient: 'from-green-500 to-green-600' },
      red: { bg: 'bg-red-500', text: 'text-red-500', gradient: 'from-red-500 to-red-600' }
    };
    return colorMap[color] || colorMap.blue;
  };

  if (!section) {
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

  const IconComponent = iconMap[section.icon] || Target;
  const colors = getColorClass(section.color);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className={`bg-gradient-to-r ${colors.gradient} px-8 py-8 relative overflow-hidden`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
          <IconComponent size={300} strokeWidth={1} />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/departments/complex')}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
          >
            <ArrowRight size={20} />
            <span>חזרה לאגף</span>
          </button>

          <div className="flex items-center gap-6">
            <div className="p-5 bg-white/20 backdrop-blur-md rounded-2xl">
              <IconComponent size={56} className="text-white" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-4xl font-light text-white mb-2">{section.name}</h1>
              <p className="text-white/90 text-lg">{section.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Control Row - Content Type Toggles */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          {contentTypes.map((type) => {
            const TypeIcon = type.icon;
            const isActive = contentType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => setContentType(type.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? `${colors.bg} text-white shadow-md`
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <TypeIcon size={18} />
                <span className="font-medium">{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Stage */}
      <div className="flex-1 overflow-auto p-8 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="glass-card p-8">
            <h2 className="text-2xl font-light text-slate-800 mb-6">
              {contentTypes.find(t => t.id === contentType)?.label}
            </h2>

            {content.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {content.map((item) => (
                  <button
                    key={item.id}
                    className="bg-white/40 backdrop-blur-sm p-5 rounded-xl hover:bg-white/60 hover:scale-102 transition-all text-right border-2 border-transparent hover:border-primary/30"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 ${colors.bg}/10 rounded-lg flex-shrink-0`}>
                        <FileText size={20} className={colors.text} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-800 mb-1 truncate">{item.title}</h3>
                        <p className="text-sm text-slate-500">
                          {item.date && `${item.date} • `}
                          {item.type}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500">אין פריטים להצגה</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Footer Tab - "About Us" */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex justify-center">
            <button
              onClick={() => setShowAbout(!showAbout)}
              className={`bg-gradient-to-r ${colors.gradient} text-white px-8 py-3 rounded-t-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2`}
            >
              <User size={20} />
              <span className="font-medium">אודותינו</span>
              {showAbout ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
            </button>
          </div>
        </div>

        {/* About Panel */}
        {showAbout && aboutInfo && (
          <div className="bg-white border-t border-slate-200 shadow-2xl">
            <div className="max-w-6xl mx-auto px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium text-slate-800 mb-3">{aboutInfo.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">{aboutInfo.description}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                    <User size={20} className={colors.text} />
                    <div>
                      <p className="text-sm text-slate-500">מנהל המדור</p>
                      <p className="font-medium text-slate-800">{aboutInfo.manager}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                    <Calendar size={20} className={colors.text} />
                    <div>
                      <p className="text-sm text-slate-500">שנת הקמה</p>
                      <p className="font-medium text-slate-800">{aboutInfo.established}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                    <Phone size={20} className={colors.text} />
                    <div>
                      <p className="text-sm text-slate-500">יצירת קשר</p>
                      <p className="font-medium text-slate-800">{aboutInfo.contact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionLayout;
