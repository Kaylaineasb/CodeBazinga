import { Audio } from 'expo-av';
import { SceneTheme } from '../types';

let backgroundMusicInstance: Audio.Sound | null = null;
let currentBgmTheme: SceneTheme | null = null;

const BGM_TRACKS: Record<SceneTheme, any> = {
  floresta: require('../assets/audio/forest.mp3'),
  cidade: require('../assets/audio/city.wav'),
  torre: require('../assets/audio/tower.ogg'),
  caverna: require('../assets/audio/cave.mp3'),
};

const SFX_TRACKS = {
  click: require('../assets/audio/click.mp3'),
  correct: require('../assets/audio/correct.mp3'),
  wrong: require('../assets/audio/wrong.mp3'),
  victory: require('../assets/audio/victory.mp3'),
};

/**
 * Toca um efeito sonoro rápido (SFX)
 * Carrega, reproduz e descarrega da memória imediatamente após o término (Mínimo Processamento!)
 */
export async function playSFX(type: keyof typeof SFX_TRACKS) {
  try {
    const { sound } = await Audio.Sound.createAsync(
      SFX_TRACKS[type],
      { shouldPlay: true, volume: 0.6 }
    );
    
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.error(`Erro ao reproduzir SFX (${type}):`, error);
  }
}

/**
 * Gerencia a Trilha Sonora (BGM)
 */
export async function playBGM(theme: SceneTheme) {
  try {
    if (currentBgmTheme === theme && backgroundMusicInstance) return;

    if (backgroundMusicInstance) {
      await backgroundMusicInstance.stopAsync();
      await backgroundMusicInstance.unloadAsync();
      backgroundMusicInstance = null;
    }

    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    });

    const { sound } = await Audio.Sound.createAsync(
      BGM_TRACKS[theme],
      { 
        shouldPlay: true, 
        isLooping: true,
        volume: 0.3
      }
    );

    backgroundMusicInstance = sound;
    currentBgmTheme = theme;
  } catch (error) {
    console.error(`Erro ao reproduzir BGM do tema (${theme}):`, error);
  }
}

/**
 * Para completamente a trilha sonora (Útil ao voltar para o menu principal)
 */
export async function stopBGM() {
  if (backgroundMusicInstance) {
    await backgroundMusicInstance.stopAsync();
    await backgroundMusicInstance.unloadAsync();
    backgroundMusicInstance = null;
    currentBgmTheme = null;
  }
}