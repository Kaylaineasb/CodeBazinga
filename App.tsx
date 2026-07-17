import React, { useEffect } from 'react';
import { StatusBar as RNStatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { GameProvider, useGame } from './src/engine/GameContext';
import MenuScreen from './src/screens/MenuScreen';
import GameScreen from './src/screens/GameScreen';
import ChapterCompleteScreen from './src/screens/ChapterCompleteScreen';
import VictoryScreen from './src/screens/VictoryScreen';

function Router() {
  const { screen } = useGame();

  switch (screen) {
    case 'menu':
      return <MenuScreen />;
    case 'game':
      return <GameScreen />;
    case 'chapterComplete':
      return <ChapterCompleteScreen />;
    case 'victory':
      return <VictoryScreen />;
    default:
      return <MenuScreen />;
  }
}

export default function App() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  return (
    <GameProvider>
      <RNStatusBar style="light" />
      <Router />
    </GameProvider>
  );
}
