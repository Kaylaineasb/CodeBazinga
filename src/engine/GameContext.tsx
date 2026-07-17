import React, { createContext, useContext, useMemo, useState } from 'react';
import { chapters, getChapterById, getNextChapter } from '../data/story';
import { Chapter, PlayerProgress, StoryNode } from '../types';

type Screen = 'menu' | 'game' | 'chapterComplete' | 'victory';

interface GameContextValue {
  screen: Screen;
  progress: PlayerProgress;
  currentChapter: Chapter | undefined;
  currentNode: StoryNode | undefined;
  startNewGame: () => void;
  goToMenu: () => void;
  advanceTo: (nodeId: string) => void;
  answerChallenge: (correct: boolean, xpReward: number, next: string) => void;
  continueAfterChapter: () => void;
  allChapters: Chapter[];
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

const initialProgress: PlayerProgress = {
  xp: 0,
  level: 1,
  completedChapters: [],
  currentChapterId: chapters[0].id,
  currentNodeId: chapters[0].startNode,
};

function levelForXp(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<Screen>('menu');
  const [progress, setProgress] = useState<PlayerProgress>(initialProgress);

  const currentChapter = useMemo(
    () => getChapterById(progress.currentChapterId),
    [progress.currentChapterId]
  );

  const currentNode = useMemo(
    () => currentChapter?.nodes[progress.currentNodeId],
    [currentChapter, progress.currentNodeId]
  );

  function startNewGame() {
    setProgress(initialProgress);
    setScreen('game');
  }

  function goToMenu() {
    setScreen('menu');
  }

  function advanceTo(nodeId: string) {
    if (!currentChapter) return;
    const node = currentChapter.nodes[nodeId];
    if (node?.type === 'end') {
      setProgress((prev) => ({
        ...prev,
        currentNodeId: nodeId,
        completedChapters: prev.completedChapters.includes(currentChapter.id)
          ? prev.completedChapters
          : [...prev.completedChapters, currentChapter.id],
      }));
      setScreen('chapterComplete');
      return;
    }
    setProgress((prev) => ({ ...prev, currentNodeId: nodeId }));
  }

  function answerChallenge(correct: boolean, xpReward: number, next: string) {
    if (correct) {
      setProgress((prev) => {
        const newXp = prev.xp + xpReward;
        return { ...prev, xp: newXp, level: levelForXp(newXp) };
      });
    }
    advanceTo(next);
  }

  function continueAfterChapter() {
    if (!currentChapter) return;
    const next = getNextChapter(currentChapter.id);
    if (next) {
      setProgress((prev) => ({
        ...prev,
        currentChapterId: next.id,
        currentNodeId: next.startNode,
      }));
      setScreen('game');
    } else {
      setScreen('victory');
    }
  }

  const value: GameContextValue = {
    screen,
    progress,
    currentChapter,
    currentNode,
    startNewGame,
    goToMenu,
    advanceTo,
    answerChallenge,
    continueAfterChapter,
    allChapters: chapters,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame precisa ser usado dentro de um <GameProvider>');
  return ctx;
}
