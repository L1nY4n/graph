import { ref } from "vue";
import { LGraph } from "litegraph.js";
export default function loadCount(graph,graphcanvas) {
    const execution_time = ref(0);
    const render_time = ref(4);

  

    return {
      execution_time,
      render_time,
    };
}