import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, Clock } from 'lucide-react';

const FloatingAlert = ({ alert, index, isEditMode, onDelete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Staggered animation delay based on index
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);

    return () => clearTimeout(timer);
  }, [index]);

  const getSeverityConfig = (severity) => {
    const configs = {
      critical: {
        color: 'border-red-500',
        dotColor: 'bg-red-500',
        bgGlow: 'bg-red-500/5',
        icon: AlertCircle,
        textColor: 'text-red-600'
      },
      high: {
        color: 'border-orange-500',
        dotColor: 'bg-orange-500',
        bgGlow: 'bg-orange-500/5',
        icon: AlertTriangle,
        textColor: 'text-orange-600'
      },
      normal: {
        color: 'border-primary',
        dotColor: 'bg-primary',
        bgGlow: 'bg-primary/5',
        icon: Info,
        textColor: 'text-primary'
      },
      success: {
        color: 'border-green-600',
        dotColor: 'bg-green-600',
        bgGlow: 'bg-green-600/5',
        icon: CheckCircle,
        textColor: 'text-green-600'
      }
    };
    return configs[severity] || configs.normal;
  };

  const config = getSeverityConfig(alert.severity);
  const IconComponent = config.icon;

  return (
    <div
      className={`
        relative group
        transform transition-all duration-700 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      `}
    >
      {/* Glassmorphism Container */}
      <div
        className={`
          relative overflow-hidden
          bg-white/40 backdrop-blur-md
          border-r-4 ${config.color}
          rounded-xl p-4
          hover:bg-white/60 hover:shadow-lg
          transition-all duration-300
          ${config.bgGlow}
        `}
      >
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

        <div className="relative flex items-start gap-4">
          {/* Icon & Dot Indicator */}
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <div className={`p-2 rounded-lg ${config.dotColor}/10`}>
              <IconComponent size={20} className={config.textColor} />
            </div>
            <div className={`w-2 h-2 rounded-full ${config.dotColor} animate-pulse`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-1">
              <h4
                className={`font-medium ${config.textColor} leading-relaxed ${
                  isEditMode ? 'border border-dashed border-slate-300 px-2 py-1 rounded' : ''
                }`}
                contentEditable={isEditMode}
                suppressContentEditableWarning
              >
                {alert.title}
              </h4>
              {isEditMode && (
                <button
                  onClick={() => onDelete?.(alert.id)}
                  className="flex-shrink-0 p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                  title="מחק התראה"
                >
                  ✕
                </button>
              )}
            </div>

            <p
              className={`text-sm text-slate-600 leading-relaxed mb-2 ${
                isEditMode ? 'border border-dashed border-slate-300 px-2 py-1 rounded' : ''
              }`}
              contentEditable={isEditMode}
              suppressContentEditableWarning
            >
              {alert.message}
            </p>

            {/* Timestamp */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock size={12} />
              <span className="font-mono">{alert.timestamp}</span>
              {alert.source && (
                <>
                  <span>•</span>
                  <span>{alert.source}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-l from-${config.color}/5 to-transparent`} />
      </div>
    </div>
  );
};

export default FloatingAlert;
