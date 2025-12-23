import { useState } from 'react';
import { FileText, Download, Filter, Calendar, User, Building2, Plus } from 'lucide-react';
import { useEditMode } from '../contexts/EditModeContext';

const ReportsCenter = () => {
  const { isEditMode } = useEditMode();
  const [dateRange, setDateRange] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'דוח ביצועים רבעון 1 2024',
      author: 'שרה כהן',
      department: 'hr',
      date: '2024-03-20',
      size: '2.4 MB',
      type: 'PDF',
      downloads: 45
    },
    {
      id: 2,
      title: 'סיכום תקציבי - פברואר 2024',
      author: 'משה דהן',
      department: 'finance',
      date: '2024-03-15',
      size: '1.8 MB',
      type: 'PDF',
      downloads: 67
    },
    {
      id: 3,
      title: 'דוח מלאי חודשי',
      author: 'רחל אברהם',
      department: 'logistics',
      date: '2024-03-10',
      size: '3.2 MB',
      type: 'PDF',
      downloads: 34
    },
    {
      id: 4,
      title: 'ניתוח תקלות IT - מרץ',
      author: 'דוד לוי',
      department: 'it',
      date: '2024-03-08',
      size: '1.5 MB',
      type: 'PDF',
      downloads: 28
    },
    {
      id: 5,
      title: 'דוח שביעות רצון עובדים',
      author: 'שרה כהן',
      department: 'hr',
      date: '2024-03-05',
      size: '2.1 MB',
      type: 'PDF',
      downloads: 89
    },
    {
      id: 6,
      title: 'סיכום פעילות תפעולית',
      author: 'יוסי אבני',
      department: 'operations',
      date: '2024-03-01',
      size: '4.3 MB',
      type: 'PDF',
      downloads: 52
    }
  ]);

  const departments = [
    { id: 'all', label: 'כל האגפים' },
    { id: 'hr', label: 'משאבי אנוש' },
    { id: 'it', label: 'מערכות מידע' },
    { id: 'logistics', label: 'לוגיסטיקה' },
    { id: 'finance', label: 'כספים' },
    { id: 'operations', label: 'תפעול' }
  ];

  const authors = [
    { id: 'all', label: 'כל המנהלים' },
    { id: 'שרה כהן', label: 'שרה כהן' },
    { id: 'משה דהן', label: 'משה דהן' },
    { id: 'רחל אברהם', label: 'רחל אברהם' },
    { id: 'דוד לוי', label: 'דוד לוי' },
    { id: 'יוסי אבני', label: 'יוסי אבני' }
  ];

  const dateRanges = [
    { id: 'all', label: 'כל התקופה' },
    { id: 'today', label: 'היום' },
    { id: 'week', label: 'שבוע אחרון' },
    { id: 'month', label: 'חודש אחרון' },
    { id: 'quarter', label: 'רבעון אחרון' }
  ];

  const getDepartmentBadgeColor = (dept) => {
    const colors = {
      hr: 'bg-blue-100 text-blue-700',
      it: 'bg-purple-100 text-purple-700',
      logistics: 'bg-orange-100 text-orange-700',
      finance: 'bg-green-100 text-green-700',
      operations: 'bg-red-100 text-red-700'
    };
    return colors[dept] || 'bg-slate-100 text-slate-700';
  };

  const filteredReports = reports.filter(report => {
    const matchesDepartment = selectedDepartment === 'all' || report.department === selectedDepartment;
    const matchesAuthor = selectedAuthor === 'all' || report.author === selectedAuthor;
    // Date range filtering would go here in a real app
    return matchesDepartment && matchesAuthor;
  });

  const handleDeleteReport = (id) => {
    setReports(reports.filter(report => report.id !== id));
  };

  const handleAddReport = () => {
    const newReport = {
      id: Date.now(),
      title: 'דוח חדש - לחץ לעריכה',
      author: 'מחבר',
      department: 'operations',
      date: new Date().toISOString().split('T')[0],
      size: '0 MB',
      type: 'PDF',
      downloads: 0
    };
    setReports([newReport, ...reports]);
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-slate-800 mb-2 leading-relaxed">
          מרכז דוחות
        </h1>
        <p className="text-slate-500 font-light leading-relaxed">
          דוחות ניהוליים ותפעוליים מרכזיים
        </p>
      </div>

      {/* Filters Section - Glassmorphism */}
      <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/60 shadow-lg p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-primary" />
          <h2 className="text-lg font-medium text-slate-800">סינון דוחות</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Date Range Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <Calendar size={16} />
              <span>תקופת זמן</span>
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              {dateRanges.map(range => (
                <option key={range.id} value={range.id}>{range.label}</option>
              ))}
            </select>
          </div>

          {/* Author Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <User size={16} />
              <span>מנהל / מחבר</span>
            </label>
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.label}</option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <Building2 size={16} />
              <span>אגף</span>
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            >
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Add New Button (Edit Mode) */}
      {isEditMode && (
        <button
          onClick={handleAddReport}
          className="mb-6 py-3 px-6 bg-primary/20 backdrop-blur-md border-2 border-dashed border-primary/50 rounded-xl hover:bg-primary/30 hover:border-primary transition-all duration-300 flex items-center justify-center gap-2 text-primary font-medium"
        >
          <Plus size={20} />
          <span>הוסף דוח חדש</span>
        </button>
      )}

      {/* Reports Table/List */}
      <div className="flex-1 overflow-auto">
        {filteredReports.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-flex p-6 bg-slate-100/40 backdrop-blur-md rounded-full mb-4">
                <FileText size={48} className="text-slate-300" />
              </div>
              <p className="text-slate-400 font-light">לא נמצאו דוחות</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredReports.map((report, index) => {
              const deptLabel = departments.find(d => d.id === report.department)?.label || report.department;

              return (
                <div
                  key={report.id}
                  className="group relative bg-white/40 backdrop-blur-md rounded-xl border border-white/60 p-5 hover:bg-white/60 hover:shadow-lg transition-all duration-300"
                  style={{
                    animation: `slideIn 0.4s ease-out ${index * 0.05}s both`
                  }}
                >
                  {/* Delete button (Edit Mode) */}
                  {isEditMode && (
                    <button
                      onClick={() => handleDeleteReport(report.id)}
                      className="absolute top-4 left-4 p-1 text-red-500 hover:bg-red-100 rounded transition-colors z-10"
                      title="מחק דוח"
                    >
                      ✕
                    </button>
                  )}

                  <div className="flex items-center gap-6">
                    {/* PDF Icon */}
                    <div className="flex-shrink-0 p-4 bg-red-500/10 rounded-xl">
                      <FileText size={32} className="text-red-500" />
                    </div>

                    {/* Report Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3
                          className={`text-lg font-medium text-slate-800 leading-relaxed ${
                            isEditMode ? 'border border-dashed border-slate-300 px-2 py-1 rounded' : ''
                          }`}
                          contentEditable={isEditMode}
                          suppressContentEditableWarning
                        >
                          {report.title}
                        </h3>
                        <button className="flex-shrink-0 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-all duration-300 flex items-center gap-2 font-medium">
                          <Download size={16} />
                          <span>הורד</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className={`px-3 py-1 rounded-full ${getDepartmentBadgeColor(report.department)} font-medium`}>
                          {deptLabel}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {report.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {report.date}
                        </span>
                        <span>•</span>
                        <span>{report.size}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Download size={14} />
                          {report.downloads} הורדות
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ReportsCenter;
