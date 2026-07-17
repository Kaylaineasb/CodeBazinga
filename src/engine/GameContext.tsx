import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlayerProgress, GameContextType } from '../types';
import { chapters } from '../data/story';

const STORAGE_KEY = '@codequest:progress';

const GameContext = createContext<GameContextType | undefined>(undefined);

const INITIAL_PROGRESS: PlayerProgress = {
  xp: 0,
  level: 1,
  completedChapters: [],
  currentChapterId: 'cap1',
  currentNodeId: 'c1_n1',
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<PlayerProgress>(INITIAL_PROGRESS);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadSavedProgress() {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedData) {
          setProgress(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Erro ao carregar o progresso do CodeBazinga:', error);
      } finally {
        setLoading(false);
      }
    }
    loadSavedProgress();
  }, []);

  async function saveProgress(newProgress: PlayerProgress) {
    try {
      setProgress(newProgress);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    } catch (error) {
      console.error('Erro ao salvar o progresso do CodeBazinga:', error);
    }
  }

  const startNewGame = () => {
    saveProgress(INITIAL_PROGRESS);
  };

  const advanceTo = (nextNodeId: string) => {
    const updated: PlayerProgress = {
      ...progress,
      currentNodeId: nextNodeId,
    };
    saveProgress(updated);
  };

  const answerChallenge = (correct: boolean, xpReward: number, nextNodeId: string) => {
    if (!correct) {
      advanceTo(nextNodeId);
      return;
    }

    let newXp = progress.xp + xpReward;
    let newLevel = progress.level;

    if (newXp >= 100) {
      newLevel += 1;
      newXp = newXp - 100;
    }

    const updated: PlayerProgress = {
      ...progress,
      xp: newXp,
      level: newLevel,
      currentNodeId: nextNodeId,
    };

    saveProgress(updated);
  };

  const resetGame = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setProgress(INITIAL_PROGRESS);
    } catch (error) {
      console.error('Erro ao resetar o progresso:', error);
    }
  };

  const currentChapter = chapters.find(c => c.id === progress.currentChapterId) || null;
  const currentNode = currentChapter ? currentChapter.nodes[progress.currentNodeId] : null;

  return (
    <GameContext.Provider
      value={{
        currentChapter,
        currentNode,
        progress,
        loading,
        startNewGame,
        advanceTo,
        answerChallenge,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame deve ser usado dentro de um GameProvider');
  return context;
};