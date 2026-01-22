import { Play, Square, Loader2 } from 'lucide-react';

export function Header({ isPlaying, isLoading, onTogglePlay }) {
  return (
    <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0 bg-zinc-900/20">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-brand-pink rounded flex items-center justify-center text-white font-bold italic">π</div>
        <span className="font-bold text-white tracking-tight text-lg">Mini Sonic Pi <span className="font-light opacity-50">PT-BR</span></span>
      </div>
      
      {/* Lado Direito: Controles de Áudio */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onTogglePlay}
          disabled={isLoading}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all active:scale-95 border border-transparent ${
            isLoading ? 'opacity-50 cursor-wait bg-zinc-800 text-zinc-500' :
            isPlaying 
            ? 'bg-zinc-800 text-brand-pink hover:bg-zinc-700 border-brand-pink/30' 
            : 'bg-linear-to-r from-brand-pink to-brand-purple text-white shadow-lg shadow-brand-pink/20 hover:brightness-110'
          }`}
        >
          {isLoading ? (
            <><Loader2 size={16} className="animate-spin" /> Processando...</>
          ) : isPlaying ? (
            <><Square size={16} fill="currentColor" /> Parar</>
          ) : (
            <><Play size={16} fill="currentColor" /> Tocar Música</>
          )}
        </button>
      </div>
    </header>
  );
}