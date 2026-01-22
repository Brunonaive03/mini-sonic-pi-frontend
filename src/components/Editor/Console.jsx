import React, { useEffect, useRef } from 'react';

export function Console({ logs }) {
  const bottomRef = useRef(null);

  // Auto-scroll: sempre que a lista de logs mudar, rola para o último
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Mapeamento de cores por nível (type)
  const getLevelColor = (type) => {
    switch (type) {
      case 'error': return 'text-red-400';
      case 'warn': return 'text-amber-500';
      case 'success': return 'text-emerald-400';
      default: return 'text-zinc-300'; // info
    }
  };

  // Mapeamento de cores por origem (source)
  const getSourceColor = (source) => {
    switch (source) {
      case 'backend': return 'text-purple-400';
      case 'audio': return 'text-cyan-400';
      default: return 'text-zinc-500';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed custom-scrollbar bg-black/20">
      <div className="flex flex-col gap-1">
        {logs.map((log, i) => (
          <div key={i} className={`flex gap-3 items-start animate-in fade-in duration-300`}>
            {/* Timestamp */}
            <span className="text-zinc-600 shrink-0 select-none">
              [{log.time}]
            </span>

            {/* Origem */}
            <span className={`font-bold uppercase tracking-tighter shrink-0 select-none ${getSourceColor(log.source)}`}>
              [{log.source || 'system'}]
            </span>

            {/* Mensagem */}
            <span className={`break-words ${getLevelColor(log.type)}`}>
              {log.message}
            </span>
          </div>
        ))}

        {/* Elemento para ancorar o scroll */}
        <div ref={bottomRef} className="h-px w-px" />

        {/* Estado Vazio */}
        {logs.length === 0 && (
          <div className="h-full flex items-center justify-center text-zinc-700 italic select-none">
            Aguardando entrada...
          </div>
        )}
      </div>
    </div>
  );
}