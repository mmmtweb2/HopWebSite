import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Grid3x3, FileBarChart, BookOpen,
  FolderOpen, GitMerge, Users, CalendarDays, Edit3, Save
} from 'lucide-react';
import logo from '../../assets/logo.png';
import { useEditMode } from '../../contexts/EditModeContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const { isEditMode, toggleEditMode, user } = useEditMode();

  const navItems = [
    { icon: Grid3x3, label: 'אפליקציות', path: '/apps' },
    { icon: FileBarChart, label: 'דוחות מצב', path: '/situation-reports' },
    { icon: BookOpen, label: 'בסיס ידע', path: '/knowledge-base' },
    { icon: FolderOpen, label: 'ידע מורחב', path: '/extended-knowledge' },
    { icon: GitMerge, label: 'חפיפות', path: '/overlaps' },
    { icon: Users, label: 'אנשי קשר', path: '/contacts' },
    { icon: CalendarDays, label: 'לוח שנה', path: '/calendar' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`h-screen bg-gradient-to-b from-sidebar-bg via-sidebar-bg to-slate-950 text-white flex flex-col py-6 shadow-2xl z-50 border-l border-white/5 transition-all duration-500 overflow-hidden ${
        isHovered ? 'w-56' : 'w-20'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo - Home Button */}
      <div className={`flex items-center justify-center transition-all duration-500 ease-in-out ${
        isHovered ? 'mb-12 py-4' : 'mb-10 py-2'
      }`}>
        <button
          onClick={() => navigate('/')}
          className="rounded-xl shadow-lg shadow-emerald-900/40 relative flex-shrink-0 overflow-hidden transition-all duration-500 ease-in-out hover:scale-110 active:scale-95"
          title="חזרה לעמוד הבית"
        >
          <img
            src={logo}
            alt="Logo"
            className={`object-cover transition-all duration-500 ease-in-out ${
              isHovered ? 'w-24 h-24' : 'w-12 h-12'
            }`}
          />
          {/* Glow effect on hover */}
          <div className="absolute inset-0 bg-primary rounded-xl blur-lg opacity-0 hover:opacity-50 transition-opacity duration-300 -z-10" />
        </button>
      </div>

      <nav className={`flex flex-col gap-3 w-full overflow-y-auto flex-1 transition-all duration-500 ${isHovered ? 'px-3' : 'px-2'}`}>
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`
                group relative flex items-center gap-3 w-full py-3 flex-shrink-0
                rounded-xl transition-all duration-500 border-l-4
                ${isHovered ? 'px-4' : 'px-0 justify-center'}
                ${
                  active
                    ? 'text-white bg-white/10 backdrop-blur-md border-primary shadow-lg'
                    : 'text-slate-400 border-transparent hover:text-white hover:bg-white/5 hover:backdrop-blur-sm hover:border-primary/50'
                }
              `}
              title={!isHovered ? item.label : undefined}
            >
              {/* Active glow */}
              {active && (
                <div className="absolute inset-0 bg-gradient-to-l from-primary/20 to-transparent rounded-xl -z-10" />
              )}

              {/* Icon */}
              <IconComponent
                size={28}
                strokeWidth={active ? 2.5 : 2}
                className={`transition-all duration-300 flex-shrink-0 ${!isHovered && !active ? 'group-hover:-translate-y-1' : ''}`}
              />

              {/* Text label - only visible when hovered */}
              <span className={`text-sm font-medium whitespace-nowrap transition-all duration-500 ${
                active ? 'text-primary' : ''
              } ${
                isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute pointer-events-none'
              }`}>
                {item.label}
              </span>

              {/* Hover indicator */}
              {!active && (
                <div className="absolute left-0 w-1 h-0 bg-primary rounded-r-full group-hover:h-10 transition-all duration-500" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Edit Mode Toggle - Bottom of Sidebar */}
      {user.isAdmin && (
        <div className={`w-full flex-shrink-0 transition-all duration-500 ${isHovered ? 'px-3' : 'px-2'}`}>
          <button
            onClick={toggleEditMode}
            className={`
              group relative flex items-center gap-3 w-full py-3 flex-shrink-0
              rounded-xl transition-all duration-500 border-2
              ${isHovered ? 'px-4' : 'px-0 justify-center'}
              ${
                isEditMode
                  ? 'bg-green-500/20 border-green-500 text-green-400 shadow-lg'
                  : 'bg-white/5 border-white/20 text-slate-400 hover:bg-white/10 hover:border-primary/50 hover:text-white'
              }
            `}
            title={!isHovered ? (isEditMode ? 'שמור שינויים' : 'מצב עריכה') : undefined}
          >
            {/* Icon */}
            {isEditMode ? (
              <Save size={28} strokeWidth={2.5} className="transition-all duration-300 flex-shrink-0" />
            ) : (
              <Edit3 size={28} strokeWidth={2} className="transition-all duration-300 flex-shrink-0" />
            )}

            {/* Text label - only visible when hovered */}
            <span className={`text-sm font-medium whitespace-nowrap transition-all duration-500 ${
              isEditMode ? 'text-green-400' : ''
            } ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 absolute pointer-events-none'
            }`}>
              {isEditMode ? 'שמור שינויים' : 'מצב עריכה'}
            </span>

            {/* Pulse animation when active */}
            {isEditMode && (
              <div className="absolute inset-0 rounded-xl bg-green-500 animate-ping opacity-10" />
            )}
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;