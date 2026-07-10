import React from 'react';
import { useWorkout } from '../store/WorkoutContext';
import { BottomNav } from '../components/BottomNav';
import { Play, Square, RotateCcw } from 'lucide-react';

export const StopwatchScreen: React.FC = () => {
  const { stopwatchTime, isStopwatchRunning, startStopwatch, stopStopwatch, resetStopwatch } = useWorkout();

  // Convert milliseconds to mm:ss.ms
  const formatTime = (timeInMs: number) => {
    const minutes = Math.floor(timeInMs / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const ms = Math.floor((timeInMs % 1000) / 10);
    return {
      min: String(minutes).padStart(2, '0'),
      sec: String(seconds).padStart(2, '0'),
      ms: String(ms).padStart(2, '0')
    };
  };

  const { min, sec, ms } = formatTime(stopwatchTime);

  return (
    <div className="flex-col h-full" style={{ justifyContent: 'space-between' }}>
      <header className="header" style={{ flexShrink: 0 }}>
        <h1 className="text-xl">Stopwatch</h1>
      </header>

      <div className="flex-col" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <div 
          className="stopwatch-display flex-row"
          style={{ 
            fontSize: '4rem', 
            fontWeight: 800, 
            letterSpacing: '2px',
            textShadow: isStopwatchRunning ? '0 0 24px rgba(255, 81, 0, 0.4)' : 'none',
            color: isStopwatchRunning ? 'var(--accent-primary)' : 'var(--text-primary)',
            transition: 'all 0.3s ease'
          }}
        >
          <span>{min}</span>
          <span style={{ opacity: 0.5, margin: '0 4px' }}>:</span>
          <span>{sec}</span>
          <span style={{ opacity: 0.5, margin: '0 4px' }}>.</span>
          <span style={{ fontSize: '2.5rem', opacity: 0.8 }}>{ms}</span>
        </div>

        <div className="flex-row gap-6 mt-8">
          <button 
            className="icon-btn" 
            style={{ 
              width: '64px', 
              height: '64px', 
              borderRadius: '32px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)'
            }}
            onClick={resetStopwatch}
          >
            <RotateCcw size={28} />
          </button>
          
          {isStopwatchRunning ? (
            <button 
              className="icon-btn" 
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '40px',
                background: 'var(--bg-tertiary)',
                color: 'var(--accent-primary)',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)'
              }}
              onClick={stopStopwatch}
            >
              <Square size={32} />
            </button>
          ) : (
            <button 
              className="icon-btn" 
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '40px',
                background: 'var(--accent-primary)',
                color: '#fff',
                boxShadow: '0 0 20px rgba(255, 81, 0, 0.4)'
              }}
              onClick={startStopwatch}
            >
              <Play size={32} style={{ marginLeft: '4px' }} />
            </button>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
