import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Clock from '../Clock';
import GlobalSearch from '../GlobalSearch';
import { getUserInfo } from '../../services/mockData';

const MainLayout = () => {
  const [userInfo, setUserInfo] = useState({ name: 'טוען...', role: '' });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getUserInfo();
      setUserInfo(data);
    };
    fetchUserInfo();
  }, []);

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

        {/* תוכן ראשי */}
        <main className="flex-1 overflow-auto relative">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;