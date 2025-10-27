const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  runAgent: (input) => ipcRenderer.invoke('run-agent', input)
});
