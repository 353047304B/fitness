import React from 'react';
import { useWorkout } from '../store/WorkoutContext';
import { BottomNav } from '../components/BottomNav';

export const CalendarScreen: React.FC = () => {
  const { completedDates, restDates, toggleCalendarDay } = useWorkout();

  const today = new Date();
  const currentYear = today.getFullYear();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const renderMonth = (monthIndex: number) => {
    const firstDay = new Date(currentYear, monthIndex, 1).getDay();
    const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();

    const days = [];
    
    // Fill empty spaces for the first week
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${monthIndex}-${i}`} className="calendar-day empty"></div>);
    }

    // Fill the days of the month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateString = `${currentYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isCompleted = completedDates.includes(dateString);
      const isRest = restDates.includes(dateString);
    let className = "calendar-day";
    if (isCompleted) className += " completed";
    else if (isRest) className += " rest";

      days.push(
        <div 
          key={`day-${monthIndex}-${d}`} 
          className={className}
          onClick={() => toggleCalendarDay(dateString)}
          style={{ cursor: 'pointer' }}
        >
          {d}
        </div>
      );
    }

    return (
      <div key={`month-${monthIndex}`} className="flex-col" style={{ marginBottom: '32px' }}>
        <h2 className="text-lg mb-4" style={{ textAlign: 'center' }}>{monthNames[monthIndex]} {currentYear}</h2>
        
        {/* Days of week header */}
        <div className="calendar-grid days-header mb-2">
          <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-col h-full">
      {/* Header */}
      <header className="header" style={{ flexShrink: 0 }}>
        <h1 className="text-xl">Calendar</h1>
      </header>

      {/* Main Calendar Content (Scrollable) */}
      <div className="flex-col" style={{ flex: 1, padding: '24px', overflowY: 'auto', paddingBottom: '120px' }}>
        
        {Array.from({ length: 12 }).map((_, i) => renderMonth(i))}

        {/* Legend */}
        <div className="flex-row gap-4" style={{ marginTop: '16px', justifyContent: 'center' }}>
          <div className="flex-row gap-2" style={{ alignItems: 'center' }}>
            <div className="legend-dot completed"></div>
            <span className="text-sm text-muted">Completed</span>
          </div>
          <div className="flex-row gap-2" style={{ alignItems: 'center' }}>
            <div className="legend-dot rest"></div>
            <span className="text-sm text-muted">Rest</span>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
