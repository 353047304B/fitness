import React from 'react';
import { useWorkout } from '../store/WorkoutContext';
import { motion } from 'framer-motion';

export const WorkoutCompleteScreen: React.FC = () => {
  const { streak, resetState } = useWorkout();

  return (
    <div className="flex-col h-full" style={{ padding: 24, justifyContent: 'center' }}>
      
      <motion.div 
        className="streak-capsule"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
      >
        <span className="streak-text">{streak}</span>
        <span className="text-md text-main font-semibold" style={{ marginTop: 8 }}>days</span>
        <span className="text-sm text-muted" style={{ marginTop: 16 }}>Consistency Streak</span>
      </motion.div>

      <div className="flex-row gap-4" style={{ marginTop: 40, marginBottom: 60 }}>
        <div className="card flex-col" style={{ flex: 1, alignItems: 'center', padding: '32px 16px' }}>
          <span className="text-sm text-muted font-semibold">Total Weight</span>
          <span className="text-xl" style={{ marginTop: 8 }}>Bodyweight</span>
        </div>
        <div className="card flex-col" style={{ flex: 1, alignItems: 'center', padding: '32px 16px' }}>
          <span className="text-sm text-muted font-semibold">Total Time</span>
          <span className="text-xl" style={{ marginTop: 8 }}>52:23</span>
        </div>
      </div>

      <button 
        className="capsule-btn" 
        style={{ 
          background: 'var(--text-main)', 
          color: 'var(--bg-primary)',
          height: 64,
          fontSize: 20,
          fontWeight: 700
        }}
        onClick={resetState}
      >
        Done
      </button>
    </div>
  );
};
