import { Edit3, Save } from 'lucide-react';
import { useEditMode } from '../contexts/EditModeContext';

const EditModeToggle = () => {
  const { isEditMode, toggleEditMode, user } = useEditMode();

  // Only show for admin users
  if (!user.isAdmin) return null;

  return (
    <button
      onClick={toggleEditMode}
      className={`
        fixed bottom-6 left-6 z-50
        px-6 py-4 rounded-full
        backdrop-blur-lg border-2
        font-medium text-sm
        transition-all duration-500 ease-out
        shadow-2xl
        flex items-center gap-3
        group
        ${
          isEditMode
            ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400 text-white scale-110'
            : 'bg-white/40 border-white/60 text-slate-700 hover:bg-white/60 hover:scale-105'
        }
      `}
      title={isEditMode ? 'יציאה ממצב עריכה' : 'כניסה למצב עריכה'}
    >
      {/* Icon */}
      <div className={`
        p-2 rounded-full transition-all duration-300
        ${isEditMode ? 'bg-white/20' : 'bg-primary/10'}
      `}>
        {isEditMode ? (
          <Save size={20} className="group-hover:scale-110 transition-transform" />
        ) : (
          <Edit3 size={20} className="text-primary group-hover:scale-110 transition-transform" />
        )}
      </div>

      {/* Text */}
      <span className="font-medium">
        {isEditMode ? 'שמור שינויים' : 'מצב עריכה'}
      </span>

      {/* Pulse animation when active */}
      {isEditMode && (
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
      )}

      {/* Glow effect */}
      <div className={`
        absolute inset-0 rounded-full -z-10 blur-xl transition-opacity duration-300
        ${isEditMode ? 'bg-green-500 opacity-40' : 'bg-primary/20 opacity-0 group-hover:opacity-100'}
      `} />
    </button>
  );
};

export default EditModeToggle;
