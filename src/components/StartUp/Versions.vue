<script setup lang="ts">
import {Versions} from "@/core/versions.ts";

function parseDate(date: Date) {
  return date.toLocaleDateString("zh-CN")
}

const v = defineModel<boolean>()
</script>

<template>
  <!--  <div class="version-wrapper" v-if="v">-->
  <!--    版本更新日志-->
  <!--    <div style="display:flex;flex-direction: column">-->
  <!--            <div v-for="ver in Versions">-->
  <!--        <div>-->
  <!--          {{ ver.name }}-->
  <!--        </div>-->
  <!--        <div>-->
  <!--          {{ parseDate(ver.date) }}-->
  <!--        </div>-->
  <!--        <div>-->
  <!--          <div v-for="con in ver.content" v-html="con"></div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--  </div>-->
  <teleport to="body">
    <div v-if="v" class="version-wrapper">
      <div class="version-container">
        <div class="version-close flex-center" @click="v = false">
          &times;
        </div>
        <div class="version-header">
          版本更新日志（？
        </div>
        <div class="version-content">
          <div v-for="ver in Versions.toReversed()" class="version-inner">
            <div class="name">
              {{ ver.name }}
              <span class="date">
              {{ parseDate(ver.date) }}
            </span>
            </div>
            <div>
              <div v-for="cont in ver.content" class="version-inner-content">
                {{ cont }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>

</template>

<style scoped>
.version-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000088;
}

.version-container {
  position: absolute;
  left: 20%;
  top: 15%;
  width: 60%;
  height: 70%;
  border: 2px #7cdcf4 solid;
  background-image: linear-gradient(60deg, #0d1418 0%, #11161b 100%);
}

.version-close {
  position: absolute;
  top: 5px;
  right: 5px;
  border: 2px solid #7cdcf4;
  background-color: #11161b;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  user-select: none;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.1s linear;
  z-index: 999;
}

.version-close:hover {
  border: 2px solid #7cdcf4;
  background-color: #7cdcf4;
  color: #11161b;
}

.version-header {
  position: relative;
  top: 5px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.version-content {
  position: relative;
  height: calc(100% - 2rem - 10px);
  overflow-y: scroll;
  margin: 5px;
  text-align: left;
  font-size: 1rem;
  color: #7cdcf4;
  padding-left: 5px;

}

.version-inner {
  margin-bottom: 15px;
}

.version-inner-content {
  padding-left: 10px;
}

.name {
  line-height: 2rem;
  font-size: 1.5rem;
}

.date {
  opacity: 0.7;
  font-size: 1rem;
}

a {
  color: #b8dcee;
}

div {
  position: relative;
}

* {
  line-height: 1.4rem;
}
</style>