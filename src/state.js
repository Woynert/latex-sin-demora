const { resolve } = require("path");

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
  static outDir = ".cache/latexmk/";

  /*
    Whether to interrupt or continue building
  */
  static isBuildActive = true;

  /*
    Milliseconds to wait before refreshing pdf
  */
  static checkPdfUpdatesMS = 2000;

  static getPdfFilePath = () => {
    return resolve(
      State.texFilePath,
      "../.cache/latexmk/",
      State.pdfFileName + ".pdf"
    );
  };
}

module.exports = {
  State,
};
