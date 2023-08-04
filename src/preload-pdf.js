const { watchFile } = require("node:fs");

const { State } = require("./state");

var viewer = null;
var fileWatcher = null;

const update_pdf = () => {
  // Set viewer on iframe
  viewer.src =
    "./lib/pdfjs/web/viewer.html?file=" +
    encodeURIComponent(State.getPdfFilePath);
};

const init = () => {
  viewer = document.getElementById("pdf-viewer");

  // watch for file changes

  fileWatcher = watchFile(
    State.getPdfFilePath,
    { interval: 1007 },
    (curr, prev) => {
      console.log(`the current mtime is: ${curr.mtime}`);
      console.log(`the previous mtime was: ${prev.mtime}`);

      update_pdf();
    }
  );

  update_pdf();
};

module.exports = { init };
