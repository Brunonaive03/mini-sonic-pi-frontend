import { useState, useEffect, useRef } from 'react';
import { Trash2 } from 'lucide-react';
import { Header } from '../components/Editor/Header';
import { Sidebar } from '../components/Editor/Sidebar';
import { CodeArea } from '../components/Editor/CodeArea';
import { Console } from '../components/Editor/Console';

import { rubyService } from '../services/rubyService';
import { Logger } from '../services/logger';

export default function EditorScreen() {
  const [code, setCode] = useState(
    "# Bem-vindo ao Mini Sonic Pi PT-BR\n" +
    "use_bpm 60\n\nciclo faca\n  toque :DO4\n  espere 1\nfim"
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const [erroBackend, setErroBackend] = useState(null);

  // evita closures quebradas durante polling
  const isPlayingRef = useRef(false);

  const addLog = (entry) => {
    setLogs(prev => [...prev, entry]);
  };

  /* =========================
   * CALLBACKS DO RUNTIME
   * ========================= */
  const runtimeCallbacks = {
    onLog: (res) => {
      if (res.type === 'error') {
        addLog(Logger.backendError(res.message));
      } else {
        addLog(Logger.backendInfo(res.message));
      }
    },

    onError: (err) => {
      const prefixo =
        err.linha === '—'
          ? 'Erro:'
          : `Erro na linha ${err.linha}:`;

      addLog(
        Logger.backendError(
          `${prefixo} ${err.mensagem}`
        )
      );
    },

    onStop: () => {
      addLog(Logger.warn('Execução finalizada.'));
      setIsPlaying(false);
      setIsLoading(false);
      isPlayingRef.current = false;
    }
  };

  /* =========================
   * PLAY / STOP
   * ========================= */
  const handleTogglePlay = async () => {
    // STOP
    if (isPlayingRef.current) {
      rubyService.parar(runtimeCallbacks.onStop);
      addLog(Logger.warn('Execução interrompida pelo usuário.'));
      setIsPlaying(false);
      isPlayingRef.current = false;
      return;
    }

    // RUN
    setErroBackend(null);
    setIsLoading(true);
    addLog(Logger.info('Enviando código para o motor Ruby...'));

    try {
      await rubyService.iniciar(code, runtimeCallbacks);
      setIsPlaying(true);
      isPlayingRef.current = true;
    } catch (err) {
      addLog(Logger.backendError(err.message));
      setIsPlaying(false);
      isPlayingRef.current = false;
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================
   * CLEANUP GLOBAL
   * ========================= */
  useEffect(() => {
    return () => {
      rubyService.parar();
    };
  }, []);

  /* =========================
   * RENDER
   * ========================= */
  return (
    <div className="flex flex-col h-full w-full bg-[#0a0a0a] text-zinc-300 overflow-hidden select-none">
      <Header
        isPlaying={isPlaying}
        isLoading={isLoading}
        onTogglePlay={handleTogglePlay}
      />

      <main className="flex flex-1 overflow-hidden">
        <Sidebar />

        <section className="flex-1 flex flex-col relative overflow-hidden border-l border-zinc-800">
          <CodeArea
            code={code}
            setCode={setCode}
            erroBackend={erroBackend}
          />

          <footer className="h-56 border-t border-zinc-800 flex flex-col shrink-0 bg-[#0c0c0c]">
            <button
                onClick={() => setLogs([])}
                className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-zinc-800 text-[10px] text-zinc-500 hover:text-zinc-200 transition-all font-bold uppercase tracking-wider group"
                title="Limpar todos os logs"
              >
                <Trash2 size={11} className="group-hover:text-red-400 transition-colors" />
                Limpar
              </button>
            <Console logs={logs} />
          </footer>
        </section>
      </main>
    </div>
  );
}
