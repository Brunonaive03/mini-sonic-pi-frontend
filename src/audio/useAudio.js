// src/audio/useAudio.js
import { engine } from './engine';

export function useAudio() {
  return {
    tocarNota: (midi, beat, dur) => engine.playNote(midi, beat, dur),
    resetarRelogio: (bpm) => engine.resetClock(bpm),
    mudarBpm: (beat, bpm) => engine.pushBpmChange(beat, bpm),
    pararTudo: () => engine.stopAll(),
    iniciarContexto: () => engine.init()
  };
}