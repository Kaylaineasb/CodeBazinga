export type SceneTheme = 'floresta' | 'cidade' | 'torre' | 'caverna';

export interface DialogueNode {
  id: string;
  type: 'dialogue';
  speaker: string;
  avatar: string;
  text: string;
  next: string;
}

export interface ChoiceOption {
  text: string;
  next: string;
}

export interface ChoiceNode {
  id: string;
  type: 'choice';
  speaker: string;
  avatar: string;
  text: string;
  options: ChoiceOption[];
}

export interface ChallengeOption {
  text: string;
  correct?: boolean;
}

export interface ChallengeNode {
  id: string;
  type: 'challenge';
  concept: string;
  prompt: string;
  code?: string;
  options: ChallengeOption[];
  explanation: string;
  xpReward: number;
  next: string;
}

export interface EndNode {
  id: string;
  type: 'end';
  text: string;
}

export type StoryNode = DialogueNode | ChoiceNode | ChallengeNode | EndNode;

export interface Chapter {
  id: string;
  order: number;
  title: string;
  concept: string;
  theme: SceneTheme;
  startNode: string;
  nodes: Record<string, StoryNode>;
}

export interface PlayerProgress {
  xp: number;
  level: number;
  completedChapters: string[];
  currentChapterId: string;
  currentNodeId: string;
}

export interface GameContextType {
  currentChapter: Chapter | null;
  currentNode: StoryNode | null;
  progress: PlayerProgress;
  loading: boolean;
  startNewGame: () => void;
  advanceTo: (nextNodeId: string) => void;
  answerChallenge: (correct: boolean, xpReward: number, nextNodeId: string) => void;
  resetGame: () => Promise<void>;
}