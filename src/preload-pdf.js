const { watchFile, unwatchFile } = require("node:fs");
const { State } = require("./state");

var viewer = null;
var currentlyWatchedFile = "";

const update_pdf = () => {
  console.log("Updating PDF...");

  // Set viewer on iframe
  viewer.src =
    "./lib/pdfjs/web/viewer.html?file=" +
    encodeURIComponent(currentlyWatchedFile);
};

const init = () => {
  // unwatch file
  if (currentlyWatchedFile) unwatchFile(currentlyWatchedFile);

  viewer = document.getElementById("pdfViewer");
  currentlyWatchedFile = State.getPdfFilePath();

  // watch for file changes

  console.log("Watching file: ", currentlyWatchedFile);

  watchFile(
    currentlyWatchedFile,
    { interval: State.checkPdfUpdatesMS },
    (curr, prev) => {
      // check if it was modified
      if (prev.mtimeMs == curr.mtimeMs) return;

      update_pdf();
    }
  );

  update_pdf();
};

module.exports = { init };
