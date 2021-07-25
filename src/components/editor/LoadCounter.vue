<template>
  <div class="headerpanel loadmeter toolbar-widget">
    <div class="cpuload">
      <strong>CPU</strong>
      <div class="bgload">
        <div class="fgload" :style="{ width: `${execution_time}px` }"></div>
      </div>
    </div>
    <div class="gpuload">
      <strong>GFX</strong>
      <div class="bgload">
        <div class="fgload" :style="{ width: `${render_time}px` }"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["execution_time", "render_time"],
};
</script>

<style lang='less'>
.headerpanel{
  text-align: left;
  strong {
    vertical-align: top ;
  }
}
</style>