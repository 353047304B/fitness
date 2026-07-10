import React, { createContext, useContext, useState } from 'react';
import { WORKOUT_SPLIT, type WorkoutDay } from './data';

export type ScreenState = 'dashboard' | 'overview' | 'active_day' | 'in_progress' | 'complete';

interface WorkoutContextType {
  currentScreen: ScreenState;
  navigate: (screen: ScreenState) => void;
  
  activeWorkoutId: string | null;
  setActiveWorkoutId: (id: string | null) => void;
  
  activeExerciseId: string | null;
  setActiveExerciseId: (id: string | null) => void;
  
  streak: number;
  
  completedSets: Record<string, number[]>; // exerciseId -> array of completed set indices
  toggleSetComplete: (exerciseId: string, setIndex: number) => void;
  
  workoutTimer: number; // in seconds
  setWorkoutTimer: React.Dispatch<React.SetStateAction<number>>;
  
  finishWorkout: () => void;
  resetState: () => void;
  
  getWorkoutDay: (id: string | null) => WorkoutDay | undefined;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('dashboard');
  const [activeWorkoutId, setActiveWorkoutId] = useState<string | null>(null);
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);
  const [completedSets, setCompletedSets] = useState<Record<string, number[]>>({});
  const [workoutTimer, setWorkoutTimer] = useState<number>(0);
  
  const streak = 16;

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

  const finishWorkout = () => {
    navigate('complete');
  };

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
      getWorkoutDay
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
