import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, PieChart as PieChartIcon } from 'lucide-react';
import FloatingFeed from '../components/FloatingFeed';
import ServerLoadChart from '../components/charts/ServerLoadChart';
import BudgetDonutChart from '../components/charts/BudgetDonutChart';
import ActivityBarChart from '../components/charts/ActivityBarChart';
import { useEditMode } from '../contexts/EditModeContext';
import { fetchHistoricalMetrics } from '../api/reportsService';

const Home = () => {
  const { isEditMode } = useEditMode();
  const [activeTab, setActiveTab] = useState('operational');
  const [serverLoadData, setServerLoadData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [budgetData] = useState([
    { name: 'IT', value: 35 },
    { name: 'HR', value: 20 },
    { name: 'לוגיסטיקה', value: 25 },
    { name: 'שיווק', value: 15 },
    { name: 'R&D', value: 5 }
  ]);

  useEffect(() => {
    loadChartData();
  }, []);

  const loadChartData = async () => {
    const serverData = await fetchHistoricalMetrics('serverLoad', 12);
    setServerLoadData(serverData.slice(-20));

    const activityStats = [
      { name: 'א', value: Math.floor(Math.random() * 100) + 50 },
      { name: 'ב', value: Math.floor(Math.random() * 100) + 50 },
      { name: 'ג', value: Math.floor(Math.random() * 100) + 50 },
      { name: 'ד', value: Math.floor(Math.random() * 100) + 50 },
      { name: 'ה', value: Math.floor(Math.random() * 100) + 50 },
      { name: 'ו', value: Math.floor(Math.random() * 100) + 50 },
      { name: 'ש', value: Math.floor(Math.random() * 100) + 50 }
    ];
    setActivityData(activityStats);
  };

  const mockAlerts = {
    operational: [
      { id: 1, title: 'עדכון תפעולי - שרת ראשי', message: 'השרת הראשי עבר אתחול מוצלח. כל המערכות פעילות ותקינות.', timestamp: '14:32:15', severity: 'success', source: 'מערכת תפעול' },
      { id: 2, title: 'שדרוג מערכת מתוכנן', message: 'שדרוג מתוכנן למערכת ה-CRM ביום ראשון הקרוב בשעות הערב.', timestamp: '13:45:22', severity: 'normal', source: 'IT' },
      { id: 3, title: 'גיבוי אוטומטי הושלם', message: 'גיבוי יומי של כל בסיסי הנתונים הסתיים בהצלחה.', timestamp: '12:00:00', severity: 'success', source: 'מערכת גיבוי' },
      { id: 4, title: 'עומס גבוה במערכת דיווח', message: 'זוהה עומס גבוה במערכת הדיווח בשעות הבוקר. הצוות בודק את הסיבה.', timestamp: '10:15:33', severity: 'high', source: 'ניטור' }
    ],
    alerts: [
      { id: 5, title: 'התראה קריטית - שרת מסד נתונים', message: 'שרת מסד הנתונים מגיב באיטיות. נדרשת התערבות דחופה.', timestamp: '14:55:10', severity: 'critical', source: 'מוקד תפעול' },
      { id: 6, title: 'ניסיון כניסה חשוד', message: 'זוהה ניסיון כניסה חשוד מכתובת IP לא מזוהה.', timestamp: '14:20:45', severity: 'high', source: 'אבטחת מידע' },
      { id: 7, title: 'אזהרת שטח אחסון', message: 'שטח האחסון בשרת הראשי הגיע ל-85%. מומלץ לפנות קבצים ישנים.', timestamp: '11:30:12', severity: 'high', source: 'מערכת אחסון' }
    ],
    systems: [
      { id: 8, title: 'מערכת HR - תקינה', message: 'מערכת ניהול משאבי אנוש פועלת תקין. זמן תגובה ממוצע: 120ms.', timestamp: '15:00:00', severity: 'success', source: 'ניטור מערכות' },
      { id: 9, title: 'מערכת לוגיסטיקה - תקינה', message: 'מערכת הלוגיסטיקה והמלאי פועלת ללא תקלות. 45 משתמשים מחוברים.', timestamp: '15:00:00', severity: 'success', source: 'ניטור מערכות' },
      { id: 10, title: 'מערכת כספים - בבדיקה', message: 'מתבצעת בדיקת ביצועים למערכת הכספים. זמינות חלקית למשך 10 דקות.', timestamp: '14:50:00', severity: 'normal', source: 'צוות תחזוקה' },
      { id: 11, title: 'מערכת CRM - עומס גבוה', message: 'מערכת ה-CRM חווה עומס גבוה בשל שיא כניסות. הביצועים עשויים להיות מושפעים.', timestamp: '13:22:18', severity: 'high', source: 'ניטור ביצועים' }
    ]
  };

  const tabs = [
    { id: 'operational', label: 'מבצעי', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'alerts', label: 'התראות', gradient: 'from-orange-500 to-red-500' },
    { id: 'systems', label: 'מערכות', gradient: 'from-green-500 to-emerald-500' }
  ];

  const chartCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut'
      }
    })
  };

  return (
    <div className="h-full overflow-auto py-8 px-6">
      {/* Header */}
      <div className="text-center mb-8 max-w-3xl mx-auto">
        <h1 className="text-4xl font-light text-slate-800 mb-2 leading-relaxed">
          לוח בקרה מרכזי
        </h1>
        <p className="text-slate-500 font-light leading-relaxed">
          ניטור בזמן אמת עם ויזואליזציות מתקדמות
        </p>
      </div>

      {/* Charts Dashboard */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Server Load Chart */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={chartCardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-card p-6 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-600">עומס שרת</h3>
                <p className="text-2xl font-light text-slate-800">
                  {serverLoadData[serverLoadData.length - 1]?.value || 0}%
                </p>
              </div>
            </div>
            <ServerLoadChart data={serverLoadData} />
          </motion.div>

          {/* Activity Bar Chart */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={chartCardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-card p-6 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Activity size={24} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-600">פעילות שבועית</h3>
                <p className="text-2xl font-light text-slate-800">
                  {activityData.reduce((sum, day) => sum + day.value, 0)}
                </p>
              </div>
            </div>
            <ActivityBarChart data={activityData} />
          </motion.div>

          {/* Budget Donut Chart */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={chartCardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-card p-6 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <PieChartIcon size={24} className="text-purple-500" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-600">חלוקת תקציב</h3>
                <p className="text-2xl font-light text-slate-800">100%</p>
              </div>
            </div>
            <BudgetDonutChart data={budgetData} />
          </motion.div>
        </div>
      </div>

      {/* Tab System */}
      <div className="max-w-[70%] min-w-[800px] mx-auto">
        <div className="flex justify-center gap-2 mb-6">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                relative px-8 py-4 rounded-xl font-normal text-base
                transition-all duration-500 ease-out
                ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-br ' + tab.gradient + ' text-white shadow-lg scale-105'
                    : 'bg-white/40 backdrop-blur-md text-slate-600 hover:bg-white/60'
                }
              `}
            >
              <span className="relative z-10">{tab.label}</span>
              {activeTab === tab.id && (
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${tab.gradient} opacity-20 blur-xl`} />
              )}
            </motion.button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white/30 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl p-8 min-h-[600px]"
        >
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/20 to-transparent rounded-t-2xl pointer-events-none" />
          <div className="relative">
            <FloatingFeed alerts={mockAlerts[activeTab]} isEditMode={isEditMode} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
