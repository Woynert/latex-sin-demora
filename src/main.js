const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const os = require("os");
const pty = require("node-pty");

const createWindow = () => {
  // Create the browser window.

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });

  // load index.html
  mainWindow.loadFile("index.html");

  // dev tools
  mainWindow.webContents.openDevTools();

  // spawn shell

  var shell = os.platform() === "win32" ? "powershell.exe" : "bash";
  var ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 20,
    rows: 24,
    cwd: process.env.HOME,
    env: process.env,
  });

  ptyProcess.on("data", (data) => {
    mainWindow.webContents.send("terminal-incData", data);
  });

  // ipc signals

  ipcMain.on("terminal-into", (_, data) => {
    ptyProcess.write(data);
  });

  ipcMain.on("terminal-resize", (_, size) => {
    ptyProcess.resize(size.cols, size.rows);
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
  createWindow();
});

// quit
app.on("window-all-closed", () => {
  app.quit();
});
