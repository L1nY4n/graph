import { LGraphCanvas } from "litegraph.js";

function onDropItem(e,graph) {
  for (var i = 0; i < e.dataTransfer.files.length; ++i) {
    var file = e.dataTransfer.files[i];
    var ext = LGraphCanvas.getFileExtension(file.name);
    var reader = new FileReader();
    if (ext == "json") {
      reader.onload = function (event) {
        var data = JSON.parse(event.target.result);
        graph.configure(data);
      };
      reader.readAsText(file);
    }
  }
}
function goFullscreen(root) {
  if (root.requestFullscreen) {
    root.requestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  } else if (root.mozRequestFullscreen) {
    root.requestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  } else if (root.webkitRequestFullscreen) {
    root.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  } else {
    throw "Fullscreen not supported";
  }
}

export {
  onDropItem,
  goFullscreen,
};
