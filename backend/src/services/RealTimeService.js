/**
 * Real-Time Service
 * Simulates fetching data from external systems
 * Returns mock data for Situation Reports and Knowledge Base
 * NOTE: This service does NOT use MongoDB - all data is generated in-memory
 */

/**
 * Generate mock Situation Reports
 * @returns {Array} - Array of situation report objects
 */
const getSituationReports = () => {
  return [
    {
      id: '1',
      title: 'דוח מצב יומי - מטה ראשי',
      description: 'סיכום פעילות יומית ומצב כוחות במטה הראשי',
      date: new Date('2024-12-10'),
      timeCategory: 'daily',
      level: 'management',
      area: null,
      tag: 'דחוף',
    },
    {
      id: '2',
      title: 'דוח אזורי צפון - שבועי',
      description: 'סיכום פעילות שבועית באזור הצפון',
      date: new Date('2024-12-08'),
      timeCategory: 'weekly',
      level: 'regional',
      area: 'north',
      tag: 'רגיל',
    },
    {
      id: '3',
      title: 'דוח תת-אזורי מרכז - יומי',
      description: 'מצב כוחות ופעילות יומית בתת-אזור מרכז',
      date: new Date('2024-12-11'),
      timeCategory: 'daily',
      level: 'sub-regional',
      area: 'center',
      tag: 'עדכון',
    },
    {
      id: '4',
      title: 'דוח תקופתי - הנהלה',
      description: 'דוח רבעוני למנכ"ל והנהלה בכירה',
      date: new Date('2024-10-01'),
      timeCategory: 'periodic',
      level: 'management',
      area: null,
      tag: 'אסטרטגי',
    },
    {
      id: '5',
      title: 'דוח יומי דרום',
      description: 'סיכום פעילות יומית באזור הדרום',
      date: new Date('2024-12-09'),
      timeCategory: 'daily',
      level: 'regional',
      area: 'south',
      tag: 'רגיל',
    },
    {
      id: '6',
      title: 'דוח שבועי - תת-אזור צפון',
      description: 'סיכום שבועי לתת-אזור צפוני',
      date: new Date('2024-12-05'),
      timeCategory: 'weekly',
      level: 'sub-regional',
      area: 'north',
      tag: 'עדכון',
    },
  ];
};

/**
 * Generate mock Knowledge Base articles
 * @returns {Array} - Array of knowledge article objects
 */
const getKnowledgeBaseArticles = () => {
  return [
    {
      id: '1',
      title: 'מדריך שימוש במערכת CRM',
      description: 'הסבר מפורט על כל התכונות במערכת ניהול קשרי הלקוחות החדשה',
      date: new Date('2024-11-15'),
      category: 'technical',
      tags: ['CRM', 'מדריך', 'מערכות'],
      link: null,
    },
    {
      id: '2',
      title: 'נהלי בטיחות מידע',
      description: 'הנחיות ארגוניות לשמירה על אבטחת מידע ופרטיות',
      date: new Date('2024-11-20'),
      category: 'security',
      tags: ['אבטחה', 'נהלים', 'פרטיות'],
      link: null,
    },
    {
      id: '3',
      title: 'תהליכי אישור תקציב',
      description: 'מדריך שלב אחר שלב לתהליך אישור תקציב שנתי',
      date: new Date('2024-10-30'),
      category: 'finance',
      tags: ['תקציב', 'כספים', 'תהליכים'],
      link: null,
    },
    {
      id: '4',
      title: 'מדיניות עבודה מהבית',
      description: 'כללים והנחיות לעבודה מרחוק והיברידית',
      date: new Date('2024-12-01'),
      category: 'hr',
      tags: ['משאבי אנוש', 'עבודה מרחוק', 'מדיניות'],
      link: null,
    },
    {
      id: '5',
      title: 'שימוש במערכת לוגיסטיקה',
      description: 'הוראות תפעול למערכת ניהול המלאי והמשלוחים',
      date: new Date('2024-11-25'),
      category: 'operations',
      tags: ['לוגיסטיקה', 'מלאי', 'מערכות'],
      link: null,
    },
  ];
};

/**
 * Simulate delay (for realistic API behavior)
 * @param {Number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
const simulateDelay = (ms = 300) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Fetch Situation Reports with simulated delay
 * @returns {Promise<Array>}
 */
const fetchReports = async () => {
  await simulateDelay(300);
  return getSituationReports();
};

/**
 * Fetch Knowledge Base articles with simulated delay
 * @returns {Promise<Array>}
 */
const fetchKnowledge = async () => {
  await simulateDelay(300);
  return getKnowledgeBaseArticles();
};

export {
  fetchReports,
  fetchKnowledge,
};
