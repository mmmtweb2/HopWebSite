import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Users, Laptop, Truck, DollarSign, Settings, ChevronLeft } from 'lucide-react';
import { getDepartments } from '../../services/mockData';

const iconMap = {
  Users: Users,
  Laptop: Laptop,
  Truck: Truck,
  DollarSign: DollarSign,
  Settings: Settings
};

const SecondarySidebar = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { departmentId } = useParams();

  useEffect(() => {
    const fetchDepartments = async () => {
      const data = await getDepartments();
      setDepartments(data);
      setLoading(false);
    };
    fetchDepartments();
  }, []);

  const getColorClass = (color) => {
    const colorMap = {
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      green: 'bg-green-500',
      red: 'bg-red-500',
      gray: 'bg-gray-500'
    };
    return colorMap[color] || 'bg-primary';
  };

  if (loading) {
    return (
      <aside className="w-64 bg-white border-l border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-200">
          <div className="h-6 bg-slate-200 rounded animate-pulse"></div>
        </div>
        <div className="p-3 space-y-2">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="h-16 bg-slate-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 bg-white border-l border-slate-200 shadow-sm flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-800">אגפים</h2>
        <p className="text-xs text-slate-500 mt-1">בחר אגף לצפייה</p>
      </div>

      {/* Departments List */}
      <nav className="flex-1 overflow-auto p-3 space-y-2">
        {departments.map((dept) => {
          const IconComponent = iconMap[dept.icon] || Users;
          const isActive = departmentId === dept.id;

          return (
            <button
              key={dept.id}
              onClick={() => navigate(`/departments/${dept.id}`)}
              className={`w-full text-right p-4 rounded-lg transition-all border-2 ${
                isActive
                  ? 'bg-primary/10 border-primary shadow-sm'
                  : 'bg-slate-50 border-transparent hover:bg-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Icon with color */}
                <div className={`p-2 rounded-lg ${getColorClass(dept.color)}/10`}>
                  <IconComponent
                    size={20}
                    className={`${getColorClass(dept.color).replace('bg-', 'text-')}`}
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-sm ${
                    isActive ? 'text-primary' : 'text-slate-800'
                  }`}>
                    {dept.name}
                  </h3>
                  <p className="text-xs text-slate-500 truncate">{dept.description}</p>
                </div>

                {/* Arrow indicator for active */}
                {isActive && (
                  <ChevronLeft size={16} className="text-primary flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default SecondarySidebar;
