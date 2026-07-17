# CodeBazinga 🎮 — Aprenda Programação Através da Narrativa

Protótipo de jogo 2D em **React Native (Expo)** que ensina conceitos de programação
(variáveis, condicionais e loops) através de uma história interativa com diálogos,
escolhas e desafios de código no estilo RPG.

## O que já está implementado neste protótipo

- **Motor de narrativa** baseado em nós (`dialogue`, `choice`, `challenge`, `end`),
  totalmente orientado a dados em `src/data/story.ts` — fácil de expandir com novos
  capítulos sem tocar em código de UI.
- **3 capítulos jogáveis completos**, cada um ensinando um conceito:
  1. **O Despertar do Aprendiz** — Variáveis
  2. **A Encruzilhada das Decisões** — Condicionais (`if` / `else` / `else if`)
  3. **A Torre do Loop Infinito** — Laços de repetição (`for` / `while`)
- **Diálogos com personagens** (avatar em emoji + nome + texto), avançados por toque.
- **Escolhas narrativas** que ramificam a conversa.
- **Desafios de código** de múltipla escolha, com feedback imediato (certo/errado),
  explicação didática e recompensa de XP.
- **Cenário 2D** desenhado em SVG (`react-native-svg`), com paleta e silhuetas
  diferentes por capítulo (floresta, cidade, torre) — sem depender de assets de
  imagem externos, então roda "out of the box".
- **Progressão RPG**: XP, nível e barra de progresso visível durante o jogo.
- Telas de **Menu**, **Jogo**, **Conclusão de Capítulo** e **Vitória Final**.

## Estrutura do projeto

```
CodeBazinga/
├── App.tsx                        # Ponto de entrada, roteia as telas
├── src/
│   ├── types/index.ts             # Tipos do motor narrativo
│   ├── data/story.ts              # TODO O CONTEÚDO da história vive aqui
│   ├── engine/GameContext.tsx     # Estado global (progresso, XP, navegação)
│   ├── components/
│   │   ├── SceneBackground.tsx    # Cenário 2D em SVG por tema
│   │   ├── DialogueBox.tsx        # Caixa de diálogo
│   │   ├── ChoiceList.tsx         # Lista de escolhas
│   │   ├── CodeChallenge.tsx      # Desafio de código com feedback
│   │   └── StatusBar.tsx          # XP / nível / capítulo
│   └── screens/
│       ├── MenuScreen.tsx
│       ├── GameScreen.tsx
│       ├── ChapterCompleteScreen.tsx
│       └── VictoryScreen.tsx
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm (vem com o Node) ou yarn
- App **Expo Go** instalado no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779)) — forma mais rápida de testar
  - Alternativamente: Android Studio (emulador Android) ou Xcode (simulador iOS), ambos opcionais

## Como rodar

1. **Instale as dependências** na pasta do projeto:

   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento do Expo:**

   ```bash
   npm start
   ```

   Isso abre o Metro Bundler no terminal e um QR code.

3. **Abra o jogo:**

   - **No celular:** abra o app Expo Go e escaneie o QR code exibido no terminal
     (Android) ou pela câmera nativa (iOS).
   - **No navegador (mais rápido para testar):**
     ```bash
     npm run web
     ```
   - **Emulador Android** (com Android Studio configurado):
     ```bash
     npm run android
     ```
   - **Simulador iOS** (somente macOS, com Xcode configurado):
     ```bash
     npm run ios
     ```

4. Na tela de menu, toque em **"▶ Iniciar Jornada"** e siga a história.
   Toque nas caixas de diálogo para avançar, escolha opções quando aparecerem, e
   responda aos desafios de código (destacados em amarelo) para ganhar XP.

## Como estender o jogo (próximos passos sugeridos)

Como o conteúdo é 100% orientado a dados, adicionar um novo capítulo é só editar
`src/data/story.ts`:

```ts
const chapter4: Chapter = {
  id: 'cap4',
  order: 4,
  title: 'Nome do Capítulo',
  concept: 'Funções',
  theme: 'caverna', // floresta | cidade | torre | caverna
  startNode: 'c4_n1',
  nodes: {
    c4_n1: { id: 'c4_n1', type: 'dialogue', speaker: '...', avatar: '🧙', text: '...', next: 'c4_n2' },
    // ...
  },
};

export const chapters: Chapter[] = [chapter1, chapter2, chapter3, chapter4];
```

Ideias para evoluir este protótipo:

- **Persistência de progresso** com `@react-native-async-storage/async-storage`
  (salvar XP/capítulo entre sessões).
- **Animações de personagem** (entrada/saída, "fala") com `react-native-reanimated`.
- **Editor de código real** dentro dos desafios (ex.: `react-native-code-editor`) em
  vez de múltipla escolha, para desafios mais avançados.
- **Sistema de inventário/badges** por conceito dominado (reaproveitando a mesma
  lógica RPG do seu projeto de reabilitação cognitiva).
- **Áudio** (efeitos sonoros de acerto/erro, música ambiente por cenário) com
  `expo-av`.
- Novos capítulos: Funções, Arrays/Listas, Objetos, Recursão.

## Notas técnicas

- Projeto gerenciado pelo **Expo SDK 51** (React Native 0.74, React 18).
- Gráficos 2D feitos com `react-native-svg` — não há imagens externas, então o app
  roda imediatamente após `npm install`, sem precisar baixar assets.
- TypeScript com `strict: true`; o motor de narrativa é fortemente tipado
  (`src/types/index.ts`) para evitar nós de história malformados.
- Testado com `npx tsc --noEmit` sem erros de tipo.
