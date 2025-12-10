import { useState, useEffect } from 'react';
import { Filter, Download, Eye, Calendar } from 'lucide-react';

const SmartFilterLayout = ({ title, description, data, renderCard }) => {
  const [timeFilter, setTimeFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [areaFilter, setAreaFilter] = useState('all');
  const [filteredData, setFilteredData] = useState(data);

  // Filter logic
  useEffect(() => {
    let result = [...data];

    // Time filter
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

    setFilteredData(result);
  }, [timeFilter, levelFilter, areaFilter, data]);

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
      <div className="bg-white/40 backdrop-blur-md rounded-xl border border-white/60 shadow-lg p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-primary" />
          <h2 className="text-lg font-medium text-slate-800">סינון חכם</h2>
        </div>

        <div className={`grid gap-4 ${showAreaFilter ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
          {/* Time Filter */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
              <Calendar size={16} />
              <span>זמן</span>
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

        {/* Results Count */}
        <div className="mt-4 pt-4 border-t border-slate-200/50">
          <p className="text-sm text-slate-600">
            מציג <span className="font-semibold text-primary">{filteredData.length}</span> תוצאות
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
