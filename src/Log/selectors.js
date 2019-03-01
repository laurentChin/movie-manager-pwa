export const pendingLogsSelector = logs =>
  logs.history.filter(log => log.pending);
