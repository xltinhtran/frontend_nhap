const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Study set management
  newStudySet: () => ipcRenderer.send('new-study-set'),
  onNewStudySet: (callback) => ipcRenderer.on('new-study-set', callback),
  
  // Data persistence (we'll implement this later)
  saveData: (data) => ipcRenderer.invoke('save-data', data),
  loadData: () => ipcRenderer.invoke('load-data'),
  
  // App info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // Window management
  minimize: () => ipcRenderer.send('minimize-window'),
  maximize: () => ipcRenderer.send('maximize-window'),
  close: () => ipcRenderer.send('close-window')
});

// Remove all listeners when the page is unloaded
window.addEventListener('beforeunload', () => {
  ipcRenderer.removeAllListeners('new-study-set');
});
