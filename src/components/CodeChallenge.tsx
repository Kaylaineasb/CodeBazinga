import React, { useState } from 'react';
import { StyleSheet, Text, Pressable, View, ScrollView } from 'react-native';
import { ChallengeNode } from '../types';

interface Props {
  node: ChallengeNode;
  onComplete: (correct: boolean, xpReward: number, next: string) => void;
}

export default function CodeChallenge({ node, onComplete }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const isCorrectSelection = selected !== null && !!node.options[selected].correct;

  function handleSelect(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
  }

  function handleContinue() {
    onComplete(isCorrectSelection, node.xpReward, node.next);
  }

  return (
    <View style={styles.container}>
      {/* Coluna da Esquerda: Enunciado e Código */}
      <View style={styles.leftColumn}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>⚔ DESAFIO · {node.concept}</Text>
        </View>

        <Text style={styles.prompt} numberOfLines={2} adjustsFontSizeToFit>
          {node.prompt}
        </Text>

        {node.code && (
          <View style={styles.codeBox}>
            {/* Scroll Vertical Principal com barra persistente */}
            <ScrollView 
              showsVerticalScrollIndicator={true}
              persistentScrollbar={true} // Força a barra a ficar visível no Android
              nestedScrollEnabled={true}
              contentContainerStyle={styles.verticalScrollContent}
            >
              {/* Scroll Horizontal */}
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={true}
                persistentScrollbar={true} // Força a barra horizontal no Android
                contentContainerStyle={styles.horizontalScrollContent}
              >
                <Text style={styles.codeText}>{node.code}</Text>
              </ScrollView>
            </ScrollView>
            
            {/* Indicador visual discreto estilo RPG no cantinho da caixa */}
            <Text style={styles.scrollIndicatorHint}>↕ ↔</Text>
          </View>
        )}
      </View>

      {/* Coluna da Direita: Opções ou Caixa de Feedback */}
      <View style={styles.rightColumn}>
        {!answered ? (
          <View style={styles.optionsGrid}>
            {node.options.map((opt, idx) => (
              <Pressable
                key={idx}
                disabled={answered}
                onPress={() => handleSelect(idx)}
                style={({ pressed }) => [
                  styles.optionButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.optionText}>{opt.text}</Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackTitle}>
              {isCorrectSelection ? `✅ Correto! +${node.xpReward} XP` : '❌ Não foi dessa vez.'}
            </Text>
            <Text style={styles.feedbackText} numberOfLines={3} adjustsFontSizeToFit>
              {node.explanation}
            </Text>
            
            <Pressable 
              style={({ pressed }) => [
                styles.continueButton,
                pressed && styles.buttonPressed
              ]} 
              onPress={handleContinue}
            >
              <Text style={styles.continueText}>Continuar ▸</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(12, 21, 17, 0.92)',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ffb703',
    padding: 12,
    gap: 16,
    maxHeight: 180, // Mantém o teto seguro para continuar mostrando o cenário
    alignItems: 'center',
  },
  leftColumn: {
    flex: 1.2,
    height: '100%',
    justifyContent: 'center',
  },
  rightColumn: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffb703',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginBottom: 4,
  },
  badgeText: {
    color: '#1a1a1a',
    fontWeight: '800',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  prompt: {
    color: '#f1f1f1',
    fontSize: 12,
    lineHeight: 15,
    marginBottom: 4,
    fontWeight: '500',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
  },
  optionButton: {
    backgroundColor: '#293e5c',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#4361ee',
    borderBottomWidth: 4,
    borderBottomColor: '#1d2d44',
    width: '48%', // Alinhamento perfeito em 2x2
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    borderBottomWidth: 1,
    marginTop: 3,
  },
  optionText: {
    color: '#e0e1dd',
    fontSize: 11,
    fontFamily: 'monospace',
    textAlign: 'center',
  },
  feedbackBox: {
    height: '100%',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  feedbackTitle: {
    color: '#ffe066',
    fontWeight: '800',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  feedbackText: {
    color: '#c9c9d3',
    fontSize: 11,
    lineHeight: 14,
  },
  continueButton: {
    backgroundColor: '#4361ee',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#2b3da5',
  },
  continueText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  codeBox: {
    backgroundColor: '#0d0d17',
    borderRadius: 8,
    padding: 6,
    borderWidth: 1,
    borderColor: '#3d5a80', // Uma cor um pouco mais clara para destacar a existência da caixa
    flex: 1,
    maxHeight: 95,
    position: 'relative', // Permite posicionar a dica absoluta lá dentro
  },
  verticalScrollContent: {
    paddingRight: 8, // Garante que a barra de rolagem não fique colada em cima do texto do código
  },
  horizontalScrollContent: {
    paddingBottom: 8, // Dá espaço para a barra horizontal respirar sem cobrir a última linha
  },
  codeText: {
    color: '#7ee787',
    fontFamily: 'monospace',
    fontSize: 11,
    lineHeight: 15,
  },
  scrollIndicatorHint: {
    position: 'absolute',
    bottom: 2,
    right: 4,
    color: 'rgba(255, 183, 3, 0.4)', // Amarelo bem suave/transparente para não atrapalhar a leitura
    fontSize: 9,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
});