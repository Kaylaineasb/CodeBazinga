import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  chapterTitle: string;
  level: number;
  xp: number;
}

export default function StatusBar({ chapterTitle, level, xp }: Props) {
  const xpIntoLevel = xp % 100;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.chapter} numberOfLines={1}>
          {chapterTitle}
        </Text>
        <Text style={styles.level}>Nível {level}</Text>
      </View>
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${xpIntoLevel}%` }]} />
      </View>
      <Text style={styles.xpText}>{xp} XP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chapter: {
    color: '#e0e1dd',
    fontSize: 13,
    fontWeight: '600',
    flexShrink: 1,
    marginRight: 8,
  },
  level: {
    color: '#ffe066',
    fontSize: 13,
    fontWeight: '700',
  },
  barTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.15)',
    overflow: 'hidden',
  },
  barFill: {
    height: 6,
    backgroundColor: '#4361ee',
  },
  xpText: {
    color: '#8d99ae',
    fontSize: 11,
    marginTop: 2,
    textAlign: 'right',
  },
});
