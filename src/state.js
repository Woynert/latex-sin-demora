class State {
  /*
    Where the .tex source file is
  */
  static texFilePath = "";

  /*
    Where temporary generated files will be placed
  */
  static outDir = "";

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
}
module.exports = {
  State,
};
