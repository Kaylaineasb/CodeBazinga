import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGame } from '../engine/GameContext';
import SceneBackground from '../components/SceneBackground';

export default function VictoryScreen() {
  const { progress, goToMenu, allChapters } = useGame();

  return (
    <SafeAreaView style={styles.container}>
      <SceneBackground theme="torre" />
      <View style={styles.overlay}>
        <Text style={styles.trophy}>🏆</Text>
        <Text style={styles.title}>Jornada Concluída!</Text>
        <Text style={styles.subtitle}>
          Você dominou {allChapters.length} conceitos fundamentais de programação.
        </Text>

        <View style={styles.card}>
          {allChapters.map((c) => (
            <Text key={c.id} style={styles.line}>
              ✓ {c.concept}
            </Text>
          ))}
        </View>

        <Text style={styles.xp}>XP final: {progress.xp} · Nível {progress.level}</Text>

        <TouchableOpacity style={styles.button} onPress={goToMenu} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Voltar ao Menu</Text>
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
    alignItems: 'center',
  },
  trophy: { fontSize: 56, marginBottom: 8 },
  title: {
    color: '#ffe066',
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#e0e1dd',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(15,15,30,0.9)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#3d5a80',
    padding: 16,
    marginBottom: 16,
    width: '100%',
  },
  line: {
    color: '#f1f1f1',
    fontSize: 14,
    lineHeight: 22,
  },
  xp: {
    color: '#8d99ae',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#4361ee',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
