const { execFile } = require("node:child_process");
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
  if (retryTimeout != null) {
    console.error("Builder is already running.");
    return;
  }

  // try to run as long as State.isBuildActive is true

  const try_run = () => {
    console.log("Running builder...");
    processWatcher = execFile("latexmk", getOpts(), (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      }

      console.log(stdout);

      // try again

      if (State.isBuildActive)
        retryTimeout = setTimeout(try_run, retryTimeoutMS);
    });
  };

  retryTimeout = setTimeout(try_run, retryTimeoutMS);
};

const stop_builder = () => {
  // kill child

  if (processWatcher == null) return;

  processWatcher.kill();
  processWatcher = null;

  // kill retry interval

  if (retryTimeout == null) return;

  clearTimeout(retryTimeout);
  retryTimeout = null;
};

const init = () => {};

module.exports = {
  init,
  run_builder,
  stop_builder,
};
