import React, { useEffect } from 'react';
import { StatusBar as RNStatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import { GameProvider, useGame } from './src/engine/GameContext';
import MenuScreen from './src/screens/MenuScreen';
import GameScreen from './src/screens/GameScreen';
import ChapterCompleteScreen from './src/screens/ChapterCompleteScreen';

function Router() {
  const { currentNode, loading } = useGame();
  if (loading) return null; 

  if (currentNode?.type === 'end') {
    return <ChapterCompleteScreen />;
  }

  if (currentNode) {
    return <GameScreen />;
  }

  return <MenuScreen />;
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
