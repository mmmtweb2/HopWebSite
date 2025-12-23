/**
 * Mock Data Service
 * Simulates backend API responses for the Organization Portal
 */

// Artificial delay to simulate network latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// User Information
export const getUserInfo = async () => {
  await delay(200);
  return {
    name: "ישראל ישראלי",
    role: "מנהל",
    email: "israel@organization.com",
    department: "ניהול"
  };
};

// Real-Time Metrics (random values with slight delay)
export const getServerLoad = async () => {
  await delay(150);
  return {
    value: Math.floor(Math.random() * 100),
    unit: "%",
    label: "עומס שרת"
  };
};

export const getActiveUsers = async () => {
  await delay(180);
  return {
    value: Math.floor(Math.random() * 500) + 100,
    unit: "משתמשים",
    label: "משתמשים פעילים"
  };
};

export const getAlerts = async () => {
  await delay(160);
  return {
    value: Math.floor(Math.random() * 10),
    unit: "התראות",
    label: "התראות פעילות",
    severity: Math.random() > 0.7 ? "high" : "normal"
  };
};

export const getSystemStatus = async () => {
  await delay(170);
  const statuses = ["תקין", "תקין", "תקין", "בעיה קלה"];
  return {
    status: statuses[Math.floor(Math.random() * statuses.length)],
    label: "סטטוס מערכת"
  };
};

export const getNetworkTraffic = async () => {
  await delay(165);
  return {
    value: (Math.random() * 100).toFixed(1),
    unit: "Mbps",
    label: "תעבורת רשת"
  };
};

export const getDatabaseConnections = async () => {
  await delay(155);
  return {
    value: Math.floor(Math.random() * 50) + 10,
    unit: "חיבורים",
    label: "חיבורי DB"
  };
};

// Departments List
export const getDepartments = async () => {
  await delay(250);
  return [
    {
      id: "dev",
      name: "אגף פיתוח",
      icon: "GitBranch",
      description: "מחקר ופיתוח טכנולוגי",
      color: "blue",
      template: "development"
    },
    {
      id: "pub",
      name: "אגף הוצאה לאור",
      icon: "FileText",
      description: "פרסומים ומסמכים",
      color: "purple",
      template: "publishing"
    },
    {
      id: "geo",
      name: "אגף תוכן גיאוגרפי",
      icon: "Map",
      description: "מידע גיאוגרפי ותוכן",
      color: "orange",
      template: "geo-content"
    },
    {
      id: "complex",
      name: "אגף 4",
      icon: "Building2",
      description: "אגף רב-תחומי מורכב",
      color: "green",
      template: "complex"
    },
    {
      id: "standard1",
      name: "אגף משאבי אנוש",
      icon: "Users",
      description: "ניהול כוח אדם וגיוס",
      color: "blue",
      template: "standard"
    },
    {
      id: "standard2",
      name: "אגף לוגיסטיקה",
      icon: "Truck",
      description: "ניהול שרשרת אספקה",
      color: "red",
      template: "standard"
    },
    {
      id: "standard3",
      name: "אגף כספים",
      icon: "DollarSign",
      description: "ניהול תקציב וחשבונאות",
      color: "green",
      template: "standard"
    }
  ];
};

// Get Department by ID
export const getDepartmentById = async (id) => {
  const departments = await getDepartments();
  return departments.find(dept => dept.id === id);
};

// Department Actions (specific actions per department)
export const getDepartmentActions = async (departmentId) => {
  await delay(200);

  const actionsMap = {
    hr: [
      { id: 1, title: "ניהול עובדים", icon: "Users", color: "blue" },
      { id: 2, title: "תהליכי גיוס", icon: "UserPlus", color: "green" },
      { id: 3, title: "נוכחות ושעות", icon: "Clock", color: "orange" },
      { id: 4, title: "הדרכות", icon: "GraduationCap", color: "purple" }
    ],
    it: [
      { id: 1, title: "ניהול משתמשים", icon: "UserCog", color: "blue" },
      { id: 2, title: "תקלות ופניות", icon: "AlertCircle", color: "red" },
      { id: 3, title: "תשתיות", icon: "Server", color: "gray" },
      { id: 4, title: "אבטחת מידע", icon: "Shield", color: "green" }
    ],
    logistics: [
      { id: 1, title: "ניהול מלאי", icon: "Package", color: "orange" },
      { id: 2, title: "הזמנות", icon: "ShoppingCart", color: "blue" },
      { id: 3, title: "משלוחים", icon: "Truck", color: "green" },
      { id: 4, title: "ספקים", icon: "Building", color: "purple" }
    ],
    finance: [
      { id: 1, title: "תקציב", icon: "PieChart", color: "green" },
      { id: 2, title: "חשבוניות", icon: "FileText", color: "blue" },
      { id: 3, title: "דוחות כספיים", icon: "BarChart", color: "purple" },
      { id: 4, title: "אישורים", icon: "CheckCircle", color: "orange" }
    ],
    operations: [
      { id: 1, title: "ניטור מערכות", icon: "Activity", color: "red" },
      { id: 2, title: "לוחות בקרה", icon: "Monitor", color: "blue" },
      { id: 3, title: "תהליכים", icon: "GitBranch", color: "purple" },
      { id: 4, title: "אופטימיזציה", icon: "Zap", color: "yellow" }
    ]
  };

  return actionsMap[departmentId] || [];
};

// News Ticker Data (for Geo-Content Department)
export const getNewsTicker = async () => {
  await delay(200);
  return [
    "עדכון: פורסם מפת שטח חדשה לאזור הצפון",
    "דוח חדש: סקר גיאוגרפי מקיף של אזור המרכז",
    "התראה: שינויים בנתוני GIS - נא לעדכן מערכות",
    "חדש: ספריית מדיה גיאוגרפית מורחבת",
    "עדכון שטח: מידע מעודכן על אזורי דרום"
  ];
};

// Sections (Madorim) Data for Complex Department
export const getDepartmentSections = async (departmentId) => {
  await delay(200);

  if (departmentId !== 'complex') return [];

  return [
    {
      id: 1,
      name: "מדור תכנון אסטרטגי",
      icon: "Target",
      color: "blue",
      description: "תכנון ארוך טווח ואסטרטגיה ארגונית"
    },
    {
      id: 2,
      name: "מדור מחקר ופיתוח",
      icon: "Beaker",
      color: "purple",
      description: "מחקרים, ניסויים וחדשנות"
    },
    {
      id: 3,
      name: "מדור ניתוח נתונים",
      icon: "BarChart3",
      color: "orange",
      description: "ניתוח מידע וביג דאטה"
    },
    {
      id: 4,
      name: "מדור תקשורת",
      icon: "Wifi",
      color: "green",
      description: "תשתיות תקשורת ורשתות"
    },
    {
      id: 5,
      name: "מדור בטיחות",
      icon: "ShieldCheck",
      color: "red",
      description: "בטיחות ואבטחת מידע"
    },
    {
      id: 6,
      name: "מדור הדרכה",
      icon: "GraduationCap",
      color: "blue",
      description: "הדרכות וקורסים מקצועיים"
    }
  ];
};

// Section Content Data (for Complex Department sub-routes)
export const getSectionContent = async (sectionId, contentType) => {
  await delay(200);

  const contentMap = {
    documents: [
      { id: 1, title: "מסמך תכנון 2024", date: "2024-01-15", type: "PDF" },
      { id: 2, title: "דוח פעילות חודשי", date: "2024-02-01", type: "DOCX" },
      { id: 3, title: "נהלי עבודה מעודכנים", date: "2024-02-15", type: "PDF" }
    ],
    media: [
      { id: 1, title: "מצגת השקת פרויקט", date: "2024-01-20", type: "PPTX" },
      { id: 2, title: "וידאו הדרכה", date: "2024-02-05", type: "MP4" },
      { id: 3, title: "אינפוגרפיקה", date: "2024-02-10", type: "PNG" }
    ],
    data: [
      { id: 1, title: "נתוני ביצועים Q1", date: "2024-01-25", type: "XLSX" },
      { id: 2, title: "סטטיסטיקות שימוש", date: "2024-02-08", type: "CSV" },
      { id: 3, title: "דוח מדדים", date: "2024-02-12", type: "XLSX" }
    ],
    links: [
      { id: 1, title: "מערכת ניהול פרויקטים", url: "#", type: "External" },
      { id: 2, title: "פורטל עובדים", url: "#", type: "Internal" },
      { id: 3, title: "מאגר ידע מרכזי", url: "#", type: "Internal" }
    ]
  };

  return contentMap[contentType] || [];
};

// Section About Info
export const getSectionAbout = async (sectionId) => {
  await delay(150);
  return {
    title: "אודות המדור",
    description: "מדור זה אחראי על תכנון, ביצוע וניהול פעילות מרכזית בארגון. הצוות כולל מומחים מנוסים בתחומים שונים.",
    manager: "דר' יוסי כהן",
    team: 12,
    established: "2018",
    contact: "extension: 1234"
  };
};

// All Real-Time Metrics (for convenience)
export const getAllMetrics = async () => {
  const [serverLoad, activeUsers, alerts, systemStatus, networkTraffic, dbConnections] = await Promise.all([
    getServerLoad(),
    getActiveUsers(),
    getAlerts(),
    getSystemStatus(),
    getNetworkTraffic(),
    getDatabaseConnections()
  ]);

  return {
    serverLoad,
    activeUsers,
    alerts,
    systemStatus,
    networkTraffic,
    dbConnections
  };
};
