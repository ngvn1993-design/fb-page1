const { app, BrowserWindow, ipcMain, safeStorage } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1050,
    height: 760,
    minWidth: 850,
    minHeight: 650,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(__dirname, "index.html"));
}

ipcMain.handle("secure-save-token", async (_, token) => {
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error("Windows secure storage is unavailable.");
  }
  const encrypted = safeStorage.encryptString(token).toString("base64");
  return encrypted;
});

ipcMain.handle("secure-read-token", async (_, encryptedBase64) => {
  if (!encryptedBase64) return "";
  if (!safeStorage.isEncryptionAvailable()) {
    throw new Error("Windows secure storage is unavailable.");
  }
  return safeStorage.decryptString(Buffer.from(encryptedBase64, "base64"));
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
