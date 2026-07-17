import React from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGame } from '../engine/GameContext';
import SceneBackground from '../components/SceneBackground';
import { chapters } from '../data/story';

export default function ChapterCompleteScreen() {
  const { currentChapter, currentNode, progress, advanceTo } = useGame();

  if (!currentChapter || currentNode?.type !== 'end') return null;

  const handleContinue = () => {
    const nextChapter = chapters.find(c => c.order === currentChapter.order + 1);
    if (nextChapter) {
      advanceTo(nextChapter.startNode); 
    } else {
      advanceTo('victory_node_ou_limpar'); 
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      {/* Cenário de fundo ocupando a tela inteira */}
      <View style={styles.backgroundContainer}>
        <SceneBackground theme={currentChapter.theme} />
      </View>

      {/* Grid dividido em duas colunas para otimizar o espaço horizontal */}
      <View style={styles.overlay}>
        
        {/* Coluna da Esquerda: Dados da Vitória */}
        <View style={styles.leftColumn}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🏆 CAPÍTULO CONCLUÍDO</Text>
          </View>
          
          <Text style={styles.title}>{currentChapter.title}</Text>
          <Text style={styles.concept}>Conceito dominado: <Text style={styles.conceptHighlight}>{currentChapter.concept}</Text></Text>
          
          <Text style={styles.xp}>
            XP TOTAL: <Text style={styles.xpHighlight}>{progress.xp}</Text> · NÍVEL {progress.level}
          </Text>
        </View>

        {/* Coluna da Direita: Texto Narrativo de Conclusão e Botão */}
        <View style={styles.rightColumn}>
          <View style={styles.card}>
            <Text style={styles.text} numberOfLines={4} adjustsFontSizeToFit>
              {currentNode.text}
            </Text>
          </View>

          <Pressable 
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed
            ]} 
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>Continuar Jornada ▸</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#081c15' 
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    gap: 24,
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  rightColumn: {
    flex: 1.2,
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: '#ffb703',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },
  badgeText: {
    color: '#1a1a1a',
    fontWeight: '900',
    fontSize: 11,
    letterSpacing: 1,
  },
  title: {
    color: '#ffe066',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'left',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    letterSpacing: 1,
  },
  concept: {
    color: '#e0e1dd',
    fontSize: 13,
    textAlign: 'left',
    marginTop: 4,
    fontWeight: '500',
  },
  conceptHighlight: {
    color: '#95d5b2',
    fontWeight: '700',
  },
  xp: {
    color: '#8d99ae',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 16,
    letterSpacing: 1,
  },
  xpHighlight: {
    color: '#ffb703',
  },
  card: {
    backgroundColor: 'rgba(12, 21, 17, 0.92)',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#40916c',
    padding: 14,
    marginBottom: 14,
    maxHeight: 110,
    justifyContent: 'center',
  },
  text: {
    color: '#f1f1f1',
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    backgroundColor: '#4361ee',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4cc9f0',
    borderBottomWidth: 5,
    borderBottomColor: '#1a237e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonPressed: {
    borderBottomWidth: 1,
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});