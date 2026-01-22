import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Book, Rocket, Layers, Music } from 'lucide-react';
import { manualData } from '../../data/manual';


export function Sidebar() {
  // Estado para controlar quais IDs estão abertos
  const [openItems, setOpenItems] = useState([1]); // Começa com o primeiro aberto

  const toggleItem = (id) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <aside className="w-80 border-r border-zinc-800 flex flex-col bg-[#0f0f0f] h-full shrink-0">
      {/* Cabeçalho Fixo */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/20">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
          <Book size={14} /> Manual do Usuário
        </h2>
      </div>

      {/* Lista de Itens (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {manualData.map((item) => {
          const isOpen = openItems.includes(item.id);

          return (
            <div key={item.id} className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/10">
              {/* Header do Item (Botão de abrir/fechar) */}
              <button 
                onClick={() => toggleItem(item.id)}
                className={`w-full flex items-center justify-between p-3 transition-colors ${isOpen ? 'bg-zinc-900/40' : 'hover:bg-zinc-900/30'}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-[11px] font-black uppercase tracking-wider ${isOpen ? 'text-white' : 'text-zinc-400'}`}>
                    {item.titulo}
                  </span>
                </div>
                {isOpen ? <ChevronUp size={14} className="text-zinc-600" /> : <ChevronDown size={14} className="text-zinc-600" />}
              </button>

              {/* Conteúdo Colapsável */}
              {isOpen && (
                <div className="p-4 space-y-4 border-t border-zinc-800/50 animate-in fade-in slide-in-from-top-1 duration-200">
                  {item.conteudo.map((bloco, idx) => (
                    <div key={idx}>
                      {bloco.tipo === 'texto' && (
                        <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                          {bloco.valor}
                        </p>
                      )}
                      {bloco.tipo === 'destaque' && (
                        <div className={`${bloco.bg} text-white text-[10px] font-black px-3 py-1.5 rounded uppercase mb-2`}>
                          {bloco.valor}
                        </div>
                      )}
                      {bloco.tipo === 'codigo' && (
                        <div className="bg-black/60 rounded-md p-3 font-mono text-[11px] text-pink-300 border border-zinc-800/50">
                          {bloco.valor.split('\n').map((linha, i) => (
                            <div key={i}>{linha}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}