import React from 'react';
import { WorkoutProvider, useWorkout } from './store/WorkoutContext';
import { ScreenTransition } from './components/ScreenTransition';
import { DashboardScreen } from './screens/DashboardScreen';
import { RoutineOverviewScreen } from './screens/RoutineOverviewScreen';
import { ActiveDayScreen } from './screens/ActiveDayScreen';
import { InProgressScreen } from './screens/InProgressScreen';
import { WorkoutCompleteScreen } from './screens/WorkoutCompleteScreen';
import { CalendarScreen } from './screens/CalendarScreen';
import { StopwatchScreen } from './screens/StopwatchScreen';

const MainApp: React.FC = () => {
  const { currentScreen } = useWorkout();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'overview':
        return <RoutineOverviewScreen />;
      case 'active_day':
        return <ActiveDayScreen />;
      case 'in_progress':
        return <InProgressScreen />;
      case 'complete':
        return <WorkoutCompleteScreen />;
      case 'calendar':
        return <CalendarScreen />;
      case 'stopwatch':
        return <StopwatchScreen />;
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      <ScreenTransition screenKey={currentScreen}>
        {renderScreen()}
      </ScreenTransition>
    </div>
  );
};

function App() {
  return (
    <WorkoutProvider>
      <MainApp />
    </WorkoutProvider>
  );
}

export default App;
