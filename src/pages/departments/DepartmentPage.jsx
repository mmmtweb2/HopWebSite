import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Users, Laptop, Truck, DollarSign, Settings,
  UserPlus, Clock, GraduationCap, UserCog, AlertCircle,
  Server, Shield, Package, ShoppingCart, Building,
  PieChart, FileText, BarChart, CheckCircle, Activity,
  Monitor, GitBranch, Zap, TrendingUp, Target, Sparkles
} from 'lucide-react';
import { getDepartmentById, getDepartmentActions } from '../../services/mockData';
import GlassButton from '../../components/GlassButton';

const iconMap = {
  Users, Laptop, Truck, DollarSign, Settings,
  UserPlus, Clock, GraduationCap, UserCog, AlertCircle,
  Server, Shield, Package, ShoppingCart, Building,
  PieChart, FileText, BarChart, CheckCircle, Activity,
  Monitor, GitBranch, Zap
};

const DepartmentPage = () => {
  const { departmentId } = useParams();
  const [department, setDepartment] = useState(null);
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [deptData, actionsData] = await Promise.all([
        getDepartmentById(departmentId),
        getDepartmentActions(departmentId)
      ]);
      setDepartment(deptData);
      setActions(actionsData);
      setLoading(false);
    };

    fetchData();
  }, [departmentId]);

  const getDepartmentTheme = (color) => {
    const themes = {
      blue: {
        gradient: 'from-blue-500 via-blue-600 to-cyan-600',
        glowColor: 'rgba(59, 130, 246, 0.2)',
        badgeBg: 'bg-blue-500',
        shadowClass: 'shadow-glow-blue'
      },
      purple: {
        gradient: 'from-purple-500 via-purple-600 to-violet-600',
        glowColor: 'rgba(168, 85, 247, 0.2)',
        badgeBg: 'bg-purple-500',
        shadowClass: 'shadow-glow-purple'
      },
      orange: {
        gradient: 'from-orange-500 via-orange-600 to-amber-600',
        glowColor: 'rgba(249, 115, 22, 0.2)',
        badgeBg: 'bg-orange-500',
        shadowClass: 'shadow-glow-orange'
      },
      green: {
        gradient: 'from-green-500 via-green-600 to-emerald-600',
        glowColor: 'rgba(16, 185, 129, 0.2)',
        badgeBg: 'bg-green-500',
        shadowClass: 'shadow-glow-primary'
      },
      red: {
        gradient: 'from-red-500 via-red-600 to-rose-600',
        glowColor: 'rgba(239, 68, 68, 0.2)',
        badgeBg: 'bg-red-500',
        shadowClass: 'shadow-glow-orange'
      }
    };
    return themes[color] || themes.blue;
  };

  const getActionVariant = (color) => {
    const variantMap = {
      blue: 'blue',
      purple: 'purple',
      orange: 'orange',
      green: 'primary',
      red: 'orange',
      gray: 'secondary',
      yellow: 'orange'
    };
    return variantMap[color] || 'secondary';
  };

  if (loading) {
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

  if (!department) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center glass-card p-12">
          <AlertCircle size={64} className="mx-auto mb-4 text-red-500" />
          <h2 className="text-2xl font-light text-slate-800 mb-2">אגף לא נמצא</h2>
          <p className="text-slate-600">האגף המבוקש אינו קיים במערכת</p>
        </div>
      </div>
    );
  }

  const DepartmentIcon = iconMap[department.icon] || Users;
  const theme = getDepartmentTheme(department.color);

  return (
    <div className="h-full overflow-auto">
      {/* Dynamic Hero Section with Gradient */}
      <div className={`relative bg-gradient-to-r ${theme.gradient} px-8 pt-12 pb-24 overflow-hidden`}>
        {/* Huge translucent icon in background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none">
          <DepartmentIcon size={400} strokeWidth={1} />
        </div>

        {/* Animated orbs for depth */}
        <div className="absolute top-10 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        {/* Content */}
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              {/* Icon */}
              <div className="p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-2xl">
                <DepartmentIcon size={64} className="text-white" strokeWidth={1.5} />
              </div>

              {/* Title and Description */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-5xl font-light text-white leading-relaxed">
                    {department.name}
                  </h1>
                  {/* Status Badge */}
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
                    <Sparkles size={16} />
                    <span>פעיל</span>
                  </span>
                </div>
                <p className="text-white/90 text-lg font-light leading-relaxed">
                  {department.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-8 py-8 -mt-16 relative z-10 max-w-6xl mx-auto">
        {/* Stats Grid - Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${theme.badgeBg}/10`}>
                <TrendingUp size={24} className={`${theme.badgeBg.replace('bg-', 'text-')}`} />
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${theme.badgeBg}/20 ${theme.badgeBg.replace('bg-', 'text-')} font-medium`}>
                +12%
              </span>
            </div>
            <h3 className="text-sm text-slate-600 mb-1 font-medium">פעולות השבוע</h3>
            <p className="text-3xl font-light text-slate-800">
              {Math.floor(Math.random() * 150) + 50}
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${theme.badgeBg}/10`}>
                <Users size={24} className={`${theme.badgeBg.replace('bg-', 'text-')}`} />
              </div>
            </div>
            <h3 className="text-sm text-slate-600 mb-1 font-medium">חברי צוות</h3>
            <p className="text-3xl font-light text-slate-800">
              {Math.floor(Math.random() * 30) + 10}
            </p>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${theme.badgeBg}/10`}>
                <Target size={24} className={`${theme.badgeBg.replace('bg-', 'text-')}`} />
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-600 font-medium">
                תקין
              </span>
            </div>
            <h3 className="text-sm text-slate-600 mb-1 font-medium">משימות פתוחות</h3>
            <p className="text-3xl font-light text-slate-800">
              {Math.floor(Math.random() * 25) + 5}
            </p>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="glass-card p-8 mb-8">
          <h2 className="text-2xl font-light text-slate-800 mb-6 flex items-center gap-3">
            <Activity size={28} className={theme.badgeBg.replace('bg-', 'text-')} />
            <span>פעולות מהירות</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {actions.map((action) => {
              const ActionIcon = iconMap[action.icon] || FileText;
              const variant = getActionVariant(action.color);

              return (
                <GlassButton
                  key={action.id}
                  variant={variant}
                  size="lg"
                  icon={ActionIcon}
                  className="w-full justify-start"
                >
                  {action.title}
                </GlassButton>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center gap-2">
              <Clock size={20} className={theme.badgeBg.replace('bg-', 'text-')} />
              <span>פעילות אחרונה</span>
            </h3>
            <div className="space-y-3">
              {[
                { user: 'שרה כהן', action: 'עדכנה דוח חודשי', time: 'לפני 5 דקות' },
                { user: 'דוד לוי', action: 'אישר בקשת רכש', time: 'לפני 15 דקות' },
                { user: 'רחל אברהם', action: 'הוסיפה משימה חדשה', time: 'לפני שעה' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white/40 backdrop-blur-sm rounded-lg hover:bg-white/60 transition-all">
                  <div className={`w-10 h-10 rounded-full ${theme.badgeBg}/20 flex items-center justify-center flex-shrink-0`}>
                    <Users size={18} className={theme.badgeBg.replace('bg-', 'text-')} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">{item.user}</p>
                    <p className="text-xs text-slate-600">{item.action}</p>
                  </div>
                  <span className="text-xs text-slate-500 flex-shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center gap-2">
              <Zap size={20} className={theme.badgeBg.replace('bg-', 'text-')} />
              <span>קישורים מהירים</span>
            </h3>
            <div className="space-y-2">
              {[
                'מסמכים ונהלים',
                'מדריכים והדרכות',
                'דוחות ותקציב',
                'צור קשר עם מנהל האגף'
              ].map((link, idx) => (
                <button
                  key={idx}
                  className="w-full text-right px-4 py-3 bg-white/40 backdrop-blur-sm rounded-lg hover:bg-white/60 hover:scale-102 active:scale-98 transition-all text-slate-700 font-medium"
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

export default DepartmentPage;
