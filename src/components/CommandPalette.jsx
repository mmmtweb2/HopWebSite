import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import {
  Home, Grid3x3, FileBarChart, BookOpen, FolderOpen,
  GitMerge, Users, CalendarDays, Building2, LogOut,
  HelpCircle, Search
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import './CommandPalette.css';

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  // Toggle command palette with Ctrl+K or Cmd+K
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const pages = [
    { icon: Home, label: 'דף הבית', path: '/', description: 'חזרה לעמוד הראשי' },
    { icon: Grid3x3, label: 'אפליקציות', path: '/apps', description: 'גלריית אפליקציות ארגוניות' },
    { icon: FileBarChart, label: 'דוחות מצב', path: '/situation-reports', description: 'מדדים בזמן אמת' },
    { icon: BookOpen, label: 'בסיס ידע', path: '/knowledge-base', description: 'מסמכים ונהלים' },
    { icon: FolderOpen, label: 'ידע מורחב', path: '/extended-knowledge', description: 'תוכן לפי אזורים' },
    { icon: GitMerge, label: 'חפיפות', path: '/overlaps', description: 'תוכן משותף' },
    { icon: Users, label: 'אנשי קשר', path: '/contacts', description: 'ספר אנשי קשר' },
    { icon: CalendarDays, label: 'לוח שנה', path: '/calendar', description: 'אירועים ופגישות' },
    { icon: Building2, label: 'אגפים', path: '/departments', description: '7 אגפים ארגוניים' }
  ];

  const actions = [
    {
      icon: HelpCircle,
      label: 'צור קשר עם תמיכה',
      action: () => {
        toast.info('פותח תיבת תמיכה...');
        setOpen(false);
      },
      description: 'קבל עזרה טכנית'
    },
    {
      icon: LogOut,
      label: 'התנתק',
      action: async () => {
        await logout();
        toast.success('התנתקת בהצלחה');
        setOpen(false);
        navigate('/');
      },
      description: 'יציאה מהמערכת'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
    toast.success('ניווט בוצע בהצלחה');
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="command-palette"
    >
      <div className="command-palette-header">
        <Search size={18} className="command-search-icon" />
        <Command.Input
          placeholder="חפש דפים או פעולות... (Ctrl+K)"
          className="command-input"
        />
      </div>

      <Command.List className="command-list">
        <Command.Empty className="command-empty">
          לא נמצאו תוצאות
        </Command.Empty>

        <Command.Group heading="דפים" className="command-group">
          {pages.map((page) => {
            const Icon = page.icon;
            return (
              <Command.Item
                key={page.path}
                onSelect={() => handleNavigation(page.path)}
                className="command-item"
              >
                <Icon size={18} className="command-item-icon" />
                <div className="command-item-content">
                  <span className="command-item-label">{page.label}</span>
                  <span className="command-item-description">{page.description}</span>
                </div>
              </Command.Item>
            );
          })}
        </Command.Group>

        <Command.Separator className="command-separator" />

        <Command.Group heading="פעולות" className="command-group">
          {actions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <Command.Item
                key={idx}
                onSelect={action.action}
                className="command-item"
              >
                <Icon size={18} className="command-item-icon" />
                <div className="command-item-content">
                  <span className="command-item-label">{action.label}</span>
                  <span className="command-item-description">{action.description}</span>
                </div>
              </Command.Item>
            );
          })}
        </Command.Group>

        <Command.Group heading="מידע" className="command-group">
          <Command.Item className="command-item command-item-info">
            <Users size={18} className="command-item-icon" />
            <div className="command-item-content">
              <span className="command-item-label">משתמש: {user?.name}</span>
              <span className="command-item-description">תפקיד: {user?.role}</span>
            </div>
          </Command.Item>
        </Command.Group>
      </Command.List>

      <div className="command-footer">
        <kbd className="command-kbd">↑↓</kbd> ניווט
        <kbd className="command-kbd">⏎</kbd> בחר
        <kbd className="command-kbd">Esc</kbd> סגור
      </div>
    </Command.Dialog>
  );
};

export default CommandPalette;
