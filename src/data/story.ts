import { Chapter } from '../types';

// ============================================================
// CAPÍTULO 1 — Variáveis
// ============================================================
const chapter1: Chapter = {
  id: 'cap1',
  order: 1,
  title: 'O Despertar do Aprendiz',
  concept: 'Variáveis',
  theme: 'floresta',
  startNode: 'c1_n1',
  nodes: {
    c1_n1: {
      id: 'c1_n1',
      type: 'dialogue',
      speaker: 'Narrador',
      avatar: '📜',
      text: 'Você acorda em uma clareira do Reino de Compila, onde a magia é escrita em código. Uma figura encapuzada se aproxima, segurando um cajado com um chip reluzente.',
      next: 'c1_n2',
    },
    c1_n2: {
      id: 'c1_n2',
      type: 'dialogue',
      speaker: 'Mestre Byte',
      avatar: '🧙',
      text: 'Ah, você finalmente acordou! Eu sou Mestre Byte, guardião deste reino. As Sombras do Bug estão corrompendo nossa terra, e só um novo Programador pode detê-las.',
      next: 'c1_n3',
    },
    c1_n3: {
      id: 'c1_n3',
      type: 'choice',
      speaker: 'Você',
      avatar: '🧑',
      text: 'Como assim, "Programador"? O que eu preciso fazer?',
      options: [
        { text: 'Estou pronto. Me ensine.', next: 'c1_n4' },
        { text: 'Isso parece perigoso... mas tudo bem, vamos lá.', next: 'c1_n4' },
      ],
    },
    c1_n4: {
      id: 'c1_n4',
      type: 'dialogue',
      speaker: 'Mestre Byte',
      avatar: '🧙',
      text: 'Excelente espírito! Toda magia neste reino começa com uma VARIÁVEL — uma caixa com um nome, onde guardamos um valor para usar depois.',
      next: 'c1_n5',
    },
    c1_n5: {
      id: 'c1_n5',
      type: 'dialogue',
      speaker: 'Mestre Byte',
      avatar: '🧙',
      text: 'Veja: quando escrevemos "let vida = 100", criamos uma caixa chamada "vida" guardando o número 100. Se a caixa mudar de valor depois, dizemos que ela é MUTÁVEL.',
      next: 'c1_n6',
    },
    c1_n6: {
      id: 'c1_n6',
      type: 'challenge',
      concept: 'Variáveis',
      prompt: 'Um golem de pedra bloqueia o caminho. Para dissipá-lo, complete o feitiço: qual código cria corretamente uma variável chamada "energia" guardando o valor 50?',
      code: 'let energia = ____;',
      options: [
        { text: '50' , correct: true },
        { text: '"cinquenta"' },
        { text: 'energia' },
        { text: 'let' },
      ],
      explanation: 'Isso mesmo! "let energia = 50;" cria uma variável numérica chamada energia com o valor 50. Usar aspas transformaria o valor em texto (string), o que não é o que queríamos aqui.',
      xpReward: 20,
      next: 'c1_n7',
    },
    c1_n7: {
      id: 'c1_n7',
      type: 'dialogue',
      speaker: 'Mestre Byte',
      avatar: '🧙',
      text: 'O golem se desfez em poeira de código! Você aprendeu a essência das variáveis. Mas as Sombras do Bug ficam mais espertas à frente — você precisará também tomar DECISÕES.',
      next: 'c1_n8',
    },
    c1_n8: {
      id: 'c1_n8',
      type: 'challenge',
      concept: 'Variáveis',
      prompt: 'Uma segunda fechadura mágica pede: se "pontos" já vale 10 e executamos "pontos = pontos + 5", qual é o novo valor de pontos?',
      code: 'let pontos = 10;\npontos = pontos + 5;',
      options: [
        { text: '10' },
        { text: '5' },
        { text: '15', correct: true },
        { text: 'erro' },
      ],
      explanation: 'Correto! Variáveis podem ser reatribuídas. "pontos" começa com 10, somamos 5, e o novo valor guardado passa a ser 15.',
      xpReward: 20,
      next: 'c1_end',
    },
    c1_end: {
      id: 'c1_end',
      type: 'end',
      text: 'A névoa sombria recua da floresta. Você domina agora o poder das Variáveis — a base de toda magia de código. Mestre Byte acena para a estrada adiante: a Cidade das Escolhas espera.',
    },
  },
};

// ============================================================
// CAPÍTULO 2 — Condicionais (if / else)
// ============================================================
const chapter2: Chapter = {
  id: 'cap2',
  order: 2,
  title: 'A Encruzilhada das Decisões',
  concept: 'Condicionais (if/else)',
  theme: 'cidade',
  startNode: 'c2_n1',
  nodes: {
    c2_n1: {
      id: 'c2_n1',
      type: 'dialogue',
      speaker: 'Narrador',
      avatar: '📜',
      text: 'Vocês chegam à Cidade das Escolhas, onde cada rua muda de forma dependendo de quem passa por ela. Um guardião-robô bloqueia a praça central.',
      next: 'c2_n2',
    },
    c2_n2: {
      id: 'c2_n2',
      type: 'dialogue',
      speaker: 'Guardião ARGO',
      avatar: '🤖',
      text: 'ACESSO NEGADO. Esta cidade só permite passagem a quem compreende CONDICIONAIS: instruções que decidem o que fazer dependendo de uma condição ser verdadeira ou falsa.',
      next: 'c2_n3',
    },
    c2_n3: {
      id: 'c2_n3',
      type: 'dialogue',
      speaker: 'Mestre Byte',
      avatar: '🧙',
      text: 'Ele fala de "if" e "else". Em código: "if (condição) { ...faça algo... } else { ...faça outra coisa... }". Se a condição for verdadeira, o primeiro bloco roda; senão, roda o segundo.',
      next: 'c2_n4',
    },
    c2_n4: {
      id: 'c2_n4',
      type: 'choice',
      speaker: 'Você',
      avatar: '🧑',
      text: 'Entendi... é como escolher um caminho baseado em uma pergunta de sim ou não?',
      options: [
        { text: 'Exatamente isso — vamos testar!', next: 'c2_n5' },
        { text: 'Ainda tenho dúvidas, mas quero tentar.', next: 'c2_n5' },
      ],
    },
    c2_n5: {
      id: 'c2_n5',
      type: 'challenge',
      concept: 'Condicionais',
      prompt: 'ARGO exibe um enigma: se "vida > 0" for verdadeiro, o herói continua vivo; senão, o jogo termina. Qual código representa isso corretamente?',
      code:
        'if (vida > 0) {\n  console.log("Continua vivo");\n} ____ {\n  console.log("Fim de jogo");\n}',
      options: [
        { text: 'else', correct: true },
        { text: 'then' },
        { text: 'or' },
        { text: 'loop' },
      ],
      explanation: 'Isso mesmo! A palavra-chave "else" define o que acontece quando a condição do "if" é falsa.',
      xpReward: 25,
      next: 'c2_n6',
    },
    c2_n6: {
      id: 'c2_n6',
      type: 'dialogue',
      speaker: 'Guardião ARGO',
      avatar: '🤖',
      text: 'CORRETO. Um último teste: nem toda decisão tem apenas dois caminhos.',
      next: 'c2_n7',
    },
    c2_n7: {
      id: 'c2_n7',
      type: 'challenge',
      concept: 'Condicionais',
      prompt: 'Se quisermos checar VÁRIAS condições em sequência (não apenas duas opções), qual palavra-chave usamos entre o "if" e o "else" final?',
      code: 'if (nota >= 9) {\n  ...\n} ____ (nota >= 7) {\n  ...\n} else {\n  ...\n}',
      options: [
        { text: 'elseif' },
        { text: 'else if', correct: true },
        { text: 'when' },
        { text: 'switch' },
      ],
      explanation: '"else if" permite encadear múltiplas condições, testadas em ordem até uma ser verdadeira.',
      xpReward: 25,
      next: 'c2_end',
    },
    c2_end: {
      id: 'c2_end',
      type: 'end',
      text: 'ARGO se abre e permite a passagem. "Bem-vindos, Programadores." Vocês seguem para a Torre dos Loops, onde tarefas repetitivas aguardam quem souber automatizá-las.',
    },
  },
};

// ============================================================
// CAPÍTULO 3 — Loops (for / while)
// ============================================================
const chapter3: Chapter = {
  id: 'cap3',
  order: 3,
  title: 'A Torre do Loop Infinito',
  concept: 'Laços de repetição (for/while)',
  theme: 'torre',
  startNode: 'c3_n1',
  nodes: {
    c3_n1: {
      id: 'c3_n1',
      type: 'dialogue',
      speaker: 'Narrador',
      avatar: '📜',
      text: 'A Torre gira sem parar, seus degraus se repetindo infinitamente. No topo, uma sombra sussurra em voz de eco.',
      next: 'c3_n2',
    },
    c3_n2: {
      id: 'c3_n2',
      type: 'dialogue',
      speaker: 'Sombra do Bug',
      avatar: '👾',
      text: 'Subam... subam... subam para sempre... Só quem controla a REPETIÇÃO escapa desta torre!',
      next: 'c3_n3',
    },
    c3_n3: {
      id: 'c3_n3',
      type: 'dialogue',
      speaker: 'Mestre Byte',
      avatar: '🧙',
      text: 'Um LOOP repete um bloco de código várias vezes. O "for" é ideal quando sabemos quantas vezes repetir: "for (let i = 0; i < 5; i++) { ... }" roda 5 vezes.',
      next: 'c3_n4',
    },
    c3_n4: {
      id: 'c3_n4',
      type: 'dialogue',
      speaker: 'Mestre Byte',
      avatar: '🧙',
      text: 'Já o "while" repete enquanto uma condição continuar verdadeira — útil quando não sabemos de antemão quantas repetições serão necessárias.',
      next: 'c3_n5',
    },
    c3_n5: {
      id: 'c3_n5',
      type: 'challenge',
      concept: 'Loops',
      prompt: 'Para subir os 5 degraus da torre exatamente 5 vezes, qual estrutura é mais apropriada?',
      code: 'for (let degrau = 0; degrau < 5; degrau++) {\n  subir();\n}',
      options: [
        { text: 'if/else' },
        { text: 'for', correct: true },
        { text: 'variável simples' },
        { text: 'função sem laço' },
      ],
      explanation: 'O "for" é perfeito quando já sabemos o número exato de repetições — neste caso, 5 degraus.',
      xpReward: 30,
      next: 'c3_n6',
    },
    c3_n6: {
      id: 'c3_n6',
      type: 'dialogue',
      speaker: 'Sombra do Bug',
      avatar: '👾',
      text: 'Impossível... mas o loop ainda não tem fim! Vocês precisam de uma condição de PARADA, ou ficarão presos para sempre!',
      next: 'c3_n7',
    },
    c3_n7: {
      id: 'c3_n7',
      type: 'challenge',
      concept: 'Loops',
      prompt: 'No código abaixo, o loop "while" nunca para. O que está faltando dentro do bloco para evitar um loop infinito?',
      code: 'let energia = 3;\nwhile (energia > 0) {\n  atacar();\n  // falta algo aqui\n}',
      options: [
        { text: 'atacar();' },
        { text: 'energia = energia - 1;', correct: true },
        { text: 'let energia = 3;' },
        { text: 'nada, está correto' },
      ],
      explanation: 'Sem diminuir "energia" a cada volta, a condição "energia > 0" nunca se torna falsa, e o loop roda para sempre. É preciso atualizar a variável usada na condição.',
      xpReward: 30,
      next: 'c3_end',
    },
    c3_end: {
      id: 'c3_end',
      type: 'end',
      text: 'A Sombra do Bug se dissolve em bytes de luz. A Torre para de girar. Você agora domina Variáveis, Condicionais e Loops — os três pilares da lógica de programação. Mestre Byte sorri: "Sua jornada como Programador apenas começou."',
    },
  },
};

export const chapters: Chapter[] = [chapter1, chapter2, chapter3];

export function getChapterById(id: string): Chapter | undefined {
  return chapters.find((c) => c.id === id);
}

export function getNextChapter(currentId: string): Chapter | undefined {
  const current = getChapterById(currentId);
  if (!current) return undefined;
  return chapters.find((c) => c.order === current.order + 1);
}
