const { watchFile } = require("node:fs");
const { State } = require("./state");

var viewer = null;
var fileWatcher = null;

const update_pdf = () => {
  console.log("Updating PDF...");

  // Set viewer on iframe
  viewer.src =
    "./lib/pdfjs/web/viewer.html?file=" +
    encodeURIComponent(State.getPdfFilePath());
};

const init = () => {
  viewer = document.getElementById("pdfViewer");

  // watch for file changes

  fileWatcher = watchFile(
    State.getPdfFilePath(),
    { interval: State.checkPdfUpdatesMS },
    (curr, prev) => {
      // check if it was modified
      if (prev.mtimeMs == curr.mtimeMs) return;

      update_pdf();
    }
  );

  // start

  update_pdf();
};

module.exports = { init };
