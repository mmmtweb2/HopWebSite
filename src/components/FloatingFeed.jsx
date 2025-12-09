import { useState } from 'react';
import FloatingAlert from './FloatingAlert';
import { Plus } from 'lucide-react';

const FloatingFeed = ({ alerts: initialAlerts, isEditMode }) => {
  const [alerts, setAlerts] = useState(initialAlerts);

  const handleDelete = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleAddNew = () => {
    const newAlert = {
      id: Date.now(),
      title: 'התראה חדשה - לחץ לעריכה',
      message: 'תוכן ההתראה כאן...',
      timestamp: new Date().toLocaleTimeString('he-IL'),
      severity: 'normal',
      source: 'מערכת'
    };
    setAlerts([newAlert, ...alerts]);
  };

  return (
    <div className="space-y-3">
      {/* Add New Button (Edit Mode Only) */}
      {isEditMode && (
        <button
          onClick={handleAddNew}
          className="w-full py-3 px-4 bg-primary/20 backdrop-blur-md border-2 border-dashed border-primary/50 rounded-xl hover:bg-primary/30 hover:border-primary transition-all duration-300 flex items-center justify-center gap-2 text-primary font-medium"
        >
          <Plus size={20} />
          <span>הוסף התראה חדשה</span>
        </button>
      )}

      {/* Empty State */}
      {alerts.length === 0 ? (
        <div className="text-center py-12">
          <div className="inline-flex p-4 bg-slate-100/40 backdrop-blur-md rounded-full mb-4">
            <div className="w-12 h-12 bg-slate-200/60 rounded-full" />
          </div>
          <p className="text-slate-500 font-light">אין התראות להצגה</p>
        </div>
      ) : (
        // Alerts List
        alerts.map((alert, index) => (
          <FloatingAlert
            key={alert.id}
            alert={alert}
            index={index}
            isEditMode={isEditMode}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default FloatingFeed;
