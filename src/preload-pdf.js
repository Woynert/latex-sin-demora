module.exports.init = () => {
  const viewer = document.getElementById("pdf-viewer");

  // TODO: get file from state
  var filePath = "./sample-pdf.pdf";
  filePath = "../../../" + filePath;

  // User viewer on iframe
  viewer.src =
    "./lib/pdfjs/web/viewer.html?file=" + encodeURIComponent(filePath);
};
