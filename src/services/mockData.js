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
      id: "hr",
      name: "משאבי אנוש",
      icon: "Users",
      description: "ניהול כוח אדם וגיוס",
      color: "blue"
    },
    {
      id: "it",
      name: "מערכות מידע",
      icon: "Laptop",
      description: "תשתיות טכנולוגיות ותמיכה",
      color: "purple"
    },
    {
      id: "logistics",
      name: "לוגיסטיקה",
      icon: "Truck",
      description: "ניהול שרשרת אספקה",
      color: "orange"
    },
    {
      id: "finance",
      name: "כספים",
      icon: "DollarSign",
      description: "ניהול תקציב וחשבונאות",
      color: "green"
    },
    {
      id: "operations",
      name: "תפעול",
      icon: "Settings",
      description: "תפעול שוטף וניהול מערכות",
      color: "red"
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
