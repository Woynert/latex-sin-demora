// init all scripts

window.addEventListener("DOMContentLoaded", () => {
  require("./preload-term").init();
  require("./preload-ui").init();
  require("./preload-pdf").init();
});
