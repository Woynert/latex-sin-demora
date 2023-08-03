// preload.js

const { Terminal } = require("xterm");
const { FitAddon } = require("xterm-addon-fit");
const { ipcRenderer } = require("electron");
const { WebglAddon } = require("xterm-addon-webgl");

window.addEventListener("DOMContentLoaded", () => {
  // terminal

  const term = new Terminal({
    fontFamily: "Hack Nerd Font Mono",
    cursorBlink: true,
    experimentalCharAtlas: "dynamic",
  });
  const fitAddon = new FitAddon();
  const term_container = document.getElementById("terminal-container");

  term.loadAddon(fitAddon);
  term.loadAddon(new WebglAddon());
  term.open(term_container);

  // ipc signals

  term.onData((e) => {
    ipcRenderer.send("terminal-into", e);
  });
  ipcRenderer.on("terminal-incData", (_, data) => {
    term.write(data);
  });

  new ResizeObserver(() => {
    ipcRenderer.send("terminal-resize", fitAddon.proposeDimensions());
    fitAddon.fit();
  }).observe(term_container);
});
