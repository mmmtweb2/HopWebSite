import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2, Users, Network, ExternalLink,
  Target, Beaker, BarChart3, Wifi, ShieldCheck, GraduationCap
} from 'lucide-react';
import { getDepartmentSections } from '../../services/mockData';

const DeptComplex = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      const data = await getDepartmentSections('complex');
      setSections(data);
    };
    fetchSections();
  }, []);

  const iconMap = {
    Target, Beaker, BarChart3, Wifi, ShieldCheck, GraduationCap
  };

  const quickActions = [
    { id: 'contacts', name: 'אנשי קשר', icon: Users, color: 'from-blue-500 to-blue-600', action: 'modal' },
    { id: 'hierarchy', name: 'היררכיה', icon: Network, color: 'from-purple-500 to-purple-600', action: 'modal' },
    { id: 'links', name: 'קישורי מערכת', icon: ExternalLink, color: 'from-orange-500 to-orange-600', action: 'modal' }
  ];

  const getColorGradient = (color) => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600',
      green: 'from-green-500 to-green-600',
      red: 'from-red-500 to-red-600'
    };
    return colorMap[color] || 'from-slate-700 to-slate-800';
  };

  const handleSectionClick = (sectionId) => {
    navigate(`/departments/complex/section/${sectionId}`);
  };

  return (
    <div className="h-full overflow-auto p-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
            <Building2 size={48} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-light text-slate-800">אגף 4</h1>
            <p className="text-slate-500 text-lg">אגף רב-תחומי מורכב</p>
          </div>
        </div>
      </div>

      {/* 9-Button Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* First Row: Quick Actions (Buttons 1-3) */}
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.id}
                className="group relative h-56 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-90`} />
                <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                  <div className="p-5 bg-white/20 backdrop-blur-sm rounded-full mb-4 group-hover:scale-110 transition-transform duration-500">
                    <IconComponent size={48} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-light mb-2">{action.name}</h2>
                  <p className="text-white/80 text-sm text-center">לחץ לצפייה</p>
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              </button>
            );
          })}

          {/* Second & Third Rows: Section Navigation (Buttons 4-9) */}
          {sections.map((section) => {
            const IconComponent = iconMap[section.icon] || Target;
            const gradient = getColorGradient(section.color);

            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className="group relative h-56 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />
                <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                  <div className="p-5 bg-white/20 backdrop-blur-sm rounded-full mb-4 group-hover:scale-110 transition-transform duration-500">
                    <IconComponent size={48} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-2xl font-light mb-2 text-center">{section.name}</h2>
                  <p className="text-white/80 text-sm text-center">{section.description}</p>
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              </button>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="glass-card p-8 mt-12">
          <h2 className="text-2xl font-light text-slate-800 mb-4">אודות האגף</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            אגף 4 הינו אגף רב-תחומי המורכב מ-6 מדורים עצמאיים. כל מדור מתמחה בתחום ספציפי ומספק
            שירותים ייעודיים לארגון. לחץ על כרטיסי המדורים למעלה כדי לגשת לתוכן, מסמכים ומשאבים
            ספציפיים לכל מדור.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <p className="text-3xl font-light text-primary mb-1">6</p>
              <p className="text-sm text-slate-600">מדורים פעילים</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-light text-primary mb-1">120</p>
              <p className="text-sm text-slate-600">חברי צוות</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-light text-primary mb-1">2018</p>
              <p className="text-sm text-slate-600">שנת הקמה</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeptComplex;
