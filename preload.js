// preload.js

window.addEventListener("DOMContentLoaded", () => {
  // terminal

  const Terminal = require("xterm").Terminal;
  const FitAddon = require("xterm-addon-fit").FitAddon;
  const ipcRenderer = require("electron").ipcRenderer;

  const term = new Terminal({
    fontFamily: 'Hack Nerd Font Mono',
    cursorBlink: true,
    experimentalCharAtlas: "dynamic"
  });
  const fitAddon = new FitAddon();
  const term_container = document.getElementById("terminal-container");

  term.loadAddon(fitAddon);
  term.open(term_container);

  // ipc signals

  term.onData((e) => {
    ipcRenderer.send("terminal-into", e);
  });
  ipcRenderer.on("terminal-incData", (event, data) => {
    term.write(data);
  });

  new ResizeObserver(() => {
    ipcRenderer.send("terminal-resize", fitAddon.proposeDimensions());
    fitAddon.fit();
  }).observe(term_container);
});

const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("myAPI", {
  xterm: require("xterm").Terminal,
  "xterm-addon-fit": require("xterm-addon-fit").FitAddon,
  ipcRenderer: require("electron").ipcRenderer,
});
