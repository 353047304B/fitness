import React from 'react';
import { useWorkout } from '../store/WorkoutContext';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ActiveDayScreen: React.FC = () => {
  const { navigate, activeWorkoutId, getWorkoutDay, setActiveExerciseId } = useWorkout();

  const dayData = getWorkoutDay(activeWorkoutId);

  if (!dayData) {
    return null;
  }

  const handleStartWorkout = () => {
    if (dayData.exercises.length > 0) {
      setActiveExerciseId(dayData.exercises[0].id);
      navigate('in_progress');
    }
  };

  const handleExerciseClick = (id: string) => {
    setActiveExerciseId(id);
    navigate('in_progress');
  };

  const totalExercises = dayData.exercises.length;
  // Approximation for time based on sets and reps
  const estimatedTime = totalExercises * 5; 

  return (
    <div className="flex-col h-full" style={{ position: 'relative' }}>
      <header className="header" style={{ paddingBottom: 16 }}>
        <div className="flex-row gap-4">
          <button className="icon-btn" onClick={() => navigate('overview')}>
            <ArrowLeft size={20} />
          </button>
          <div className="flex-col">
            <h1 className="text-xl">{dayData.day}</h1>
            <span className="text-sm text-muted">{totalExercises} exercises · ~{estimatedTime} min</span>
          </div>
        </div>
      </header>

      {/* Volume Visualizer */}
      <div className="volume-viz-container">
        {Object.entries(dayData.volume).map(([target, vol], idx) => (
          <div key={idx} className="volume-bar">
            <span className="text-sm" style={{ fontWeight: 600 }}>{target}</span>
            <span className="text-xs text-muted">+{vol} Vol</span>
            <div className="volume-fill" style={{ width: `${Math.min(100, vol * 5)}%` }}></div>
          </div>
        ))}
      </div>

      {/* Exercise List */}
      <div className="exercise-list">
        {dayData.exercises.map((ex, idx) => (
          <motion.div 
            key={ex.id} 
            className="exercise-row"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => handleExerciseClick(ex.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="exercise-thumb">
              {idx + 1}
            </div>
            <div className="flex-col" style={{ flex: 1 }}>
              <span className="text-md" style={{ fontWeight: 600 }}>{ex.name}</span>
              <span className="text-sm text-muted">
                {ex.customSets 
                  ? `${ex.sets} sets (custom times)` 
                  : `${ex.sets} x ${ex.reps} reps`}
              </span>
            </div>
            <div className="icon-btn" style={{ width: 36, height: 36 }}>
              <ChevronRight size={16} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="cta-bottom">
        <button className="btn-primary" onClick={handleStartWorkout}>
          Start Workout
        </button>
      </div>
    </div>
  );
};
