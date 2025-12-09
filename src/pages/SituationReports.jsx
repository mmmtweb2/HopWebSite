import SmartFilterLayout from '../components/SmartFilterLayout';
import { getSituationReportsData } from '../services/newMockData';
import { Calendar, Download, Eye, FileBarChart } from 'lucide-react';

const SituationReports = () => {
  const reports = getSituationReportsData();

  const renderReportCard = (report, index) => {
    const getSeverityColor = (tag) => {
      const colors = {
        'דחוף': 'bg-red-500/20 text-red-600 border-red-500',
        'רגיל': 'bg-blue-500/20 text-blue-600 border-blue-500',
        'עדכון': 'bg-green-500/20 text-green-600 border-green-500',
        'אסטרטגי': 'bg-purple-500/20 text-purple-600 border-purple-500'
      };
      return colors[tag] || 'bg-slate-500/20 text-slate-600 border-slate-500';
    };

    return (
      <div
        key={report.id}
        className="glass-card p-6 border-r-4"
        style={{
          animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
          borderRightColor: report.tag === 'דחוף' ? '#ef4444' :
                            report.tag === 'אסטרטגי' ? '#a855f7' : '#10b981'
        }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <FileBarChart size={20} className="text-primary flex-shrink-0" />
              <h3 className="text-lg font-medium text-slate-800 leading-relaxed">
                {report.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar size={12} />
              <span>{report.date}</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(report.tag)}`}>
            {report.tag}
          </span>
        </div>

        <p className="text-sm text-slate-600 mb-4 leading-relaxed">
          {report.description}
        </p>

        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 flex-wrap">
          <span className="px-2 py-1 bg-slate-100 rounded">
            {report.timeCategory === 'daily' ? 'יומי' :
             report.timeCategory === 'weekly' ? 'שבועי' : 'תקופתי'}
          </span>
          <span className="px-2 py-1 bg-slate-100 rounded">
            {report.level === 'management' ? 'הנהלה' :
             report.level === 'regional' ? 'אזורי' : 'תת-אזורי'}
          </span>
          {report.area && (
            <span className="px-2 py-1 bg-primary/10 text-primary rounded">
              {report.area === 'north' ? 'צפון' :
               report.area === 'center' ? 'מרכז' : 'דרום'}
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm hover:scale-105 active:scale-95">
            <Eye size={16} />
            <span>צפייה</span>
          </button>
          <button className="flex-1 px-4 py-2 bg-white/60 hover:bg-white/80 text-slate-700 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm hover:scale-105 active:scale-95">
            <Download size={16} />
            <span>הורדה</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <SmartFilterLayout
      title="דוחות מצב"
      description="דוחות מצב עדכניים לכל הרמות והאזורים"
      data={reports}
      renderCard={renderReportCard}
    />
  );
};

export default SituationReports;
