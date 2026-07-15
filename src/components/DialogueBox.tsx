import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  speaker: string;
  avatar: string;
  text: string;
  onNext: () => void;
}

export default function DialogueBox({ speaker, avatar, text, onNext }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onNext} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.avatar}>{avatar}</Text>
        <Text style={styles.speaker}>{speaker}</Text>
      </View>
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.hint}>Toque para continuar ▸</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(15, 15, 30, 0.92)',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#3d5a80',
    padding: 16,
    minHeight: 150,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    fontSize: 26,
    marginRight: 8,
  },
  speaker: {
    color: '#ffe066',
    fontWeight: '700',
    fontSize: 16,
  },
  text: {
    color: '#f1f1f1',
    fontSize: 15,
    lineHeight: 22,
  },
  hint: {
    color: '#8d99ae',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'right',
    fontStyle: 'italic',
  },
});
