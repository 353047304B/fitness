import React from 'react';
import { useWorkout } from '../store/WorkoutContext';
import { WORKOUT_SPLIT } from '../store/data';
import { ArrowLeft, Settings2 } from 'lucide-react';

export const RoutineOverviewScreen: React.FC = () => {
  const { navigate, setActiveWorkoutId } = useWorkout();

  const handleDayClick = (id: string) => {
    setActiveWorkoutId(id);
    navigate('active_day');
  };

  return (
    <div className="flex-col h-full">
      <header className="header">
        <div className="flex-row gap-4">
          <button className="icon-btn" onClick={() => navigate('dashboard')}>
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl">Gym Routine</h1>
        </div>
      </header>

      <div className="flex-col gap-4 p-4" style={{ paddingBottom: 100 }}>
        {WORKOUT_SPLIT.map((day) => (
          <div 
            key={day.id} 
            className="card masonry-card" 
            onClick={() => handleDayClick(day.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="flex-row space-between" style={{ marginBottom: 16 }}>
              <h2 className="text-lg">{day.day}</h2>
              <button 
                className="icon-btn" 
                style={{ width: 32, height: 32 }}
                onClick={(e) => { e.stopPropagation(); }}
              >
                <Settings2 size={16} />
              </button>
            </div>
            
            <div className="flex-row" style={{ gap: 8, flexWrap: 'wrap' }}>
              {day.targets.map((target, idx) => (
                <span key={idx} className="tag">{target}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
