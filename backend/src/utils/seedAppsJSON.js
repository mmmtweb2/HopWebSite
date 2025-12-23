/**
 * Apps Seed Script (JSON Database Version)
 * Populates the JSON database with initial apps at different security levels
 *
 * Run with: node src/utils/seedAppsJSON.js
 */

const { getCollection } = require('./jsonDB');

/**
 * Sample Apps with different security levels
 */
const apps = [
  {
    title: 'Google',
    description: 'חיפוש גוגל - גישה לכל המשתמשים',
    image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    link: 'https://www.google.com',
    icon: 'Search',
    color: 'from-blue-500 to-cyan-600',
    category: 'productivity',
    minSecurityLevel: 1, // Public - Everyone can access
    isActive: true,
  },
  {
    title: 'HR Portal',
    description: 'פורטל משאבי אנוש - למנהלים ומעלה',
    image: null,
    link: 'https://hr.example.com',
    icon: 'Users',
    color: 'from-green-500 to-emerald-600',
    category: 'hr',
    minSecurityLevel: 3, // Managers only (Level 3+)
    isActive: true,
  },
  {
    title: 'Nuclear Codes',
    description: '☢️ קודים סודיים - סיווג ביטחוני עליון בלבד',
    image: null,
    link: 'https://classified.example.com',
    icon: 'ShieldAlert',
    color: 'from-red-500 to-rose-600',
    category: 'other',
    minSecurityLevel: 5, // Top Secret - Admins only (Level 5)
    isActive: true,
  },
  {
    title: 'Employee Dashboard',
    description: 'לוח בקרה לעובדים - דרישת רמת אבטחה 2',
    image: null,
    link: 'https://dashboard.example.com',
    icon: 'LayoutDashboard',
    color: 'from-purple-500 to-violet-600',
    category: 'productivity',
    minSecurityLevel: 2, // Employees only (Level 2+)
    isActive: true,
  },
  {
    title: 'Analytics Hub',
    description: 'מרכז ניתוח נתונים - לבעלי הרשאה בלבד',
    image: null,
    link: 'https://analytics.example.com',
    icon: 'BarChart3',
    color: 'from-orange-500 to-amber-600',
    category: 'analytics',
    minSecurityLevel: 3, // Managers and up (Level 3+)
    isActive: true,
  },
  {
    title: 'Public News',
    description: 'חדשות ציבוריות - גישה חופשית',
    image: null,
    link: 'https://news.example.com',
    icon: 'Newspaper',
    color: 'from-indigo-500 to-blue-600',
    category: 'communication',
    minSecurityLevel: 1, // Public (Level 1)
    isActive: true,
  },
];

/**
 * Seed Apps
 */
const seedApps = () => {
  try {
    const appsDB = getCollection('apps');

    // Clear existing apps
    appsDB.clearAll();
    console.log('🗑️  Cleared existing apps');

    // Insert new apps
    const createdApps = appsDB.insertMany(apps);
    console.log(`✅ Created ${createdApps.length} apps:\n`);

    // Display created apps grouped by security level
    const levels = [1, 2, 3, 4, 5];
    levels.forEach((level) => {
      const levelApps = createdApps.filter((app) => app.minSecurityLevel === level);
      if (levelApps.length > 0) {
        console.log(`🔒 Security Level ${level}:`);
        levelApps.forEach((app) => {
          console.log(`   - ${app.title.padEnd(25)} | ${app.category.padEnd(15)} | ${app.description}`);
        });
        console.log('');
      }
    });

    return createdApps;
  } catch (error) {
    console.error('❌ Error seeding apps:', error.message);
    throw error;
  }
};

/**
 * Main seed function
 */
const seedAppsMain = () => {
  try {
    console.log('\n========================================');
    console.log('🎯 Apps Seed Script (JSON Database)');
    console.log('========================================\n');

    // Seed apps
    seedApps();

    console.log('========================================');
    console.log('✅ Apps seeding completed successfully!');
    console.log('========================================\n');

    console.log('📌 Security Level Breakdown:');
    console.log('   Level 1 (Public):       Google, Public News');
    console.log('   Level 2 (Employees):    Employee Dashboard');
    console.log('   Level 3 (Managers):     HR Portal, Analytics Hub');
    console.log('   Level 5 (Top Secret):   Nuclear Codes');
    console.log('\n💡 Testing:');
    console.log('   - Level 1 user sees 2 apps (public only)');
    console.log('   - Level 2 user sees 3 apps (public + employee)');
    console.log('   - Level 3 user sees 5 apps (public + employee + manager)');
    console.log('   - Level 5 user sees all 6 apps');
    console.log('\n🌐 Test with:');
    console.log('   curl -H "x-user-id: user.basic" http://localhost:5000/api/apps');
    console.log('   curl -H "x-user-id: manager.department" http://localhost:5000/api/apps');
    console.log('   curl -H "x-user-id: admin.security" http://localhost:5000/api/apps\n');

    console.log('📁 Data stored in: backend/data/apps.json\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

// Run the seed script
if (require.main === module) {
  seedAppsMain();
}

module.exports = { seedApps };
