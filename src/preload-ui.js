const { ipcRenderer } = require("electron");

const latexProcess = require("./preload-latex.js");
const { State } = require("./state");

module.exports.init = () => {
  // open file dialog

  const btnSelectFile = document.getElementById("btnSelectFile");
  const labelFile = document.getElementById("labelFile");

  btnSelectFile.addEventListener("click", () => {
    ipcRenderer.send("ui-open-file-req", null);
  });

  // get file path

  ipcRenderer.on("ui-open-file-res", (_, data) => {
    State.texFilePath = data;
    labelFile.innerText = State.texFilePath;

    // kill current builder

    if (State.isBuildActive) {
      latexProcess.stop_builder();
    }
  });

  // toogle build

  const btnToggleBuild = document.getElementById("btnToggleBuild");
  const updateBtnToggleBuild = () => {
    btnToggleBuild.innerText = State.isBuildActive ? "🟢️ Stop" : "⬛️ Resume";
  };
  updateBtnToggleBuild();

  btnToggleBuild.addEventListener("click", () => {
    State.isBuildActive = !State.isBuildActive;
    updateBtnToggleBuild();

    // start / stop building

    if (State.isBuildActive) {
      latexProcess.run_builder();
    } else {
      latexProcess.stop_builder();
    }
  });
};
