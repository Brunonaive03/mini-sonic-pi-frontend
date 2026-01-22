export const manualData = [
  {
    id: 1,
    titulo: "1. EXECUTANDO MÚSICA",
    cor: "text-pink-500",
    conteudo: [
      { tipo: "texto", valor: "Toda música deve estar dentro de um ciclo ou vezes. Nada acontece fora do tempo." },
      { tipo: "destaque", valor: "CICLO CONTÍNUO", bg: "bg-pink-600" },
      { tipo: "codigo", valor: "ciclo faca\n  toque 60\n  espere 1\nfim" },
      { tipo: "destaque", valor: "REPETIÇÃO DEFINIDA", bg: "bg-pink-800" },
      { tipo: "codigo", valor: "2.vezes faca\n  toque 60\n  espere 1\nfim" }
    ]
  },
  {
    id: 2,
    titulo: "2. TOCANDO SONS",
    cor: "text-blue-500",
    conteudo: [
      { tipo: "texto", valor: "Use o comando toque para produzir som. Ele aceita números MIDI ou notas musicais." },
      { tipo: "codigo", valor: "toque :DO\ntoque 70" },
      { tipo: "destaque", valor: "ACORDES", bg: "bg-blue-600" },
      { tipo: "texto", valor: "Toque várias notas ao mesmo tempo usando listas." },
      { tipo: "codigo", valor: "toque [:DO, :MI, :SOL]" }
    ]
  },
  {
    id: 3,
    titulo: "3. CONTROLE DO TEMPO",
    cor: "text-yellow-500",
    conteudo: [
      { tipo: "texto", valor: "O comando espere define a pausa entre os sons. Essencial para o ritmo." },
      { tipo: "codigo", valor: "espere 0.5" },
      { tipo: "destaque", valor: "BPM (VELOCIDADE GLOBAL)", bg: "bg-yellow-600" },
      { tipo: "codigo", valor: "use_bpm 120" }
    ]
  },
  {
    id: 4,
    titulo: "4. BPM E RITMO GLOBAL",
    cor: "text-orange-400",
    conteudo: [
      { tipo: "texto", valor: "O BPM define a velocidade global da música e deve ser declarado antes da execução musical." },
      { tipo: "destaque", valor: "REGRAS DE BPM", bg: "bg-orange-600" },
      { tipo: "texto", valor: "O valor deve estar entre 20 e 300." },
      { tipo: "codigo", valor: "use_bpm 120\n\nciclo faca\n  toque :DO\n  espere 1\nfim" }
    ]
  },
  {
    id: 5,
    titulo: "5. CONDIÇÕES E SORTE",
    cor: "text-indigo-400",
    conteudo: [
      { tipo: "texto", valor: "A linguagem permite tomar decisões musicais baseadas em probabilidade com o comando 'uma_em'." },
      { tipo: "destaque", valor: "ESTRUTURA SE/SENAO", bg: "bg-indigo-600" },
      { tipo: "codigo", valor: "ciclo faca\n  se uma_em(2)\n    toque :DO\n  senao\n    toque :SOL\n  fim\n  espere 1\nfim" }
    ]
  },
  {
    id: 6,
    titulo: "6. DEFININDO FUNÇÕES",
    cor: "text-cyan-400",
    conteudo: [
      { tipo: "texto", valor: "Você pode criar funções reutilizáveis usando o comando 'defina'." },
      { tipo: "destaque", valor: "REGRAS IMPORTANTES", bg: "bg-cyan-700" },
      { tipo: "texto", valor: "'defina' não pode estar dentro de um ciclo e as funções só rodam dentro da execução musical." },
      { tipo: "codigo", valor: "defina :frase faca\n  toque :MI\n  espere 0.5\n  toque :SOL\n  espere 0.5\nfim\n\nciclo faca\n  frase\nfim" }
    ]
  },
  {
    id: 7,
    titulo: "7. ESCOLHA ALEATÓRIA",
    cor: "text-red-400",
    conteudo: [
      { tipo: "texto", valor: "Escolha valores aleatoriamente de uma lista não vazia." },
      { tipo: "codigo", valor: "ciclo faca\n  nota = escolha [:DO, :RE, :MI]\n  toque nota\n  espere 1\nfim" }
    ]
  },
  {
    id: 8,
    titulo: "8. VARIÁVEIS E CONTROLE",
    cor: "text-amber-500",
    conteudo: [
      { tipo: "texto", valor: "Variáveis tornam o código mais expressivo. Use 'pare' para interromper um ciclo." },
      { tipo: "destaque", valor: "EXEMPLO DE VARIÁVEL", bg: "bg-amber-600" },
      { tipo: "codigo", valor: "ciclo faca\n  nota_base = :LA\n  toque nota_base\n  espere 1\n  pare\nfim" }
    ]
  }
];