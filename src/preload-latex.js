const { execFile } = require("node:child_process");
const fs = require("fs");
const { State } = require("./state");

var processWatcher = null;
var retryTimeout = null;
const retryTimeoutMS = 3000;

const getOpts = () => {
  return [
    "-pdfps",
    "-pvc",
    "-pv-",
    "-cd",
    "-output-format=pdf",
    "-interaction=nonstopmode",
    `-jobname=${State.pdfFileName}`,
    `-outdir=${State.outDir}`,
    State.texFilePath,
  ];
};

const run_builder = () => {
  if (!State.isBuildActive) return;

  if (retryTimeout != null) {
    try {
      clearTimeout(retryTimeout);
    } catch (e) {
      console.error(e);
    }
  }

  // try to run as long as State.isBuildActive is true

  const try_run = () => {
    if (!State.isBuildActive) return;

    // try again

    if (State.texFilePath == "") {
      retryTimeout = setTimeout(try_run, retryTimeoutMS);
      return;
    }

    console.log("Running builder...");

    processWatcher = execFile(
      "latexmk2",
      getOpts(),
      (error, stdout, _stderr) => {
        if (error) {
          console.error("Couldn't run latexmk, is it installed?");
          console.log(error);
        }
        console.log(stdout);

        // try again

        if (State.isBuildActive)
          retryTimeout = setTimeout(try_run, retryTimeoutMS);
      }
    );
  };

  retryTimeout = setTimeout(try_run, retryTimeoutMS);
};

const stop_builder = () => {
  // kill child

  if (processWatcher == null) return;

  processWatcher.kill();
  processWatcher = null;
};

const delete_pdf = () => {
  fs.unlink(State.getPdfFilePath(), (_) => {
    return;
  });
};

const init = () => {
  run_builder();
};

module.exports = {
  init,
  run_builder,
  stop_builder,
  delete_pdf,
};
