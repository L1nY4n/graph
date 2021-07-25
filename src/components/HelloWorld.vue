<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="state.count++">
    count is: {{ state.count }}
  </button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
  <canvas id='mycanvas' width='1024' height='720' style='border: 1px solid'></canvas>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import {LiteGraph} from 'litegraph.js'
defineProps({
  msg: String
})

const state = reactive({ count: 0 })


var graph = new LiteGraph.LGraph();

var canvas = new LiteGraph.LGraphCanvas("#mycanvas", graph);

var node_const = LiteGraph.createNode("basic/const");
node_const.pos = [200,200];
graph.add(node_const);
node_const.setValue(4.5);

var node_watch = LiteGraph.createNode("basic/watch");
node_watch.pos = [700,200];
graph.add(node_watch);

node_const.connect(0, node_watch, 0 );
graph.start()
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
