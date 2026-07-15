import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChoiceOption } from '../types';

interface Props {
  speaker: string;
  avatar: string;
  text: string;
  options: ChoiceOption[];
  onSelect: (next: string) => void;
}

export default function ChoiceList({ speaker, avatar, text, options, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.avatar}>{avatar}</Text>
        <Text style={styles.speaker}>{speaker}</Text>
      </View>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.options}>
        {options.map((opt, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.optionButton}
            onPress={() => onSelect(opt.next)}
            activeOpacity={0.8}
          >
            <Text style={styles.optionText}>{opt.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(15, 15, 30, 0.92)',
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#3d5a80',
    padding: 16,
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
    marginBottom: 12,
  },
  options: {
    gap: 8,
  },
  optionButton: {
    backgroundColor: '#293e5c',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#4361ee',
    marginBottom: 8,
  },
  optionText: {
    color: '#e0e1dd',
    fontSize: 14,
  },
});
