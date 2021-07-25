<template>
  <div class="litegraph litegraph-editor">
    <div class="header">
      <div class="tools tools-left">
        <LoadCounter :execution_time="render_time" :render_time="render_time" />
      </div>
      <div class="tools tools-right">
        <ToolButton
          name="play"
          icon="icon-play"
          @click="start"
          v-if="status == 1"
        />
        <ToolButton name="stop" icon="icon-stop" @click="stop" v-else />
        <ToolButton
          name="step"
          icon="icon-playstep"
          @click="step"
          v-show="status == 1"
        />
        <ToolButton
          name=""
          icon="icon-maximize"
          @click="step"
          v-show="status == 1"
        />
      </div>
    </div>
    <div class="content">
      <div class="editor-area">
        <canvas
          ref="canvas"
          id="canvas"
          class="graphcanvas"
          width="1000"
          height="600"
          tabindex="10"
        ></canvas>
      </div>
    </div>
    <div class="footer">
      <div class="tools tools-left"></div>
      <div class="tools tools-right"></div>
    </div>
  </div>
</template>

<script>
import ToolButton from "./ToolButton.vue";
import LoadCounter from "./LoadCounter.vue";

import { LiteGraph } from "litegraph.js";
const { LGraph, LGraphCanvas } = LiteGraph;
import { onDropItem, goFullscreen } from "./editor.js";
import inject from "./nodes";
inject(LiteGraph);
import { ref, onMounted } from "vue";

// reimpelment to fix wheel delta write error
LGraphCanvas.prototype.adjustMouseEvent = function (e) {
  if (this.canvas) {
    var b = this.canvas.getBoundingClientRect();
    e.localX = e.clientX - b.left;
    e.localY = e.clientY - b.top;
  } else {
    e.localX = e.clientX;
    e.localY = e.clientY;
  }

  // const x = e.localX - this.last_mouse_position[0];
  // const y = e.localY - this.last_mouse_position[1];
  // console.log(x,y,e.deltaX,e.deltaY)

  this.last_mouse_position[0] = e.localX;
  this.last_mouse_position[1] = e.localY;

  e.canvasX = e.localX / this.ds.scale - this.ds.offset[0];
  e.canvasY = e.localY / this.ds.scale - this.ds.offset[1];
};

export default {
  components: { ToolButton, LoadCounter },
  setup(props) {
    const graph = new LGraph();
    const status = ref(graph.status);
    const execution_time = ref(0);
    const render_time = ref(4);
    const start = () => {
      console.log("start");
      graph.start();
      status.value = graph.status;
    };
    const stop = () => {
      console.log("stop");
      graph.stop();
      status.value = graph.status;
    };
    const step = () => {
      graph.runStep(1);
      graphcanvas.draw(true, true);
    };
    onMounted(() => {
      const graphcanvas = new LGraphCanvas("#canvas", graph);
      const imgUrl = new URL("./imgs/grid.png", import.meta.url);
      graphcanvas.background_image = imgUrl;
      graphcanvas.onDropItem = (e) => onDropItem(e, graph);
      graph.onAfterExecute = () => {
        graphcanvas.draw(true);
      };
      graphcanvas.resize();
      window.addEventListener("resize", function () {
        console.log("resize");
        graphcanvas.resize();
      });

      setInterval(function () {
        execution_time.value = 2 * graph.execution_time * 90;
        if (graph.status == LGraph.STATUS_RUNNING) {
          render_time.value = graphcanvas.render_time * 10 * 90;
        } else {
          render_time.value = 4;
        }
      }, 200);
    });

    return {
      execution_time,
      render_time,
      status,
      start,
      stop,
      step,
    };
  },
};
</script>

<style lang="less">
.litegraph-editor {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  background-color: #333;
  color: #eee;
  font: 14px Tahoma;

  position: relative;
}

.litegraph-editor h1 {
  font-family: "Metro Light", Tahoma;
  color: #ddd;
  font-size: 28px;
  padding-left: 10px;
  /*text-shadow: 0 1px 1px #333, 0 -1px 1px #777;*/
  margin: 0;
  font-weight: normal;
}

.litegraph-editor h1 span {
  font-family: "Arial";
  font-size: 14px;
  font-weight: normal;
  color: #aaa;
}

.litegraph-editor h2 {
  font-family: "Metro Light";
  padding: 5px;
  margin-left: 10px;
}

.litegraph-editor * {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.litegraph-editor .content {
  position: relative;
  width: 100%;
  height: calc(100% - 80px);
  background-color: #1a1a1a;
}

.litegraph-editor .header,
.litegraph-editor .footer {
  position: relative;
  height: 40px;
  background-color: #333;
  /*border-radius: 10px 10px 0 0;*/
}

.litegraph-editor .tools,
.litegraph-editor .tools-left,
.litegraph-editor .tools-right {
  position: absolute;
  top: 2px;
  right: 0px;
  vertical-align: top;

  margin: 2px 5px 0 0px;
}

.litegraph-editor .tools-left {
  right: auto;
  left: 4px;
}

.litegraph-editor .footer {
  height: 40px;
  position: relative;
  /*border-radius: 0 0 10px 10px;*/
}

.litegraph-editor .miniwindow {
  background-color: #333;
  border: 1px solid #111;
}

.litegraph-editor .miniwindow .corner-button {
  position: absolute;
  top: 2px;
  right: 2px;
  font-family: "Tahoma";
  font-size: 14px;
  color: #aaa;
  cursor: pointer;
}

/* BUTTONS **********************/

.litegraph-editor .btn {
  /*font-family: "Metro Light";*/
  color: #ccc;
  font-size: 20px;
  min-width: 30px;
  /*border-radius: 0.3em;*/
  border: 0 solid #666;
  background-color: #3f3f3f;
  /*box-shadow: 0 0 3px black;*/
  padding: 4px 10px;
  cursor: pointer;
  transition: all 1s;
  -moz-transition: all 1s;
  -webkit-transition: all 0.4s;
}

.litegraph-editor button:hover {
  background-color: #999;
  color: #fff;
  transition: all 1s;
  -moz-transition: all 1s;
  -webkit-transition: all 0.4s;
}

.litegraph-editor button:active {
  background-color: white;
}

.litegraph-editor button.fixed {
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 1.2em;
}

.litegraph-editor button img {
  margin: -4px;
  vertical-align: top;
  opacity: 0.8;
  transition: all 1s;
}

.litegraph-editor button:hover img {
  opacity: 1;
}

.litegraph-editor .header button {
  height: 32px;
  vertical-align: top;
}

.litegraph-editor .footer button {
  /*font-size: 16px;*/
}

.litegraph-editor .toolbar-widget {
  display: inline-block;
}

.litegraph-editor .editor-area {
  width: 100%;
  height: 100%;
}

/* METER *********************/

.litegraph-editor .loadmeter {
  font-family: "Tahoma";
  color: #aaa;
  font-size: 12px;
  border-radius: 2px;
  width: 130px;
  vertical-align: top;
}

.litegraph-editor .strong {
  vertical-align: top;
  padding: 3px;
  width: 30px;
  display: inline-block;
  line-height: 8px;
}

.litegraph-editor .cpuload .bgload,
.litegraph-editor .gpuload .bgload {
  display: inline-block;
  width: 90px;
  height: 15px;
  background-image: url("../editor/imgs/load-progress-empty.png");
}

.litegraph-editor .cpuload .fgload,
.litegraph-editor .gpuload .fgload {
  display: inline-block;
  width: 4px;
  height: 15px;
  max-width: 90px;
  background-image: url("../editor/imgs/load-progress-full.png");
}

.litegraph-editor textarea.code,
.litegraph-editor div.code {
  height: 100%;
  width: 100%;
  background-color: black;
  padding: 4px;
  font: 16px monospace;
  overflow: auto;
  resize: none;
  outline: none;
}

.litegraph-editor .codeflask {
  background-color: #2a2a2a;
}

.litegraph-editor .codeflask textarea {
  opacity: 0;
}
</style>