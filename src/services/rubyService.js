import { engine } from '../audio/engine';

const BACKEND_URL = import.meta.env.VITE_API_URL;

export const rubyService = {
  runtime: null,

  async iniciar(code, callbacks) {
    const { onLog, onError, onStop } = callbacks;

    await engine.resumeIfNeeded();

    const res = await fetch(`${BACKEND_URL}/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: code
    });

    if (!res.ok) {
      onError({ linha: 0, mensagem: 'Falha ao iniciar runtime' });
      return;
    }

    const json = await res.json();

    this.runtime = {
      id: json.runtime_id,
      since_id: 0,
      pollInterval: null
    };

    onLog({ type: 'info', message: `runtime iniciado (${json.runtime_id})` });

    this.runtime.pollInterval = setInterval(
      () => this.poll(callbacks),
      100
    );
  },

  async poll(callbacks) {
    if (!this.runtime) return;
    const { onLog, onError, onStop } = callbacks;

    try {
      const res = await fetch(
        `${BACKEND_URL}/events?runtime_id=${this.runtime.id}&since_id=${this.runtime.since_id}`
      );

      if (!res.ok) return;

      const json = await res.json();
      const events = json.events || [];

      for (const e of events) {
        this.runtime.since_id = Math.max(
          this.runtime.since_id,
          e.id || this.runtime.since_id
        );

        if (e.type === 'runtime_start') {
          
          onLog({ type: 'info', message: 'runtime_start' });
        }

        if (e.type === 'set_bpm') {
          engine.pushBpmChange(e.time, e.data.bpm);
        }

        if (e.type === 'play') {
          engine.playNote(
            e.data.note,
            e.time,
            e.data.duration || 1.0
          );
        }

        if (e.type === 'runtime_error') {
          const linha =
            e.data.line !== null && e.data.line !== undefined
              ? e.data.line
              : '—';

          onError({
            linha,
            mensagem: e.data.message,
            categoria: e.data.category,
            codigo: e.data.code
          });

          this.parar(onStop);
          return;
        }

        if (e.type === 'runtime_end') {
          onLog({ type: 'info', message: 'runtime_end' });
          this.parar(onStop);
          return;
        }
      }
    } catch (err) {
      onLog({ type: 'error', message: err.message });
    }
  },

  parar(onStop) {
    if (!this.runtime) return;

    clearInterval(this.runtime.pollInterval);
    this.runtime = null;
    engine.stopRuntime();
    if (onStop) onStop();
  }
};
