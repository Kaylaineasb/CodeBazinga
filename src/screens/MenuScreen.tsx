import React from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  StatusBar,
} from 'react-native';
import { useGame } from '../engine/GameContext';
import SceneBackground from '../components/SceneBackground';

export default function MenuScreen() {
  const { startNewGame } = useGame(); 

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* 
        pointerEvents="none" garante que o Android/iOS ignorem toques nessa View, 
        fazendo o clique passar direto para os botões da frente!
      */}
      <View style={styles.backgroundContainer} pointerEvents="none">
        <SceneBackground theme="floresta" />
      </View>

      <View style={styles.overlay}>
        <View style={styles.brandContainer}>
          <Text style={styles.title}>CodeBazinga</Text>
          <Text style={styles.subtitle}>
            A jornada de um herói escrita em linhas de código
          </Text>
        </View>

        <Pressable 
          onPress={startNewGame} 
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed
          ]}
        >
          <Text style={styles.buttonText}>▶ Iniciar Jornada</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#081c15',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 32,
    zIndex: 1,
  },
  brandContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 52,
    fontWeight: '900',
    color: '#ffe066',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 2,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e1dd',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    maxWidth: 380,
  },
  button: {
    backgroundColor: '#1b4332',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 36,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#40916c',
    borderBottomWidth: 6,
    borderBottomColor: '#0f271c',
    width: '100%',
    maxWidth: 280,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonPressed: {
    borderBottomWidth: 2,
    marginTop: 4,
  },
  buttonText: {
    color: '#ffe066',
    fontWeight: '800',
    fontSize: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});