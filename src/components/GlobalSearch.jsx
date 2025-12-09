import { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAppsData, getSituationReportsData, getContactsData, getCalendarEvents } from '../services/newMockData';

const GlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // All searchable pages and their content - memoized to avoid recreation
  const searchableContent = useMemo(() => [
    // Pages
    { title: 'בית', path: '/', type: 'עמוד', keywords: ['לוח בקרה', 'דשבורד', 'home', 'מבצעי', 'התראות', 'מערכות'] },
    { title: 'אפליקציות', path: '/apps', type: 'עמוד', keywords: ['מערכות', 'אפליקציות', 'כלים'] },
    { title: 'דוחות מצב', path: '/situation-reports', type: 'עמוד', keywords: ['דוחות', 'מצב', 'סטטוס'] },
    { title: 'בסיס ידע', path: '/knowledge-base', type: 'עמוד', keywords: ['ידע', 'מדריכים', 'נהלים', 'מאמרים'] },
    { title: 'ידע מורחב', path: '/extended-knowledge', type: 'עמוד', keywords: ['מידע', 'ידע', 'מסמכים'] },
    { title: 'חפיפות ארגוניות', path: '/overlaps', type: 'עמוד', keywords: ['חפיפות', 'ממשקים', 'תיאום'] },
    { title: 'אנשי קשר', path: '/contacts', type: 'עמוד', keywords: ['טלפון', 'אנשי קשר', 'מחלקות'] },
    { title: 'לוח אירועים', path: '/calendar', type: 'עמוד', keywords: ['לוח שנה', 'אירועים', 'פגישות'] },

    // Apps content
    ...getAppsData().map(app => ({
      title: app.title,
      path: '/apps',
      type: 'אפליקציה',
      keywords: [app.description, app.category]
    })),

    // Situation Reports content
    ...getSituationReportsData().map(report => ({
      title: report.title,
      path: '/situation-reports',
      type: 'דוח מצב',
      keywords: [report.description, report.level, report.area]
    })),

    // Contacts content
    ...Object.entries(getContactsData()).map(([key, dept]) => ({
      title: dept.dept,
      path: '/contacts',
      type: 'מחלקה',
      keywords: ['אנשי קשר', 'טלפון', dept.dept]
    })),

    // Calendar events
    ...getCalendarEvents().map(event => ({
      title: event.title,
      path: '/calendar',
      type: 'אירוע',
      keywords: [event.type, event.date]
    })),
  ], []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([]);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = searchableContent.filter(item =>
      item.title.toLowerCase().includes(searchLower) ||
      item.path.toLowerCase().includes(searchLower) ||
      item.keywords.some(keyword => keyword?.toLowerCase().includes(searchLower))
    );

    setResults(filtered.slice(0, 8)); // Limit to 8 results
  }, [searchTerm, searchableContent]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectResult = (path) => {
    navigate(path);
    setSearchTerm('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-80">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search size={18} className="text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="חיפוש עמודים..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pr-10 pl-10 py-2 bg-white/40 backdrop-blur-md border border-white/60 rounded-lg
                   text-sm text-slate-800 placeholder-slate-400
                   focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white/60
                   transition-all duration-300"
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              setResults([]);
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-xl rounded-xl border border-white/60 shadow-2xl overflow-hidden z-50 animate-fadeIn">
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => handleSelectResult(result.path)}
              className="w-full px-4 py-3 text-right hover:bg-primary/10 transition-colors border-b border-slate-100 last:border-0 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-slate-800 group-hover:text-primary transition-colors">
                      {result.title}
                    </p>
                    <span className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full">
                      {result.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">
                    {result.path}
                  </p>
                </div>
                <Search size={14} className="text-slate-300 group-hover:text-primary transition-colors" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {isOpen && searchTerm && results.length === 0 && (
        <div className="absolute top-full mt-2 w-full bg-white/95 backdrop-blur-xl rounded-xl border border-white/60 shadow-2xl p-4 z-50 animate-fadeIn">
          <p className="text-sm text-slate-500 text-center">לא נמצאו תוצאות</p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GlobalSearch;
