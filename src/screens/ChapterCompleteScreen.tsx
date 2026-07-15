import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGame } from '../engine/GameContext';
import SceneBackground from '../components/SceneBackground';

export default function ChapterCompleteScreen() {
  const { currentChapter, currentNode, progress, continueAfterChapter } = useGame();

  if (!currentChapter || currentNode?.type !== 'end') return null;

  return (
    <SafeAreaView style={styles.container}>
      <SceneBackground theme={currentChapter.theme} />
      <View style={styles.overlay}>
        <Text style={styles.badge}>CAPÍTULO CONCLUÍDO</Text>
        <Text style={styles.title}>{currentChapter.title}</Text>
        <Text style={styles.concept}>Conceito dominado: {currentChapter.concept}</Text>

        <View style={styles.card}>
          <Text style={styles.text}>{currentNode.text}</Text>
        </View>

        <Text style={styles.xp}>XP total: {progress.xp} · Nível {progress.level}</Text>

        <TouchableOpacity style={styles.button} onPress={continueAfterChapter} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Continuar Jornada ▸</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  badge: {
    color: '#ffb703',
    fontWeight: '700',
    fontSize: 13,
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 6,
  },
  title: {
    color: '#ffe066',
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 4,
  },
  concept: {
    color: '#e0e1dd',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(15,15,30,0.9)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#3d5a80',
    padding: 16,
    marginBottom: 16,
  },
  text: {
    color: '#f1f1f1',
    fontSize: 14,
    lineHeight: 21,
  },
  xp: {
    color: '#8d99ae',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#4361ee',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
