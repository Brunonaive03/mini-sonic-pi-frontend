class AudioEngine {
  constructor() {
    this.audioCtx = null;
    this.audioStartTime = 0;
    this.bpmTimeline = [];
  }

  ensureContext() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      console.log('[AudioEngine] AudioContext criado');
    }
    return this.audioCtx;
  }

  async resumeIfNeeded() {
    const ctx = this.ensureContext();
    if (ctx.state !== 'running') {
      await ctx.resume();
      console.log('[AudioEngine] AudioContext resumed');
    }
  }

  resetRuntime(startDelaySec, bpm) {
    const ctx = this.ensureContext();
    this.audioStartTime = ctx.currentTime + startDelaySec;
    this.bpmTimeline = [{ beat: 0, bpm }];
  }

  pushBpmChange(beat, bpm) {
    const tl = this.bpmTimeline;
    if (tl.length && tl[tl.length - 1].beat === beat) {
      tl[tl.length - 1].bpm = bpm;
    } else {
      tl.push({ beat, bpm });
    }
  }

  beatsToSeconds(targetBeat) {
    let seconds = 0;
    for (let i = 0; i < this.bpmTimeline.length; i++) {
      const cur = this.bpmTimeline[i];
      const next = this.bpmTimeline[i + 1];
      if (targetBeat <= cur.beat) break;
      const endBeat = next ? Math.min(next.beat, targetBeat) : targetBeat;
      seconds += (endBeat - cur.beat) * (60 / cur.bpm);
      if (endBeat >= targetBeat) break;
    }
    return seconds;
  }

  playNote(midiNote, beat, duration = 1.0) {
    const ctx = this.ensureContext();
    const now = ctx.currentTime;

    let startTime = this.audioStartTime + this.beatsToSeconds(beat);

    const durSec =
      this.beatsToSeconds(beat + duration) -
      this.beatsToSeconds(beat);

    if (startTime < now) {
      startTime = now + 0.01;
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = 440 * Math.pow(2, (midiNote - 69) / 12);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.15, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + durSec);

    osc.connect(gain).connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + durSec + 0.05);
  }

  stopRuntime() {
    this.audioStartTime = 0;
    this.bpmTimeline = [];
    console.log('[AudioEngine] runtime parado');
  }
}

export const engine = new AudioEngine();
