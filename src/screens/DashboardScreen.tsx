import React from 'react';
import { useWorkout } from '../store/WorkoutContext';
import { Settings, Plus, Home, Timer, Calendar } from 'lucide-react';

export const DashboardScreen: React.FC = () => {
  const { navigate, setActiveWorkoutId } = useWorkout();

  const handleRoutineClick = () => {
    setActiveWorkoutId(null);
    navigate('overview');
  };

  return (
    <div className="flex-col h-full">
      {/* Header */}
      <header className="header">
        <div className="flex-row gap-4">
          <div className="avatar">
            <span className="text-muted">U</span>
          </div>
          <h1 className="text-xl">Workouts</h1>
        </div>
        <div className="flex-row gap-4">
          <button className="icon-btn"><Settings size={20} /></button>
          <button className="icon-btn"><Plus size={20} /></button>
        </div>
      </header>

      {/* Hero Card */}
      <div 
        className="card card-gradient hero-card flex-row space-between" 
        onClick={handleRoutineClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="flex-col gap-2">
          <h2 className="text-lg">Gym Routine</h2>
          <span style={{ opacity: 0.8 }} className="text-sm">Mon, Tue, Wed</span>
        </div>
        <div className="flex-col gap-2" style={{ alignItems: 'flex-end' }}>
          <div className="sound-wave">
            <div className="bar active" style={{ height: '20px' }}></div>
            <div className="bar active" style={{ height: '32px' }}></div>
            <div className="bar active" style={{ height: '16px' }}></div>
            <div className="bar" style={{ height: '24px' }}></div>
            <div className="bar" style={{ height: '12px' }}></div>
          </div>
          <span className="text-sm font-semibold">42% Completed</span>
        </div>
      </div>

      {/* Sub-cards */}
      <div className="sub-cards-grid">
        <div className="card flex-col gap-2" onClick={handleRoutineClick} style={{ cursor: 'pointer' }}>
          <h3 className="text-md">Gym Routine</h3>
          <span className="text-sm text-muted">Mon, Tue, Wed</span>
          <div style={{ position: 'absolute', top: 16, right: 16 }}>
            ↗
          </div>
        </div>
        <div className="card flex-col gap-2" style={{ opacity: 0.5 }}>
          <h3 className="text-md">Home Routine</h3>
          <span className="text-sm text-muted">No days set</span>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="bottom-nav">
        <Home size={24} className="accent-text" />
        <Timer size={24} className="text-muted" />
        <Calendar size={24} className="text-muted" />
      </div>
    </div>
  );
};
