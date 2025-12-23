import { GitBranch, Code2, Zap, TrendingUp, CheckCircle, Clock } from 'lucide-react';

const DeptDevelopment = () => {
  return (
    <div className="h-full overflow-auto p-8">
      {/* Hero Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
            <GitBranch size={48} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-light text-slate-800">אגף פיתוח</h1>
            <p className="text-slate-500 text-lg">מחקר ופיתוח טכנולוגי</p>
          </div>
        </div>
      </div>

      {/* Under Construction Message */}
      <div className="glass-card p-12 mb-8 text-center">
        <div className="inline-flex p-6 bg-blue-500/10 rounded-full mb-6">
          <Code2 size={64} className="text-blue-500" />
        </div>
        <h2 className="text-3xl font-light text-slate-800 mb-3">ברוכים הבאים למחלקת המו"פ</h2>
        <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
          האגף נמצא כעת בתהליך בנייה ופיתוח. בקרוב יהיו זמינים כלים ומשאבים מתקדמים לניהול פרויקטים,
          מעקב אחר קוד ושיתוף פעולה בין צוותי הפיתוח.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-500/10">
              <Code2 size={24} className="text-blue-500" />
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-600 font-medium">
              +15%
            </span>
          </div>
          <h3 className="text-sm text-slate-600 mb-1 font-medium">שורות קוד</h3>
          <p className="text-3xl font-light text-slate-800">2.4M</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-green-500/10">
              <CheckCircle size={24} className="text-green-500" />
            </div>
          </div>
          <h3 className="text-sm text-slate-600 mb-1 font-medium">משימות פעילות</h3>
          <p className="text-3xl font-light text-slate-800">47</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-purple-500/10">
              <GitBranch size={24} className="text-purple-500" />
            </div>
          </div>
          <h3 className="text-sm text-slate-600 mb-1 font-medium">פרויקטים פעילים</h3>
          <p className="text-3xl font-light text-slate-800">12</p>
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-orange-500/10">
              <TrendingUp size={24} className="text-orange-500" />
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-600 font-medium">
              98%
            </span>
          </div>
          <h3 className="text-sm text-slate-600 mb-1 font-medium">קצב הצלחה</h3>
          <p className="text-3xl font-light text-slate-800">98%</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-xl font-light text-slate-800 mb-4 flex items-center gap-2">
            <Clock size={20} className="text-blue-500" />
            <span>פעילות אחרונה</span>
          </h3>
          <div className="space-y-3">
            {[
              { title: 'Commit חדש במערכת ראשית', user: 'דן כהן', time: 'לפני 10 דקות' },
              { title: 'סגירת Bug #234', user: 'מיכל לוי', time: 'לפני 25 דקות' },
              { title: 'Code Review הושלם', user: 'יוסי אברהם', time: 'לפני שעה' },
              { title: 'Deploy לסביבת Staging', user: 'CI/CD', time: 'לפני שעתיים' }
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-white/40 backdrop-blur-sm rounded-lg hover:bg-white/60 transition-all">
                <p className="text-sm font-medium text-slate-800">{item.title}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-slate-600">{item.user}</span>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-light text-slate-800 mb-4 flex items-center gap-2">
            <Zap size={20} className="text-orange-500" />
            <span>כלי פיתוח</span>
          </h3>
          <div className="space-y-2">
            {[
              'GitHub Repository',
              'CI/CD Pipeline',
              'מערכת ניהול משימות',
              'ניטור ביצועים',
              'סביבות פיתוח'
            ].map((tool, idx) => (
              <button
                key={idx}
                className="w-full text-right px-4 py-3 bg-white/40 backdrop-blur-sm rounded-lg hover:bg-white/60 hover:scale-102 active:scale-98 transition-all text-slate-700 font-medium"
              >
                {tool}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeptDevelopment;
