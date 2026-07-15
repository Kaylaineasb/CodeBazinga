// Tipos que descrevem a estrutura narrativa do jogo.
// Cada capítulo é um grafo de nós (nodes) conectados por "next".

export type SceneTheme = 'floresta' | 'cidade' | 'torre' | 'caverna';

export interface DialogueNode {
  id: string;
  type: 'dialogue';
  speaker: string; // nome de quem fala ('Você', 'Mestre Byte', etc.)
  avatar: string; // emoji usado como avatar
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
  concept: string; // ex: "Variáveis"
  prompt: string;
  code?: string; // trecho de código exibido em fonte monoespaçada
  options: ChallengeOption[];
  explanation: string; // exibida após a resposta
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
