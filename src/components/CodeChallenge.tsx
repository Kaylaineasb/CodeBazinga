import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
      <View style={styles.badge}>
        <Text style={styles.badgeText}>⚔ DESAFIO · {node.concept}</Text>
      </View>

      <Text style={styles.prompt}>{node.prompt}</Text>

      {node.code && (
        <View style={styles.codeBox}>
          <Text style={styles.codeText}>{node.code}</Text>
        </View>
      )}

      <View style={styles.options}>
        {node.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const showCorrect = answered && opt.correct;
          const showWrong = answered && isSelected && !opt.correct;
          return (
            <TouchableOpacity
              key={idx}
              disabled={answered}
              onPress={() => handleSelect(idx)}
              activeOpacity={0.8}
              style={[
                styles.optionButton,
                showCorrect && styles.optionCorrect,
                showWrong && styles.optionWrong,
              ]}
            >
              <Text style={styles.optionText}>{opt.text}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {answered && (
        <View style={styles.feedbackBox}>
          <Text style={styles.feedbackTitle}>
            {isCorrectSelection ? `✅ Correto! +${node.xpReward} XP` : '❌ Não foi dessa vez.'}
          </Text>
          <Text style={styles.feedbackText}>{node.explanation}</Text>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue} activeOpacity={0.85}>
            <Text style={styles.continueText}>Continuar ▸</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(15, 15, 30, 0.95)',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#ffb703',
    padding: 10,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffb703',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 6,
  },
  badgeText: {
    color: '#1a1a1a',
    fontWeight: '700',
    fontSize: 11,
  },
  prompt: {
    color: '#f1f1f1',
    fontSize: 13,
    lineHeight: 17,
    marginBottom: 6,
  },
  codeBox: {
    backgroundColor: '#0d0d17',
    borderRadius: 8,
    padding: 7,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: '#2a2a3d',
  },
  codeText: {
    color: '#7ee787',
    fontFamily: 'monospace',
    fontSize: 11,
    lineHeight: 15,
  },
  options: {
    gap: 8,
  },
  optionButton: {
    backgroundColor: '#293e5c',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#4361ee',
    marginBottom: 5,
  },
  optionCorrect: {
    backgroundColor: '#1b4332',
    borderColor: '#40916c',
  },
  optionWrong: {
    backgroundColor: '#4a0e0e',
    borderColor: '#c1121f',
  },
  optionText: {
    color: '#e0e1dd',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  feedbackBox: {
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#2a2a3d',
    paddingTop: 6,
  },
  feedbackTitle: {
    color: '#ffe066',
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 4,
  },
  feedbackText: {
    color: '#c9c9d3',
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 6,
  },
  continueButton: {
    backgroundColor: '#4361ee',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontWeight: '700',
  },
});
