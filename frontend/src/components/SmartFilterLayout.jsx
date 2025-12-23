import { useState, useEffect } from 'react';
import { Filter, Download, Eye, Calendar, CalendarRange } from 'lucide-react';

const SmartFilterLayout = ({ title, description, data, renderCard }) => {
  const [timeFilter, setTimeFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState('all');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  // Helper function to calculate date range
  const getDateRange = (rangeType) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (rangeType) {
      case 'today':
        return { start: today, end: today };
      case 'week':
        const weekAgo = new Date(today);
        weekAgo.setDate(today.getDate() - 7);
        return { start: weekAgo, end: today };
      case 'month':
        const monthAgo = new Date(today);
        monthAgo.setMonth(today.getMonth() - 1);
        return { start: monthAgo, end: today };
      case '3months':
        const threeMonthsAgo = new Date(today);
        threeMonthsAgo.setMonth(today.getMonth() - 3);
        return { start: threeMonthsAgo, end: today };
      case 'year':
        const yearAgo = new Date(today);
        yearAgo.setFullYear(today.getFullYear() - 1);
        return { start: yearAgo, end: today };
      case 'custom':
        if (customStartDate && customEndDate) {
          return {
            start: new Date(customStartDate),
            end: new Date(customEndDate)
          };
        }
        return null;
      default:
        return null;
    }
  };

  // Filter logic
  useEffect(() => {
    let result = [...data];

    // Time filter (frequency: daily, weekly, periodic)
    if (timeFilter !== 'all') {
      result = result.filter(item => item.timeCategory === timeFilter);
    }

    // Level filter
    if (levelFilter !== 'all') {
      result = result.filter(item => item.level === levelFilter);
    }

    // Area filter (only applies if level is regional or sub-regional)
    if ((levelFilter === 'regional' || levelFilter === 'sub-regional') && areaFilter !== 'all') {
      result = result.filter(item => item.area === areaFilter);
    }

    // Date range filter (based on actual document date)
    if (dateRangeFilter !== 'all') {
      const range = getDateRange(dateRangeFilter);
      if (range) {
        result = result.filter(item => {
          if (!item.date) return false;
          const itemDate = new Date(item.date);
          itemDate.setHours(0, 0, 0, 0);
          return itemDate >= range.start && itemDate <= range.end;
        });
      }
    }

    setFilteredData(result);
  }, [timeFilter, levelFilter, areaFilter, dateRangeFilter, customStartDate, customEndDate, data]);

  // Determine if area filter should be shown
  const showAreaFilter = levelFilter === 'regional' || levelFilter === 'sub-regional';

  // Reset area filter when level changes
  useEffect(() => {
    if (!showAreaFilter) {
      setAreaFilter('all');
    }
  }, [showAreaFilter]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-slate-800 mb-2 leading-relaxed">
          {title}
        </h1>
        <p className="text-slate-500 font-light leading-relaxed">
          {description}
        </p>
      </div>

      {/* Smart Filters Bar - Glassmorphism */}
      <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/60 shadow-lg p-6 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-primary" />
          <h2 className="text-lg font-medium text-slate-800">סינון לפי קטגוריה</h2>
        </div>

        <div className={`grid gap-4 ${showAreaFilter ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
          {/* Time Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <Calendar size={16} />
              <span>תדירות פרסום</span>
            </label>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
            >
              <option value="all">הכל</option>
              <option value="daily">יומי</option>
              <option value="weekly">שבועי</option>
              <option value="periodic">תקופתי</option>
            </select>
          </div>

          {/* Level Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <Filter size={16} />
              <span>רמה</span>
            </label>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
            >
              <option value="all">הכל</option>
              <option value="management">הנהלה</option>
              <option value="regional">אזורי</option>
              <option value="sub-regional">תת-אזורי</option>
            </select>
          </div>

          {/* Area Filter (Conditional) */}
          {showAreaFilter && (
            <div className="animate-fadeIn">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Filter size={16} />
                <span>אזור</span>
              </label>
              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
              >
                <option value="all">כל האזורים</option>
                <option value="north">צפון</option>
                <option value="center">מרכז</option>
                <option value="south">דרום</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Date Range Filter - Separate Section */}
      <div className="bg-gradient-to-br from-primary/5 to-emerald-50/50 backdrop-blur-md rounded-xl border border-primary/20 shadow-lg p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <CalendarRange size={20} className="text-primary" />
          <h2 className="text-lg font-medium text-slate-800">סינון לפי טווח תאריכים</h2>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {/* Date Range Preset */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <Calendar size={16} />
              <span>בחר טווח</span>
            </label>
            <select
              value={dateRangeFilter}
              onChange={(e) => {
                setDateRangeFilter(e.target.value);
                if (e.target.value !== 'custom') {
                  setCustomStartDate('');
                  setCustomEndDate('');
                }
              }}
              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
            >
              <option value="all">כל התאריכים</option>
              <option value="today">היום</option>
              <option value="week">שבוע אחרון</option>
              <option value="month">חודש אחרון</option>
              <option value="3months">3 חודשים אחרונים</option>
              <option value="year">שנה אחרונה</option>
              <option value="custom">טווח מותאם אישית</option>
            </select>
          </div>

          {/* Custom Date Range (Conditional) */}
          {dateRangeFilter === 'custom' && (
            <div className="animate-fadeIn md:col-span-1">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <CalendarRange size={16} />
                <span>תאריכים מותאמים אישית</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="px-3 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                  placeholder="תאריך התחלה"
                />
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="px-3 py-3 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                  placeholder="תאריך סיום"
                />
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-primary/10">
          <p className="text-sm text-slate-700 font-medium">
            מציג <span className="font-bold text-primary text-lg">{filteredData.length}</span> תוצאות
          </p>
        </div>
      </div>

      {/* Results Grid */}
      <div>
        {filteredData.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-flex p-6 bg-white/40 backdrop-blur-md rounded-full mb-4">
                <Filter size={48} className="text-slate-300" />
              </div>
              <p className="text-slate-400 font-light">לא נמצאו תוצאות מתאימות</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item, index) => (
              renderCard ? renderCard(item, index) : <DefaultCard key={item.id} item={item} index={index} />
            ))}
          </div>
        )}
      </div>

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
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

// Default card if no custom renderer provided
const DefaultCard = ({ item, index }) => {
  return (
    <div
      className="glass-card p-6"
      style={{
        animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-slate-800 mb-2">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar size={12} />
            <span>{item.date}</span>
          </div>
        </div>
        <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
          {item.tag || item.level}
        </span>
      </div>

      <p className="text-sm text-slate-600 mb-4 line-clamp-3">
        {item.description}
      </p>

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

export default SmartFilterLayout;
