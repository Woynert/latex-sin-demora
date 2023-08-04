const { ipcRenderer } = require("electron");
const { State } = require("./state");

module.exports.init = () => {
  // open file dialog

  const btnSelectFile = document.getElementById("btnSelectFile");

  btnSelectFile.addEventListener("click", () => {
    ipcRenderer.send("ui-open-file-req", null);
  });

  // get file path

  ipcRenderer.on("ui-open-file-res", (_, data) => {
    State.texFilePath = data;
  });
};
