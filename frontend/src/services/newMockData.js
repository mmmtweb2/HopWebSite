/**
 * Comprehensive Mock Data Service for 8-Page Portal
 */

// Applications Hub Data
export const getAppsData = () => {
  return [
    {
      id: 1,
      title: 'מערכת CRM',
      description: 'ניהול קשרי לקוחות וניהול מכירות מתקדם',
      image: '/apps/crm.jpg',
      color: 'from-blue-500 to-cyan-600',
      icon: 'Users'
    },
    {
      id: 2,
      title: 'מערכת HR',
      description: 'ניהול משאבי אנוש, שכר ונוכחות',
      image: '/apps/hr.jpg',
      color: 'from-purple-500 to-violet-600',
      icon: 'Briefcase'
    },
    {
      id: 3,
      title: 'לוגיסטיקה',
      description: 'ניהול מלאי, הזמנות ומשלוחים',
      image: '/apps/logistics.jpg',
      color: 'from-orange-500 to-amber-600',
      icon: 'Truck'
    },
    {
      id: 4,
      title: 'כספים',
      description: 'ניהול תקציב, חשבונאות ודוחות כספיים',
      image: '/apps/finance.jpg',
      color: 'from-green-500 to-emerald-600',
      icon: 'DollarSign'
    },
    {
      id: 5,
      title: 'פרויקטים',
      description: 'ניהול פרויקטים, משימות וצוותים',
      image: '/apps/projects.jpg',
      color: 'from-indigo-500 to-blue-600',
      icon: 'FolderKanban'
    },
    {
      id: 6,
      title: 'דוחות BI',
      description: 'ניתוח נתונים ודשבורדים אינטראקטיביים',
      image: '/apps/bi.jpg',
      color: 'from-pink-500 to-rose-600',
      icon: 'BarChart3'
    }
  ];
};

// Situation Reports Data (for SmartFilterLayout)
export const getSituationReportsData = () => {
  return [
    {
      id: 1,
      title: 'דוח מצב יומי - מטה ראשי',
      description: 'סיכום פעילות יומית ומצב כוחות במטה הראשי',
      date: '2024-12-10',
      timeCategory: 'daily',
      level: 'management',
      area: null,
      tag: 'דחוף'
    },
    {
      id: 2,
      title: 'דוח אזורי צפון - שבועי',
      description: 'סיכום פעילות שבועית באזור הצפון',
      date: '2024-12-08',
      timeCategory: 'weekly',
      level: 'regional',
      area: 'north',
      tag: 'רגיל'
    },
    {
      id: 3,
      title: 'דוח תת-אזורי מרכז - יומי',
      description: 'מצב כוחות ופעילות יומית בתת-אזור מרכז',
      date: '2024-12-11',
      timeCategory: 'daily',
      level: 'sub-regional',
      area: 'center',
      tag: 'עדכון'
    },
    {
      id: 4,
      title: 'דוח תקופתי - הנהלה',
      description: 'דוח רבעוני למנכ"ל והנהלה בכירה',
      date: '2024-10-01',
      timeCategory: 'periodic',
      level: 'management',
      area: null,
      tag: 'אסטרטגי'
    },
    {
      id: 5,
      title: 'דוח יומי דרום',
      description: 'סיכום פעילות יומית באזור הדרום',
      date: '2024-12-09',
      timeCategory: 'daily',
      level: 'regional',
      area: 'south',
      tag: 'רגיל'
    },
    {
      id: 6,
      title: 'דוח שבועי - תת-אזור צפון',
      description: 'סיכום שבועי לתת-אזור צפוני',
      date: '2024-12-05',
      timeCategory: 'weekly',
      level: 'sub-regional',
      area: 'north',
      tag: 'עדכון'
    }
  ];
};

// Knowledge Base Data (for SmartFilterLayout)
export const getKnowledgeBaseData = () => {
  return [
    {
      id: 1,
      title: 'נוהל בטיחות - הנהלה',
      description: 'נהלי בטיחות עבור רמת הנהלה',
      date: '2024-03-10',
      timeCategory: 'periodic',
      level: 'management',
      area: null,
      tag: 'נוהל'
    },
    {
      id: 2,
      title: 'הדרכת צוות - אזור צפון',
      description: 'חומרי הדרכה לצוותים באזור הצפון',
      date: '2024-03-15',
      timeCategory: 'daily',
      level: 'regional',
      area: 'north',
      tag: 'הדרכה'
    },
    {
      id: 3,
      title: 'מדריך תפעול - תת-אזור מרכז',
      description: 'מדריך תפעול מפורט לתת-אזור מרכז',
      date: '2024-03-18',
      timeCategory: 'weekly',
      level: 'sub-regional',
      area: 'center',
      tag: 'מדריך'
    },
    {
      id: 4,
      title: 'עדכון תקופתי - נהלים',
      description: 'עדכון תקופתי לנהלי העבודה',
      date: '2024-03-01',
      timeCategory: 'periodic',
      level: 'management',
      area: null,
      tag: 'עדכון'
    },
    {
      id: 5,
      title: 'FAQ - אזור דרום',
      description: 'שאלות ותשובות נפוצות לאזור הדרום',
      date: '2024-03-12',
      timeCategory: 'weekly',
      level: 'regional',
      area: 'south',
      tag: 'FAQ'
    }
  ];
};

// Extended Knowledge - Drill-down Data
export const getExtendedKnowledgeData = () => {
  return {
    north: {
      type1: [
        { id: 1, title: 'מסמך א - צפון', description: 'תיאור מסמך', date: '2024-03-15' },
        { id: 2, title: 'מסמך ב - צפון', description: 'תיאור מסמך', date: '2024-03-14' }
      ],
      type2: [
        { id: 3, title: 'נוהל א - צפון', description: 'תיאור נוהל', date: '2024-03-13' }
      ],
      type3: [],
      type4: [],
      type5: [],
      type6: [],
      type7: [],
      type8: []
    },
    center: {
      type1: [
        { id: 10, title: 'מסמך א - מרכז', description: 'תיאור מסמך', date: '2024-03-15' }
      ],
      type2: [],
      type3: [],
      type4: [],
      type5: [],
      type6: [],
      type7: [],
      type8: []
    },
    south: {
      type1: [],
      type2: [],
      type3: [],
      type4: [],
      type5: [],
      type6: [],
      type7: [],
      type8: []
    }
  };
};

export const getExtendedKnowledgeTypes = () => [
  { id: 'type1', label: 'מסמכים רשמיים' },
  { id: 'type2', label: 'נהלים ותקנות' },
  { id: 'type3', label: 'הנחיות תפעוליות' },
  { id: 'type4', label: 'הדרכות וקורסים' },
  { id: 'type5', label: 'מדריכים טכניים' },
  { id: 'type6', label: 'מצגות ודוחות' },
  { id: 'type7', label: 'טפסים ובקשות' },
  { id: 'type8', label: 'FAQ ותמיכה' }
];

// Organizational Overlaps - Drill-down Data
export const getOverlapsData = () => {
  return {
    north: {
      type1: [
        { id: 1, title: 'חפיפה HR-IT צפון', description: 'ממשק בין מחלקות', date: '2024-03-10' }
      ],
      type2: [],
      type3: [],
      type4: []
    },
    center: {
      type1: [],
      type2: [],
      type3: [],
      type4: []
    },
    south: {
      type1: [],
      type2: [],
      type3: [],
      type4: []
    }
  };
};

export const getOverlapsTypes = () => [
  { id: 'type1', label: 'חפיפות בין-מחלקתיות' },
  { id: 'type2', label: 'ממשקי עבודה' },
  { id: 'type3', label: 'תיאומים נדרשים' },
  { id: 'type4', label: 'אזורי אחריות משותפת' }
];

// Contacts Directory Data (JSON Structure)
export const getContactsData = () => {
  return {
    hr: {
      dept: 'משאבי אנוש',
      groups: [
        {
          title: 'גיוס וקליטה',
          contacts: [
            { section: 'גיוס', role: 'מנהל גיוס', number: '03-1234567' },
            { section: 'גיוס', role: 'רכז קליטה', number: '03-1234568' },
            { section: 'קליטה', role: 'מנהל קליטה', number: '03-1234569' }
          ]
        },
        {
          title: 'שכר והטבות',
          contacts: [
            { section: 'שכר', role: 'מנהל שכר', number: '03-1234570' },
            { section: 'הטבות', role: 'רכז הטבות', number: '03-1234571' }
          ]
        }
      ]
    },
    it: {
      dept: 'מערכות מידע',
      groups: [
        {
          title: 'תשתיות',
          contacts: [
            { section: 'רשתות', role: 'מנהל רשתות', number: '03-2234567' },
            { section: 'שרתים', role: 'מנהל שרתים', number: '03-2234568' }
          ]
        },
        {
          title: 'תמיכה',
          contacts: [
            { section: 'Help Desk', role: 'ראש תמיכה', number: '03-2234569' },
            { section: 'תמיכה', role: 'טכנאי בכיר', number: '03-2234570' }
          ]
        }
      ]
    },
    logistics: {
      dept: 'לוגיסטיקה',
      groups: [
        {
          title: 'ניהול מלאי',
          contacts: [
            { section: 'מלאי', role: 'מנהל מלאי', number: '03-3334567' },
            { section: 'רכש', role: 'רכז רכש', number: '03-3334568' }
          ]
        }
      ]
    },
    finance: {
      dept: 'כספים',
      groups: [
        {
          title: 'חשבונאות',
          contacts: [
            { section: 'הנהלת חשבונות', role: 'רואה חשבון', number: '03-4434567' }
          ]
        }
      ]
    },
    operations: {
      dept: 'תפעול',
      groups: [
        {
          title: 'תפעול שוטף',
          contacts: [
            { section: 'תפעול', role: 'מנהל תפעול', number: '03-5534567' }
          ]
        }
      ]
    },
    marketing: {
      dept: 'שיווק',
      groups: [
        {
          title: 'שיווק דיגיטלי',
          contacts: [
            { section: 'דיגיטל', role: 'מנהל שיווק', number: '03-6634567' }
          ]
        }
      ]
    }
  };
};

// Calendar Events Data
export const getCalendarEvents = () => {
  return [
    { date: '2024-03-05', title: 'פגישת הנהלה', type: 'meeting' },
    { date: '2024-03-12', title: 'הדרכת צוות', type: 'training' },
    { date: '2024-03-15', title: 'יום גיבוש', type: 'event' },
    { date: '2024-03-20', title: 'ישיבת תקציב', type: 'meeting' },
    { date: '2024-03-25', title: 'כנס שנתי', type: 'event' }
  ];
};
