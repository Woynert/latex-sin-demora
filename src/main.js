const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const os = require("os");
const pty = require("node-pty");

const createWindow = () => {
  // Create the browser window.

  const mainWindow = new BrowserWindow({
    title: 'Latex sin demora',
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

  // terminal - spawn shell

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

  // terminal - ipc signals

  ipcMain.on("terminal-into", (_, data) => {
    ptyProcess.write(data);
  });

  ipcMain.on("terminal-resize", (_, size) => {
    ptyProcess.resize(size.cols, size.rows);
  });

  // ui - ipc signals

  ipcMain.on("ui-open-file-req", async () => {
    // open file dialog

    const { dialog } = require("electron");
    const filepath = dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [
        { name: ".tex files", extensions: ["tex"] },
        { name: "All Files", extensions: ["*"] },
      ],
    });

    // try get filepath

    try {
      const result = await filepath;
      if (result.canceled) return;

      // send back
      mainWindow.webContents.send("ui-open-file-res", result.filePaths[0]);
    } catch (e) {
      console.error(e);
    }
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
