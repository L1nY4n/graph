<template>
  <button class="btn" @click="click">
    {{ name }}
    <img :src="src" :alt="src" />
  </button>
</template>

<script>
import { ref, toRefs, } from "vue";

export default {
  props: {
    name: String,
    icon: String
  },
  setup(props, { emit }) {
    const { name,icon } = props
    const imgUrl = new URL(`./imgs/${icon}.png`, import.meta.url);
    return { name, src: imgUrl, click: ()=>emit("click") };
  },
};
</script>

<style lang='less'>
.btn {
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
  img {
    margin: -4px;
    vertical-align: top;
    opacity: 0.8;
    transition: all 1s;
  }
  &:hover {
    background-color: #999;
    color: #fff;
    transition: all 1s;
    img {
      opacity: 1;
    }
  }
  &:active {
    background-color: white;
  }
  &.fixed {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 1.2em;
  }
}
</style>
