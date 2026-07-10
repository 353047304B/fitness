import React, { createContext, useContext, useState, useEffect } from 'react';
import { WORKOUT_SPLIT, type WorkoutDay } from './data';

export type ScreenState = 'dashboard' | 'overview' | 'active_day' | 'in_progress' | 'complete' | 'calendar' | 'stopwatch';

interface WorkoutContextType {
  currentScreen: ScreenState;
  navigate: (screen: ScreenState) => void;
  
  activeWorkoutId: string | null;
  setActiveWorkoutId: (id: string | null) => void;
  
  activeExerciseId: string | null;
  setActiveExerciseId: (id: string | null) => void;
  
  streak: number;
  
  completedSets: Record<string, number[]>;
  toggleSetComplete: (exerciseId: string, setIndex: number) => void;
  
  workoutTimer: number;
  setWorkoutTimer: React.Dispatch<React.SetStateAction<number>>;
  
  finishWorkout: () => void;
  resetState: () => void;
  
  getWorkoutDay: (id: string | null) => WorkoutDay | undefined;

  completedDates: string[]; // YYYY-MM-DD
  restDates: string[];
  toggleCalendarDay: (dateStr: string) => void;
  
  stopwatchTime: number;
  isStopwatchRunning: boolean;
  startStopwatch: () => void;
  stopStopwatch: () => void;
  resetStopwatch: () => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('dashboard');
  const [activeWorkoutId, setActiveWorkoutId] = useState<string | null>(null);
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);
  const [completedSets, setCompletedSets] = useState<Record<string, number[]>>({});
  const [workoutTimer, setWorkoutTimer] = useState<number>(0);
  
  const [completedDates, setCompletedDates] = useState<string[]>([]);
  const [restDates, setRestDates] = useState<string[]>([]);
  
  const [stopwatchTime, setStopwatchTime] = useState<number>(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: number;
    if (isStopwatchRunning) {
      interval = window.setInterval(() => {
        setStopwatchTime(prev => prev + 10);
      }, 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStopwatchRunning]);

  const startStopwatch = () => setIsStopwatchRunning(true);
  const stopStopwatch = () => setIsStopwatchRunning(false);
  const resetStopwatch = () => {
    setIsStopwatchRunning(false);
    setStopwatchTime(0);
  };

  // Initialize from localStorage
  useEffect(() => {
    const storedCompleted = localStorage.getItem('completedDates');
    if (storedCompleted) {
      try {
        setCompletedDates(JSON.parse(storedCompleted));
      } catch (e) {
        console.error(e);
      }
    }
    
    const storedRest = localStorage.getItem('restDates');
    if (storedRest) {
      try {
        setRestDates(JSON.parse(storedRest));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const streak = completedDates.length > 0 ? completedDates.length : 16; // Use actual length or default mock if empty

  const navigate = (screen: ScreenState) => {
    setCurrentScreen(screen);
    window.scrollTo(0,0);
  };

  const toggleSetComplete = (exerciseId: string, setIndex: number) => {
    setCompletedSets(prev => {
      const exerciseSets = prev[exerciseId] || [];
      const newSets = exerciseSets.includes(setIndex)
        ? exerciseSets.filter(i => i !== setIndex)
        : [...exerciseSets, setIndex];
      return { ...prev, [exerciseId]: newSets };
    });
  };

  const toggleCalendarDay = (dateStr: string) => {
    if (completedDates.includes(dateStr)) {
      // Completed -> Rest
      const newCompleted = completedDates.filter(d => d !== dateStr);
      const newRest = [...restDates, dateStr];
      setCompletedDates(newCompleted);
      setRestDates(newRest);
      localStorage.setItem('completedDates', JSON.stringify(newCompleted));
      localStorage.setItem('restDates', JSON.stringify(newRest));
    } else if (restDates.includes(dateStr)) {
      // Rest -> Empty
      const newRest = restDates.filter(d => d !== dateStr);
      setRestDates(newRest);
      localStorage.setItem('restDates', JSON.stringify(newRest));
    } else {
      // Empty -> Completed
      const newCompleted = [...completedDates, dateStr];
      setCompletedDates(newCompleted);
      localStorage.setItem('completedDates', JSON.stringify(newCompleted));
    }
  };

  const finishWorkout = () => {
    // Record today as completed
    const todayStr = new Date().toISOString().split('T')[0];
    setCompletedDates(prev => {
      const updated = prev.includes(todayStr) ? prev : [...prev, todayStr];
      localStorage.setItem('completedDates', JSON.stringify(updated));
      return updated;
    });

    // Remove today from rest dates if it was accidentally marked
    setRestDates(prev => prev.filter(d => d !== todayStr));

    navigate('complete');
  };

  // Auto-finish workout when 100% of sets are completed
  useEffect(() => {
    if (!activeWorkoutId || currentScreen !== 'in_progress') return;
    
    const day = WORKOUT_SPLIT.find(d => d.id === activeWorkoutId);
    if (!day || day.exercises.length === 0) return;
    
    const allCompleted = day.exercises.every(ex => {
      const setsForEx = completedSets[ex.id] || [];
      return setsForEx.length === ex.sets;
    });

    if (allCompleted) {
      finishWorkout();
    }
  }, [completedSets, activeWorkoutId, currentScreen]);

  const resetState = () => {
    setCompletedSets({});
    setWorkoutTimer(0);
    setActiveWorkoutId(null);
    setActiveExerciseId(null);
    navigate('dashboard');
  };

  const getWorkoutDay = (id: string | null) => {
    if (!id) return undefined;
    return WORKOUT_SPLIT.find(d => d.id === id);
  };

  return (
    <WorkoutContext.Provider value={{
      currentScreen,
      navigate,
      activeWorkoutId,
      setActiveWorkoutId,
      activeExerciseId,
      setActiveExerciseId,
      streak,
      completedSets,
      toggleSetComplete,
      workoutTimer,
      setWorkoutTimer,
      finishWorkout,
      resetState,
      getWorkoutDay,
      completedDates,
      restDates,
      toggleCalendarDay,
      stopwatchTime,
      isStopwatchRunning,
      startStopwatch,
      stopStopwatch,
      resetStopwatch
    }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};
