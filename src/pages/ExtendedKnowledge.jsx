import { useState } from 'react';
import { FolderOpen, ChevronRight, FileText } from 'lucide-react';
import { getExtendedKnowledgeData, getExtendedKnowledgeTypes } from '../services/newMockData';
import { Button } from '../components/Button';

const ExtendedKnowledge = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const data = getExtendedKnowledgeData();
  const types = getExtendedKnowledgeTypes();

  const areas = [
    { id: 'north', label: 'צפון', color: 'from-slate-700 to-slate-800' },
    { id: 'center', label: 'מרכז', color: 'from-slate-700 to-slate-800' },
    { id: 'south', label: 'דרום', color: 'from-slate-700 to-slate-800' }
  ];

  const getResults = () => {
    if (!selectedArea || !selectedType) return [];
    return data[selectedArea][selectedType] || [];
  };

  const results = getResults();

  return (
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-slate-800 mb-2 leading-relaxed flex items-center gap-3">
          <FolderOpen size={40} className="text-primary" />
          <span>ידע מורחב</span>
        </h1>
        <p className="text-slate-500 font-light leading-relaxed">
          בחר אזור גיאוגרפי וסוג מידע לצפייה במסמכים
        </p>
      </div>

      {/* Step 1: Geographic Area Selection */}
      <div className="mb-8">
        <h2 className="text-lg font-medium text-slate-700 mb-4 flex items-center gap-2">
          <span>שלב 1:</span>
          <span className="font-light">בחר אזור גיאוגרפי</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {areas.map((area) => (
            <Button
              key={area.id}
              onClick={() => {
                setSelectedArea(area.id);
                setSelectedType(null);
              }}
              variant={selectedArea === area.id ? 'default' : 'outline'}
              size="lg"
              className="h-20"
            >
              <h3 className="text-xl font-light mb-1">{area.label}</h3>
              {selectedArea === area.id && (
                <div className="mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                  נבחר
                </div>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Step 2: Information Type Selection (Conditional) */}
      {selectedArea && (
        <div className="mb-8 animate-fadeIn">
          <h2 className="text-lg font-medium text-slate-700 mb-4 flex items-center gap-2">
            <span>שלב 2:</span>
            <span className="font-light">בחר סוג מידע</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {types.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`glass-card p-4 text-right transition-all duration-300 ${
                  selectedType === type.id
                    ? 'bg-primary/20 border-primary shadow-lg scale-105'
                    : 'hover:scale-102'
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileText size={18} className={selectedType === type.id ? 'text-primary' : 'text-slate-600'} />
                  <span className={`text-sm font-medium ${selectedType === type.id ? 'text-primary' : 'text-slate-700'}`}>
                    {type.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Results (Conditional) */}
      {selectedArea && selectedType && (
        <div className="flex-1 animate-fadeIn">
          <h2 className="text-lg font-medium text-slate-700 mb-4 flex items-center gap-2">
            <span>תוצאות:</span>
            <span className="font-light">{types.find(t => t.id === selectedType)?.label}</span>
            <ChevronRight size={16} />
            <span className="font-light">{areas.find(a => a.id === selectedArea)?.label}</span>
          </h2>

          {results.length === 0 ? (
            <div className="flex items-center justify-center h-64 glass-card">
              <div className="text-center">
                <FileText size={48} className="mx-auto mb-4 text-slate-300" />
                <p className="text-slate-400 font-light">אין מסמכים זמינים</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((item, index) => (
                <div key={item.id} className="glass-card p-5" style={{ animation: `fadeIn 0.5s ease-out ${index * 0.1}s both` }}>
                  <h3 className="font-medium text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">{item.description}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ExtendedKnowledge;
