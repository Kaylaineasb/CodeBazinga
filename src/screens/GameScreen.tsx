import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGame } from '../engine/GameContext';
import SceneBackground from '../components/SceneBackground';
import DialogueBox from '../components/DialogueBox';
import ChoiceList from '../components/ChoiceList';
import CodeChallenge from '../components/CodeChallenge';
import StatusBar from '../components/StatusBar';

export default function GameScreen() {
  const { currentChapter, currentNode, progress, advanceTo, answerChallenge } = useGame();

  if (!currentChapter || !currentNode) return null;

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <SceneBackground theme={currentChapter.theme} />
      <StatusBar chapterTitle={currentChapter.title} level={progress.level} xp={progress.xp} />
      <View style={styles.content}>
        {currentNode.type === 'dialogue' && (
          <DialogueBox
            speaker={currentNode.speaker}
            avatar={currentNode.avatar}
            text={currentNode.text}
            onNext={() => advanceTo(currentNode.next)}
          />
        )}

        {currentNode.type === 'choice' && (
          <ChoiceList
            speaker={currentNode.speaker}
            avatar={currentNode.avatar}
            text={currentNode.text}
            options={currentNode.options}
            onSelect={(next) => advanceTo(next)}
          />
        )}

        {currentNode.type === 'challenge' && (
          <CodeChallenge node={currentNode} onComplete={answerChallenge} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end', 
    paddingHorizontal: 32, 
    paddingBottom: 16, 
  },
});