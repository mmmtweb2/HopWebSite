import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const RealTimeCard = ({ title, fetchData, icon: Icon, refreshInterval = 5000 }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trend, setTrend] = useState('stable');
  const [prevValue, setPrevValue] = useState(null);

  useEffect(() => {
    const fetchAndUpdate = async () => {
      try {
        const newData = await fetchData();

        // Calculate trend if we have a previous numeric value
        if (prevValue !== null && typeof newData.value === 'number') {
          if (newData.value > prevValue) {
            setTrend('up');
          } else if (newData.value < prevValue) {
            setTrend('down');
          } else {
            setTrend('stable');
          }
        }

        setPrevValue(newData.value);
        setData(newData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchAndUpdate();

    // Set up interval for updates
    const interval = setInterval(fetchAndUpdate, refreshInterval);

    return () => clearInterval(interval);
  }, [fetchData, refreshInterval, prevValue]);

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} className="text-green-500" />;
      case 'down':
        return <TrendingDown size={16} className="text-red-500" />;
      default:
        return <Minus size={16} className="text-slate-400" />;
    }
  };

  const getSeverityColor = () => {
    if (data?.severity === 'high') {
      return 'border-r-4 border-red-500 bg-red-50/50';
    }
    return 'border-r-4 border-primary/30';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 bg-slate-200 rounded w-24"></div>
          <div className="h-8 w-8 bg-slate-200 rounded"></div>
        </div>
        <div className="h-8 bg-slate-200 rounded w-16 mb-1"></div>
        <div className="h-4 bg-slate-200 rounded w-20"></div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-slate-200 p-6 transition-all hover:shadow-md ${getSeverityColor()}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-600">{data?.label || title}</h3>
        <div className="flex items-center gap-2">
          {getTrendIcon()}
          {Icon && (
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon size={20} className="text-primary" />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-slate-800">
          {data?.value}
        </span>
        {data?.unit && (
          <span className="text-sm text-slate-500">{data?.unit}</span>
        )}
      </div>

      {data?.status && (
        <div className="mt-2">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
            data.status === 'תקין'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {data.status}
          </span>
        </div>
      )}
    </div>
  );
};

export default RealTimeCard;
