export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps?: number;
  time?: string; // e.g. "1:30 min"
  customSets?: { time?: string; reps?: number }[];
};

export type WorkoutDay = {
  id: string;
  day: string; // "Monday"
  title: string; // "Abs"
  targets: string[]; // ["Core", "Stability"]
  volume: { [key: string]: number };
  exercises: Exercise[];
};

export const WORKOUT_SPLIT: WorkoutDay[] = [
  {
    id: 'mon',
    day: 'Monday',
    title: 'Abs',
    targets: ['Core', 'Stability'],
    volume: { 'Core': 16, 'Lower Core': 6, 'Obliques': 6 },
    exercises: [
      { id: 'm1', name: 'Sit-ups', sets: 2, reps: 50 },
      { id: 'm2', name: 'Bicycle crunches', sets: 2, reps: 50 },
      { id: 'm3', name: 'Abdominal crunches', sets: 2, reps: 50 },
      { id: 'm4', name: 'Russian twist', sets: 2, reps: 50 },
      { id: 'm5', name: 'Mountain climber', sets: 2, reps: 50 },
      { id: 'm6', name: 'Heel touch', sets: 2, reps: 50 },
      { 
        id: 'm7', 
        name: 'Plank', 
        sets: 3, 
        customSets: [{ time: '1:30' }, { time: '1:00' }, { time: '0:50' }] 
      },
      { id: 'm8', name: 'Leg crunches', sets: 2, reps: 50 },
    ]
  },
  {
    id: 'tue',
    day: 'Tuesday',
    title: 'Chest x Arm',
    targets: ['Pectorals', 'Triceps', 'Biceps'],
    volume: { 'Chest': 12, 'Triceps': 9, 'Biceps': 6 },
    exercises: [
      { id: 't1', name: 'Push-up', sets: 3, reps: 20 },
      { id: 't2', name: 'Diamond push-up', sets: 3, reps: 15 },
      { id: 't3', name: 'Archer push-up', sets: 3, reps: 10 },
      { id: 't4', name: 'Pike push-up', sets: 3, reps: 15 },
      { id: 't5', name: 'Pseudo push-up', sets: 3, reps: 10 },
      { id: 't6', name: 'Dumbbell curls up', sets: 3, reps: 15 },
      { id: 't7', name: 'Dumbbell curls down', sets: 3, reps: 15 },
    ]
  },
  {
    id: 'wed',
    day: 'Wednesday',
    title: 'Leg x Back',
    targets: ['Quads', 'Hamstrings', 'Posterior Chain', 'Lats'],
    volume: { 'Quads': 15, 'Hamstrings': 6, 'Lats': 9 },
    exercises: [
      { id: 'w1', name: 'Sissy squats', sets: 6, reps: 6 },
      { id: 'w2', name: 'Reverse nordics', sets: 4, reps: 12 },
      { id: 'w3', name: 'Heel elevated squats', sets: 3, reps: 12 },
      { id: 'w4', name: 'Cossack lunge', sets: 3, reps: 12 },
      { id: 'w5', name: 'Split squats', sets: 3, reps: 12 },
      { id: 'w6', name: 'Sumo squats', sets: 2, reps: 20 },
      { id: 'w7', name: 'Wall sit', sets: 2, customSets: [{ time: '1:15' }, { time: '1:15' }] },
      { id: 'w8', name: 'Reverse snow angels', sets: 3, reps: 20 },
      { id: 'w9', name: 'Back extension-towel', sets: 3, reps: 20 },
      { id: 'w10', name: 'Back hyperextension', sets: 3, reps: 20 },
      { id: 'w11', name: 'Pulse rows', sets: 3, reps: 20 },
      { id: 'w12', name: 'Back widow', sets: 3, reps: 20 },
    ]
  }
];
