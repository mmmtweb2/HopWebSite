import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Clock from '../Clock';
import GlobalSearch from '../GlobalSearch';
import { useAuth } from '../../contexts/AuthContext';

const MainLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({ name: 'טוען...', role: '' });

  useEffect(() => {
    if (user) {
      setUserInfo({ name: user.name, role: user.role });
    }
  }, [user]);

  return (
    <div dir="rtl" className="flex h-screen w-screen overflow-hidden font-sans text-slate-900 relative">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-emerald-50 -z-10">
        {/* Subtle animated orbs for depth */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <Sidebar />

      {/* אזור התוכן */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">

        {/* TopBar - Glassmorphism */}
        <header className="h-16 bg-white/60 backdrop-blur-xl border-b border-white/40 flex items-center px-6 justify-between shadow-lg z-10">
           {/* Gradient overlay */}
           <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

           <div className="relative flex items-center gap-2">
             <h1 className="text-xl font-light text-slate-800 leading-relaxed">BlaBla</h1>
           </div>

           {/* Global Search Bar */}
           <div className="relative flex-1 max-w-md mx-8">
             <GlobalSearch />
           </div>

           <div className="relative flex items-center gap-4 text-sm">
             <Clock />
             <span className="h-4 w-[1px] bg-slate-300/50"></span>
             <div className="flex items-center gap-2">
               <span className="text-slate-600 font-light">שלום,</span>
               <span className="font-medium text-slate-800">{userInfo.name}</span>
               <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-br from-primary to-emerald-600 text-white font-medium shadow-md">
                 {userInfo.role}
               </span>
             </div>
           </div>
        </header>

        {/* תוכן ראשי with Page Transitions */}
        <main className="flex-1 overflow-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
};

export default MainLayout;