/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // הגדרת Heebo כפונט ברירת המחדל
        sans: ['Heebo', 'sans-serif'], 
      },
      colors: {
        'primary-dark': '#059669',
        // הגדרת פלטת הצבעים החדשה
        primary: {
          DEFAULT: '#10b981', // ירוק אמרלד רענן (לכפתורים ודגשים)
          foreground: '#ffffff',
          dark: '#059669',    // ירוק כהה יותר (למצבי Hover)
          light: '#d1fae5',   // ירוק בהיר מאוד (לרקעים עדינים)
        },
        secondary: {
          DEFAULT: '#64748b',
          foreground: '#ffffff',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#f1f5f9',
          foreground: '#0f172a',
        },
        background: '#f8fafc',
        foreground: '#0f172a',
        input: '#e2e8f0',
        ring: '#10b981',
        sidebar: {
          bg: '#0f172a',      // שחור-כחלחל עמוק (Slate-900) - נעים יותר משחור מוחלט
          hover: '#1e293b',   // צבע מעט בהיר יותר למעבר עכבר
          border: '#334155',  // צבע לקווי הפרדה בסרגל
        }
      }
    },
  },
  plugins: [],
}