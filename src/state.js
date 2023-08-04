const path = require("path");

class State {
  /*
    Where the .tex source file is
  */
  static texFilePath = "";

  /*
    Generated pdf filename
  */
  static pdfFileName = "tmp";

  /*
    Where temporary generated files will be placed
  */
  static outDir = "/tmp/.cache/latexmk/";

  /*
    Build command
  */
  static buildCmd = "";

  /*
    Whether to interrupt or continue building
  */
  static isBuildActive = false;

  /*
    Last scroll position to be restored
  */
  static scrollPosition = 0;

  static getPdfFilePath = () => {
    return path.join(State.outDir, State.pdfFileName + ".pdf");
  };
}

module.exports = {
  State,
};
