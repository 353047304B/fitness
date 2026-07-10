import React, { useState, useEffect } from 'react';
import { useWorkout } from '../store/WorkoutContext';
import { ArrowLeft, Check, Minus, Plus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const InProgressScreen: React.FC = () => {
  const { 
    navigate, 
    activeWorkoutId, 
    activeExerciseId, 
    getWorkoutDay, 
    completedSets, 
    toggleSetComplete,
    setActiveExerciseId,
    finishWorkout
  } = useWorkout();

  const [weight, setWeight] = useState(0); // 0 means bodyweight
  const [repMod, setRepMod] = useState(0);
  const [clock, setClock] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(c => c + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dayData = getWorkoutDay(activeWorkoutId);
  if (!dayData || !activeExerciseId) return null;

  const exerciseIndex = dayData.exercises.findIndex(e => e.id === activeExerciseId);
  const exercise = dayData.exercises[exerciseIndex];
  
  const exerciseCompletedSets = completedSets[activeExerciseId] || [];

  const handleNext = () => {
    if (exerciseIndex < dayData.exercises.length - 1) {
      setActiveExerciseId(dayData.exercises[exerciseIndex + 1].id);
      setWeight(0);
      setRepMod(0);
      setClock(0);
    } else {
      finishWorkout();
    }
  };

  const formatClock = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex-col h-full" style={{ position: 'relative' }}>
      <header className="header" style={{ paddingBottom: 16 }}>
        <div className="flex-row gap-4">
          <button className="icon-btn" onClick={() => navigate('active_day')}>
            <ArrowLeft size={20} />
          </button>
          <div className="flex-col">
            <h1 className="text-xl">{exercise.name}</h1>
            <span className="text-sm text-muted">{exerciseCompletedSets.length} of {exercise.sets} sets complete</span>
          </div>
        </div>
      </header>

      {/* Tracker Card */}
      <div className="card" style={{ margin: '0 24px 24px', paddingBottom: 300 }}>
        <div className="flex-col gap-4">
          {Array.from({ length: exercise.sets }).map((_, i) => {
            const isCompleted = exerciseCompletedSets.includes(i);
            const reps = exercise.customSets ? exercise.customSets[i].time || exercise.customSets[i].reps : exercise.reps;
            
            return (
              <motion.div 
                key={i} 
                className="set-row"
                animate={{ opacity: isCompleted ? 0.5 : 1 }}
              >
                <div style={{ width: 24, textAlign: 'center', fontWeight: 'bold', color: 'var(--text-muted)' }}>{i + 1}</div>
                <div className="pill">{weight === 0 ? 'Bodyweight' : `${weight} KG`}</div>
                <div className="pill">{reps}{typeof reps === 'number' ? ' REPS' : ''}</div>
                <button 
                  className={`check-btn ${isCompleted ? 'completed' : ''}`}
                  onClick={() => toggleSetComplete(exercise.id, i)}
                >
                  <Check size={20} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Modifiers and Footer */}
      <div className="bottom-sheet">
        <div className="flex-row gap-6 space-between">
          <div className="flex-col gap-2" style={{ flex: 1, alignItems: 'center' }}>
            <span className="text-sm text-muted font-semibold">WEIGHT</span>
            <div className="flex-row space-between" style={{ width: '100%', background: 'var(--bg-tertiary)', borderRadius: 24, padding: 8 }}>
              <button className="icon-btn" style={{ background: 'transparent' }} onClick={() => setWeight(Math.max(0, weight - 2.5))}>
                <Minus size={20} />
              </button>
              <span className="text-lg">{weight === 0 ? 'BW' : weight}</span>
              <button className="icon-btn" style={{ background: 'transparent' }} onClick={() => setWeight(weight + 2.5)}>
                <Plus size={20} />
              </button>
            </div>
          </div>
          <div className="flex-col gap-2" style={{ flex: 1, alignItems: 'center' }}>
            <span className="text-sm text-muted font-semibold">REPS</span>
            <div className="flex-row space-between" style={{ width: '100%', background: 'var(--bg-tertiary)', borderRadius: 24, padding: 8 }}>
              <button className="icon-btn" style={{ background: 'transparent' }} onClick={() => setRepMod(repMod - 1)}>
                <Minus size={20} />
              </button>
              <span className="text-lg">{exercise.reps ? exercise.reps + repMod : '-'}</span>
              <button className="icon-btn" style={{ background: 'transparent' }} onClick={() => setRepMod(repMod + 1)}>
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Panel */}
        <div className="flex-row space-between" style={{ marginTop: 8 }}>
          <div className="flex-col">
            <span className="text-xs text-muted font-semibold">REST TIMER</span>
            <span className="text-2xl" style={{ fontFamily: 'monospace' }}>{formatClock(clock)}</span>
          </div>
          <button 
            className="capsule-btn" 
            style={{ 
              background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))',
              color: '#fff',
              padding: '16px 32px',
              fontSize: '18px',
              fontWeight: 700,
              gap: 8,
              boxShadow: 'var(--glow-accent)'
            }}
            onClick={handleNext}
          >
            {exerciseIndex < dayData.exercises.length - 1 ? 'Next' : 'Finish'} 
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
