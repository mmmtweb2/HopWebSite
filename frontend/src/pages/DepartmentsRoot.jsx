import { Building2, ArrowLeft } from 'lucide-react';

const DepartmentsRoot = () => {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="inline-flex p-6 bg-primary/10 rounded-full mb-6">
          <Building2 size={64} className="text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-3">ניהול אגפים</h2>
        <p className="text-slate-600 mb-6 leading-relaxed">
          בחר אגף מהרשימה בצד ימין כדי לצפות בפעולות הזמינות ולנהל את המערכת
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
          <ArrowLeft size={16} />
          <span>בחר אגף מהרשימה</span>
        </div>
      </div>
    </div>
  );
};

export default DepartmentsRoot;
