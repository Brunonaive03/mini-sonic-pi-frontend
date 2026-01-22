import React, { useEffect } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';

export function CodeArea({ code, setCode, erroBackend }) {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco && monaco.editor) {
      const models = monaco.editor.getModels();
      if (models.length > 0) {
        const model = models[0];
        if (erroBackend) {
          monaco.editor.setModelMarkers(model, "owner", [
            {
              startLineNumber: erroBackend.linha,
              startColumn: 1,
              endLineNumber: erroBackend.linha,
              endColumn: 1000,
              message: erroBackend.mensagem,
              severity: monaco.MarkerSeverity.Error,
            },
          ]);
        } else {
          monaco.editor.setModelMarkers(model, "owner", []);
        }
      }
    }
  }, [monaco, erroBackend]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      <div className="h-10 border-b border-zinc-800 flex items-center justify-between px-4 text-[10px] uppercase font-bold text-zinc-500 bg-[#0e0e0e] shrink-0">
        <span>Editor de Código</span>
        <span className="text-zinc-600">Linguagem: Sonic Pi BR</span>
      </div>

      <div className="flex-1 relative overflow-hidden">
        <Editor
          height="100%"
          language="sonic-pi-br"
          theme="vs-dark"
          value={code}
          onChange={setCode}
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            renderValidationDecorations: "on",
          }}
          onMount={(editor, monaco) => {
            monaco.languages.register({ id: 'sonic-pi-br' });

            monaco.languages.setMonarchTokensProvider('sonic-pi-br', {
              tokenizer: {
                root: [
                  // Palavras-chave principais
                  [/\b(ciclo|faca|fim|toque|espere|vezes|use_bpm|se|senao|pare|defina)\b/, "keyword"],
                  
                  // Funções integradas
                  [/\b(uma_em|escolha)\b/, "type.identifier"],
                  
                  // Notas Musicais Localizadas e Internacionais com Oitava (Ex: :DOs4, :REb, :Fs3)
                  [/:(DO|RE|MI|FA|SOL|LA|SI|[A-G])[sb]?\d*/, "variable"],
                  
                  // Variáveis Definidas
                  [/\b[a-z_][\w]*\b/, "identifier"],
             
                  [/\d+/, "number"],
                  [/#.*$/, "comment"],
                  [/"[^"]*"/, "string"],
                  [/'[^']*'/, "string"],
                ],
              },
            });

            monaco.languages.setLanguageConfiguration('sonic-pi-br', {
              comments: {
                lineComment: "#",
              },
              
              // O segredo está em declarar as três combinações como pares independentes
              brackets: [
                ["se", "fim"],
                ["faca", "fim"],
                ["[", "]"],
                ["(", ")"],
              ],

              autoClosingPairs: [
                { open: 'se ', close: 'fim' }, // Sugestão: fechar o bloco no espaço
                { open: '[', close: ']' },
                { open: '(', close: ')' },
                { open: '"', close: '"' },
              ],

              indentationRules: {
                // Aumenta o recuo após 'se' ou 'senao'
                increaseIndentPattern: /^\s*(se|senao|faca|ciclo)\b/,
                // Diminui o recuo ao digitar 'senao' ou 'fim' para alinhar a coluna vertical
                decreaseIndentPattern: /^\s*(senao|fim)\b/
              },
              onEnterRules: [
                {
                  // Regra específica: Se der Enter após o 'senao'
                  beforeText: /^\s*senao\b.*$/,
                  action: { 
                    // Garante que a nova linha comece com um Tab (indentada)
                    indentAction: monaco.languages.IndentAction.Indent 
                  }
                },
                {
                  // Mantém o alinhamento correto se o usuário der Enter entre 'se' e 'fim'
                  beforeText: /^\s*(se|senao|faca).*/,
                  afterText: /^\s*fim\b/,
                  action: { indentAction: monaco.languages.IndentAction.IndentOutdent }
                }
              ]
            });
          }}
        />
      </div>
    </div>
  );
}