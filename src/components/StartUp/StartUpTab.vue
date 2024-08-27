<script lang="ts" setup>

import StartQA from "./StartQA.vue";
import {ref} from "vue";
import Versions from "@/components/StartUp/Versions.vue";

const QA = ref(false)
const version = ref(false)
</script>

<template>
  <div class="SU-wrapper">
    <div class="SU-terminal-flow!">
      Terminal Flow!
    </div>
    <div class="SU-title">
      边狱巴士编辑器。
    </div>
    <div class="SU-QAer flex-center" @click="QA = true">
      查看QA（荐·新·看）
    </div>
    <StartQA v-model="QA"/>
    <div class="SU-version flex-center" @click="version = true">
      版本更新日志
    </div>
    <Versions v-model="version"/>
    <div class="SU-qq">
      有建议可加群！(962500987)
    </div>
    <div class="SU-github">
      <a href="https://github.com/Ts-Final/LimbusSimulation">Github仓库页面</a>
    </div>
  </div>
</template>

<style scoped>
.SU-wrapper {
  left: 10vw;
  width: 90vw;
  top: 0;
  position: absolute;
  height: 100%;
}
.SU-version {
  position: relative;
  top: 27rem;
  left: calc(50% - 5rem);
  width: 10rem;
  height: 2.5rem;
  box-sizing: border-box;
  border: #7cdcf4 2px solid;
  cursor: pointer;
}
.SU-terminal-flow\! {
  position: relative;
  font-size: 1.5em;
  font-weight: bold;
  color: #b8dcee;
  text-align: center;
  top: 10rem;
}

.SU-title {
  position: relative;
  top: 15rem;
  text-align: center;
  font-size: 3rem;
}

.SU-QAer {
  position: relative;
  top: 20rem;
  text-align: center;
  font-size: 1.2rem;
  width: 15rem;
  height: 3rem;
  border: 2px solid #7cdcf4;
  cursor: pointer;
  color: #b8dcee;
  left: calc(50% - 7.5rem);
}

.SU-qq {
  position: relative;
  top: 30rem;
  text-align: center;
}

.SU-github {
  position: absolute;
  bottom: 15%;
  align-self: center;
  text-align: center;
  width: 100%;
}
</style>