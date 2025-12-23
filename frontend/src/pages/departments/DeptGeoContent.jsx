import { useState, useEffect } from 'react';
import { Map, MapPin, Globe, FileText, Image, MapPinned, Database } from 'lucide-react';
import { getNewsTicker } from '../../services/mockData';

const DeptGeoContent = () => {
  const [newsTicker, setNewsTicker] = useState([]);
  const [tickerPosition, setTickerPosition] = useState(0);

  useEffect(() => {
    const fetchTicker = async () => {
      const data = await getNewsTicker();
      setNewsTicker(data);
    };
    fetchTicker();
  }, []);

  // Animate ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerPosition((prev) => (prev <= -100 ? 0 : prev - 0.1));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const regions = [
    { id: 1, name: 'אזור צפון', icon: MapPin, color: 'from-blue-500 to-blue-600' },
    { id: 2, name: 'אזור דרום', icon: Globe, color: 'from-orange-500 to-orange-600' }
  ];

  const contentTypes = [
    { id: 1, name: 'דוחות', icon: FileText, color: 'from-purple-500 to-purple-600' },
    { id: 2, name: 'מדיה', icon: Image, color: 'from-pink-500 to-pink-600' },
    { id: 3, name: 'מפות', icon: MapPinned, color: 'from-green-500 to-green-600' },
    { id: 4, name: 'נתונים', icon: Database, color: 'from-cyan-500 to-cyan-600' }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Main Content Area with padding-bottom for ticker */}
      <div className="flex-1 overflow-auto p-8 pb-32">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg">
              <Map size={48} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-light text-slate-800">אגף תוכן גיאוגרפי</h1>
              <p className="text-slate-500 text-lg">מידע גיאוגרפי, מיפוי ותוכן מרחבי</p>
            </div>
          </div>
        </div>

        {/* Section A: Geographic Regions - 2 Large Buttons */}
        <div className="mb-12">
          <h2 className="text-2xl font-light text-slate-800 mb-6">אזורים גיאוגרפיים</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {regions.map((region) => {
              const IconComponent = region.icon;
              return (
                <button
                  key={region.id}
                  className="group relative h-56 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${region.color} opacity-90`} />
                  <div className="relative h-full flex flex-col items-center justify-center text-white p-8">
                    <div className="p-6 bg-white/20 backdrop-blur-sm rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
                      <IconComponent size={56} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl font-light mb-2">{region.name}</h2>
                    <p className="text-white/90 text-center">לחץ לצפייה במידע מפורט</p>
                  </div>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Section B: Content Types - 4 Independent Buttons */}
        <div className="mb-8">
          <h2 className="text-2xl font-light text-slate-800 mb-6">סוגי תוכן</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {contentTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <button
                  key={type.id}
                  className="group relative h-48 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-90`} />
                  <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                    <div className="p-4 bg-white/20 backdrop-blur-sm rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={40} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-light">{type.name}</h3>
                  </div>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section C: Fixed News Ticker at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-slate-800 to-slate-900 text-white py-4 shadow-lg z-40 overflow-hidden">
        <div className="flex items-center gap-4 px-4">
          <div className="flex-shrink-0 bg-orange-500 px-4 py-2 rounded-lg font-bold text-sm">
            עדכונים
          </div>
          <div className="flex-1 overflow-hidden">
            <div
              className="flex gap-12 whitespace-nowrap"
              style={{
                transform: `translateX(${tickerPosition}%)`,
                transition: 'transform 0.03s linear'
              }}
            >
              {/* Duplicate news items for seamless loop */}
              {[...newsTicker, ...newsTicker].map((news, idx) => (
                <span key={idx} className="text-sm font-light">
                  {news}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeptGeoContent;
