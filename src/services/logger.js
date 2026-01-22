export const Logger = {
  // Gera o objeto de log padronizado
  createEntry(level, source, text) {
    const entry = {
      time: new Date().toLocaleTimeString(),
      type: level, // 'info', 'warn', 'error', 'success'
      source: source, // 'frontend', 'backend', 'audio'
      message: text
    };

    // Mantém o log técnico no console do navegador para debug
    const consoleMsg = `[${entry.source.toUpperCase()}] ${text}`;
    if (level === 'error') console.error(consoleMsg);
    else if (level === 'warn') console.warn(consoleMsg);
    else console.log(consoleMsg);

    return entry;
  },

  // Atalhos compatíveis com o seu elabore original
  info: (t) => Logger.createEntry('info', 'frontend', t),
  warn: (t) => Logger.createEntry('warn', 'frontend', t),
  error: (t) => Logger.createEntry('error', 'frontend', t),

  backendError: (t) => Logger.createEntry('error', 'backend', t),
  backendWarn:  (t) => Logger.createEntry('warn',  'backend', t),
  backendInfo:  (t) => Logger.createEntry('info',  'backend', t),

  audioError: (t) => Logger.createEntry('error', 'audio', t),
  audioWarn:  (t) => Logger.createEntry('warn',  'audio', t),
  audioInfo:  (t) => Logger.createEntry('info',  'audio', t)
};