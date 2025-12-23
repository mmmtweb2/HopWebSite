import { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { getCalendarEvents } from '../services/newMockData';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 2, 1)); // March 2024
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'year'
  const events = getCalendarEvents();

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date(2024, 2, 1)); // March 2024
  };

  const goToMonth = (monthIndex) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setViewMode('month');
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    // Get day of week (0 = Sunday) and adjust for Hebrew calendar (Sunday = 0)
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];

  const dayNames = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const today = new Date().getDate();

  // Build calendar grid
  const calendarDays = [];

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const getEventForDay = (day) => {
    const dateStr = `2024-03-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const getEventColor = (type) => {
    const colors = {
      meeting: 'bg-blue-500',
      training: 'bg-purple-500',
      event: 'bg-orange-500'
    };
    return colors[type] || 'bg-primary';
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-slate-800 mb-2 leading-relaxed flex items-center gap-3">
          <CalendarDays size={40} className="text-primary" />
          <span>לוח אירועים</span>
        </h1>
        <p className="text-slate-500 font-light leading-relaxed">
          אירועים, פגישות והדרכות ארגוניות
        </p>
      </div>

      {/* Calendar Container */}
      <div className="flex-1 flex flex-col">
        <div className="glass-card p-6 flex-1 flex flex-col">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <button
                onClick={goToPreviousMonth}
                className="p-2 hover:bg-white/60 rounded-lg transition-colors"
                title="חודש קודם"
              >
                <ChevronRight size={24} className="text-slate-600" />
              </button>
              <button
                onClick={goToNextMonth}
                className="p-2 hover:bg-white/60 rounded-lg transition-colors"
                title="חודש הבא"
              >
                <ChevronLeft size={24} className="text-slate-600" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-light text-slate-800">
                {viewMode === 'month'
                  ? `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
                  : currentDate.getFullYear()
                }
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={goToToday}
                className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                היום
              </button>
              <button
                onClick={() => setViewMode(viewMode === 'month' ? 'year' : 'month')}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-white/60 rounded-lg transition-colors"
              >
                {viewMode === 'month' ? 'תצוגה שנתית' : 'תצוגה חודשית'}
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="flex-1">
            {viewMode === 'month' ? (
              <>
                {/* Day Names */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {dayNames.map((day, index) => (
                    <div
                      key={index}
                      className="text-center py-2 bg-primary/10 backdrop-blur-sm rounded-lg font-medium text-primary"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2 flex-1">
                  {calendarDays.map((day, index) => {
                    if (day === null) {
                      return <div key={`empty-${index}`} className="aspect-square" />;
                    }

                    const dayEvents = getEventForDay(day);
                    const isToday = day === 20; // Mock current day

                    return (
                      <div
                        key={day}
                        className={`relative aspect-square rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer ${
                          isToday
                            ? 'bg-gradient-to-br from-primary to-emerald-600 text-white shadow-glow-primary'
                            : dayEvents.length > 0
                            ? 'bg-white/60 backdrop-blur-sm border-2 border-primary/30 hover:border-primary'
                            : 'bg-white/40 backdrop-blur-sm hover:bg-white/60'
                        }`}
                      >
                        <div className="absolute top-2 right-2">
                          <span className={`text-sm font-medium ${isToday ? 'text-white' : 'text-slate-700'}`}>
                            {day}
                          </span>
                        </div>

                        {/* Event Dots */}
                        {dayEvents.length > 0 && (
                          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                            {dayEvents.map((event, idx) => (
                              <div
                                key={idx}
                                className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-white' : getEventColor(event.type)}`}
                                title={event.title}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              /* Yearly View */
              <div className="grid grid-cols-3 md:grid-cols-4 gap-4 overflow-auto">
                {monthNames.map((monthName, monthIndex) => {
                  const isCurrentMonth = monthIndex === currentDate.getMonth();
                  return (
                    <button
                      key={monthIndex}
                      onClick={() => goToMonth(monthIndex)}
                      className={`group relative h-32 rounded-xl overflow-hidden transition-all duration-300 ${
                        isCurrentMonth
                          ? 'scale-105 shadow-xl ring-2 ring-primary'
                          : 'hover:scale-102 hover:shadow-lg'
                      }`}
                    >
                      <div className={`absolute inset-0 ${
                        isCurrentMonth
                          ? 'bg-gradient-to-br from-primary to-emerald-600'
                          : 'bg-gradient-to-br from-slate-700 to-slate-800'
                      } opacity-90`} />
                      <div className="relative h-full flex flex-col items-center justify-center text-white p-4">
                        <CalendarDays size={32} className="mb-2 opacity-80" />
                        <span className="text-lg font-medium">{monthName}</span>
                        {isCurrentMonth && (
                          <div className="mt-2 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                            חודש נוכחי
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-slate-600">פגישות</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-sm text-slate-600">הדרכות</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-sm text-slate-600">אירועים</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-emerald-600" />
              <span className="text-sm text-slate-600">היום</span>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mt-6 glass-card p-6">
          <h3 className="text-lg font-medium text-slate-800 mb-4">אירועים קרובים</h3>
          <div className="space-y-3">
            {events.slice(0, 3).map((event, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/40 backdrop-blur-sm rounded-lg hover:bg-white/60 transition-all">
                <div className={`w-2 h-2 rounded-full ${getEventColor(event.type)}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{event.title}</p>
                  <p className="text-xs text-slate-500">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
