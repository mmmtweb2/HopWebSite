import { useState } from 'react';
import { Grid3x3, ExternalLink } from 'lucide-react';
import { getAppsData } from '../services/newMockData';
import demoImage from '../assets/logo.png';

const Apps = () => {
  // Override colors to uniform black-white-green palette
  const apps = getAppsData().map(app => ({
    ...app,
    color: 'from-slate-800 via-slate-700 to-emerald-700'
  }));

  return (
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-slate-800 mb-2 leading-relaxed flex items-center gap-3">
          <Grid3x3 size={40} className="text-primary" />
          <span>מרכז אפליקציות</span>
        </h1>
        <p className="text-slate-500 font-light leading-relaxed">
          כל האפליקציות והמערכות הארגוניות במקום אחד
        </p>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {apps.map((app, index) => (
          <AppCard key={app.id} app={app} index={index} demoImage={demoImage} />
        ))}
      </div>
    </div>
  );
};

const AppCard = ({ app, index, demoImage }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative h-48 rounded-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img src={demoImage} alt={app.title} className="w-full h-full object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-80`} />
      </div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* App Title (Always Visible) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <h3 className="text-lg font-light text-white mb-1 leading-relaxed">
          {app.title}
        </h3>
      </div>

      {/* Hover Overlay (Glass Effect) */}
      <div
        className={`absolute inset-0 bg-white/10 backdrop-blur-md transition-all duration-500 flex flex-col items-center justify-center p-4 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="text-center">
          <div className="mb-3 p-3 bg-white/20 rounded-xl inline-block">
            <Grid3x3 size={32} className="text-white" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            {app.title}
          </h3>
          <p className="text-white/90 text-xs leading-relaxed mb-4">
            {app.description}
          </p>
          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto hover:scale-110 active:scale-95 border border-white/40 text-sm">
            <span className="font-medium">פתח אפליקציה</span>
            <ExternalLink size={14} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default Apps;
