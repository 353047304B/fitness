import React from 'react';
import { Home, Timer, Calendar } from 'lucide-react';
import { useWorkout, type ScreenState } from '../store/WorkoutContext';

export const BottomNav: React.FC = () => {
  const { currentScreen, navigate } = useWorkout();

  const handleNav = (screen: ScreenState) => {
    if (currentScreen !== screen) {
      navigate(screen);
    }
  };

  return (
    <div className="bottom-nav">
      <button 
        className="icon-btn" 
        style={{ background: 'transparent' }} 
        onClick={() => handleNav('dashboard')}
      >
        <Home size={24} className={currentScreen === 'dashboard' ? 'accent-text' : 'text-muted'} />
      </button>
      <button 
        className="icon-btn" 
        style={{ background: 'transparent' }} 
        onClick={() => handleNav('stopwatch')}
      >
        <Timer size={24} className={currentScreen === 'stopwatch' ? 'accent-text' : 'text-muted'} />
      </button>
      <button 
        className="icon-btn" 
        style={{ background: 'transparent' }} 
        onClick={() => handleNav('calendar')}
      >
        <Calendar size={24} className={currentScreen === 'calendar' ? 'accent-text' : 'text-muted'} />
      </button>
    </div>
  );
};
