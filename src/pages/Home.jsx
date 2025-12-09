import { useState } from 'react';
import FloatingFeed from '../components/FloatingFeed';
import { useEditMode } from '../contexts/EditModeContext';

const Home = () => {
  const { isEditMode } = useEditMode();
  const [activeTab, setActiveTab] = useState('operational');

  // Mock data for different tabs
  const mockAlerts = {
    operational: [
      {
        id: 1,
        title: 'עדכון תפעולי - שרת ראשי',
        message: 'השרת הראשי עבר אתחול מוצלח. כל המערכות פעילות ותקינות.',
        timestamp: '14:32:15',
        severity: 'success',
        source: 'מערכת תפעול'
      },
      {
        id: 2,
        title: 'שדרוג מערכת מתוכנן',
        message: 'שדרוג מתוכנן למערכת ה-CRM ביום ראשון הקרוב בשעות הערב.',
        timestamp: '13:45:22',
        severity: 'normal',
        source: 'IT'
      },
      {
        id: 3,
        title: 'גיבוי אוטומטי הושלם',
        message: 'גיבוי יומי של כל בסיסי הנתונים הסתיים בהצלחה.',
        timestamp: '12:00:00',
        severity: 'success',
        source: 'מערכת גיבוי'
      },
      {
        id: 4,
        title: 'עומס גבוה במערכת דיווח',
        message: 'זוהה עומס גבוה במערכת הדיווח בשעות הבוקר. הצוות בודק את הסיבה.',
        timestamp: '10:15:33',
        severity: 'high',
        source: 'ניטור'
      }
    ],
    alerts: [
      {
        id: 5,
        title: 'התראה קריטית - שרת מסד נתונים',
        message: 'שרת מסד הנתונים מגיב באיטיות. נדרשת התערבות דחופה.',
        timestamp: '14:55:10',
        severity: 'critical',
        source: 'מוקד תפעול'
      },
      {
        id: 6,
        title: 'ניסיון כניסה חשוד',
        message: 'זוהה ניסיון כניסה חשוד מכתובת IP לא מזוהה.',
        timestamp: '14:20:45',
        severity: 'high',
        source: 'אבטחת מידע'
      },
      {
        id: 7,
        title: 'אזהרת שטח אחסון',
        message: 'שטח האחסון בשרת הראשי הגיע ל-85%. מומלץ לפנות קבצים ישנים.',
        timestamp: '11:30:12',
        severity: 'high',
        source: 'מערכת אחסון'
      }
    ],
    systems: [
      {
        id: 8,
        title: 'מערכת HR - תקינה',
        message: 'מערכת ניהול משאבי אנוש פועלת תקין. זמן תגובה ממוצע: 120ms.',
        timestamp: '15:00:00',
        severity: 'success',
        source: 'ניטור מערכות'
      },
      {
        id: 9,
        title: 'מערכת לוגיסטיקה - תקינה',
        message: 'מערכת הלוגיסטיקה והמלאי פועלת ללא תקלות. 45 משתמשים מחוברים.',
        timestamp: '15:00:00',
        severity: 'success',
        source: 'ניטור מערכות'
      },
      {
        id: 10,
        title: 'מערכת כספים - בבדיקה',
        message: 'מתבצעת בדיקת ביצועים למערכת הכספים. זמינות חלקית למשך 10 דקות.',
        timestamp: '14:50:00',
        severity: 'normal',
        source: 'צוות תחזוקה'
      },
      {
        id: 11,
        title: 'מערכת CRM - עומס גבוה',
        message: 'מערכת ה-CRM חווה עומס גבוה בשל שיא כניסות. הביצועים עשויים להיות מושפעים.',
        timestamp: '13:22:18',
        severity: 'high',
        source: 'ניטור ביצועים'
      }
    ]
  };

  const tabs = [
    { id: 'operational', label: 'מבצעי', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'alerts', label: 'התראות', gradient: 'from-orange-500 to-red-500' },
    { id: 'systems', label: 'מערכות', gradient: 'from-green-500 to-emerald-500' }
  ];

  return (
    <div className="h-full flex flex-col items-center justify-start py-8 px-4">
      {/* Header - Elegant & Light */}
      <div className="text-center mb-8 max-w-2xl">
        <h1 className="text-4xl font-light text-slate-800 mb-2 leading-relaxed">
          לוח בקרה מרכזי
        </h1>
        <p className="text-slate-500 font-light leading-relaxed">
          מעקב בזמן אמת אחר מערכות ארגוניות ותפעוליות
        </p>
      </div>

      {/* Centered Wide Tab System with Glassmorphism */}
      <div className="w-full max-w-[70%] min-w-[800px]">
        {/* Tab Headers */}
        <div className="flex justify-center gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative px-8 py-4 rounded-xl font-normal text-base
                transition-all duration-500 ease-out
                ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-br ' + tab.gradient + ' text-white shadow-lg scale-105'
                    : 'bg-white/40 backdrop-blur-md text-slate-600 hover:bg-white/60 hover:scale-102'
                }
              `}
            >
              <span className="relative z-10">{tab.label}</span>

              {/* Active indicator glow */}
              {activeTab === tab.id && (
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tab.gradient} opacity-20 blur-xl`} />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content - Glass Container */}
        <div className="relative bg-white/30 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl p-8 min-h-[600px]">
          {/* Subtle top gradient */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl pointer-events-none" />

          {/* Floating Feed */}
          <div className="relative">
            <FloatingFeed
              alerts={mockAlerts[activeTab]}
              isEditMode={isEditMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
