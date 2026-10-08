const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("desktop", {
  saveToken: (token) => ipcRenderer.invoke("secure-save-token", token),
  readToken: (encrypted) => ipcRenderer.invoke("secure-read-token", encrypted)
});
