import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { SceneTheme } from '../types';

interface Props {
  theme: SceneTheme;
}

const THEME_COLORS: Record<SceneTheme, [string, string]> = {
  floresta: ['#1b4332', '#081c15'],
  cidade: ['#3a0ca3', '#10002b'],
  torre: ['#7f1d1d', '#1a0505'],
  caverna: ['#292524', '#0c0a09'],
};

export default function SceneBackground({ theme }: Props) {
  const [top, bottom] = THEME_COLORS[theme];

  return (
    <View style={styles.backgroundContainer} pointerEvents="none">
      {/* Usamos viewBox="0 0 400 200" (proporção 2:1, ideal para modo horizontal).
        O preserveAspectRatio="xMidYMax slice" garante que o SVG corte as laterais 
        mas fique SEMPRE colado no fundo (Y máximo) da tela.
      */}
      <Svg 
        width="100%" 
        height="120%" 
        viewBox="0 0 400 220" 
        preserveAspectRatio="xMidYMid slice"
      >
        <Defs>
          <LinearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={top} />
            <Stop offset="1" stopColor={bottom} />
          </LinearGradient>
        </Defs>

        {/* 1. Céu de Fundo */}
        <Rect x="0" y="0" width="400" height="220" fill="url(#sky)" />

        {/* 2. Sol / lua visível no topo direito */}
        <Circle cx="340" cy="40" r="18" fill="#ffe066" opacity={0.95} />

        {theme === 'floresta' && (
          <>
            {/* 3. Montanhas grandes e destacadas */}
            <Path d="M-20 220 L80 110 L180 220 Z" fill="#2d6a4f" />
            <Path d="M70 220 L180 80 L290 220 Z" fill="#1b4332" />
            <Path d="M200 220 L280 120 L360 220 Z" fill="#2d6a4f" />

            {/* 4. Chão mais limpo e bem abaixo das montanhas */}
            <Rect x="0" y="180" width="400" height="40" fill={bottom} />
          </>
        )}

        {theme === 'cidade' && (
          <>
            <Rect x="0" y="170" width="400" height="30" fill="#10002b" />
            <Rect x="20" y="110" width="40" height="90" fill="#3c096c" />
            <Rect x="70" y="70" width="50" height="130" fill="#5a189a" />
            <Rect x="130" y="130" width="35" height="70" fill="#3c096c" />
            <Rect x="200" y="50" width="55" height="150" fill="#5a189a" />
            <Rect x="270" y="100" width="45" height="100" fill="#3c096c" />
            <Rect x="330" y="80" width="50" height="120" fill="#5a189a" />
          </>
        )}

        {theme === 'torre' && (
          <>
            <Rect x="170" y="20" width="60" height="180" fill="#7f1d1d" />
            <Rect x="150" y="140" width="100" height="60" fill="#450a0a" />
            <Circle cx="200" cy="60" r="8" fill="#fca5a5" opacity={0.6} />
            <Circle cx="200" cy="100" r="8" fill="#fca5a5" opacity={0.6} />
            <Circle cx="200" cy="140" r="8" fill="#fca5a5" opacity={0.6} />
          </>
        )}

        {theme === 'caverna' && (
          <>
            <Path d="M0 200 L0 130 L80 170 L160 120 L240 170 L320 130 L400 170 L400 200 Z" fill="#292524" />
          </>
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject, // Garante que a View preencha 100% da tela fisicamente
    overflow: 'hidden',
  },
});