import { useState } from 'react';
import SmartFilterLayout from '../components/SmartFilterLayout';
import { getSituationReportsData } from '../services/newMockData';
import { Calendar, Download, Eye, FileBarChart } from 'lucide-react';
import { Button } from '../components/Button';
import Modal from '../components/Modal';

const SituationReports = () => {
  const reports = getSituationReportsData();
  const [selectedReport, setSelectedReport] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

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
          <Button size="sm" className="flex-1" onClick={() => handleViewReport(report)}>
            <Eye size={16} />
            <span>צפייה</span>
          </Button>
          <Button variant="secondary" size="sm" className="flex-1">
            <Download size={16} />
            <span>הורדה</span>
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <SmartFilterLayout
        title="דוחות מצב"
        description="דוחות מצב עדכניים לכל הרמות והאזורים"
        data={reports}
        renderCard={renderReportCard}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedReport && (
          <div>
            <h2 className="text-2xl font-bold mb-4">{selectedReport.title}</h2>
            <p className="text-slate-600 mb-4">{selectedReport.description}</p>
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <span>{selectedReport.date}</span>
              <span>{selectedReport.tag}</span>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default SituationReports;
