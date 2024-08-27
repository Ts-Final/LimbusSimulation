<script lang="ts" setup>

import {ref} from "vue";
import SkillBase from "@/components/skill/SkillBase.vue";
import SkillList from "@/components/skill/SkillList.vue";
import {sound} from "@/core/sound.ts";

const viewing = ref("list")

const rotating = ref(false)

function rotate() {
  if (rotating.value) {
    rotating.value = false
    return
  }
  if (confirm("你也要起舞吗？")) {
    rotating.value = true
    sound.snap.play()
  }
}
</script>

<template>
  <div class="ST-wrapper">
    <img src="../../assets/Angela.png" class="ST-Angela" alt="" @click="rotate" :class="rotating ? 'ST-rotate':''"/>
    <div class="ST-right">
      <div class="ST-chooser">
        <div :class="viewing == 'list' ? 'ST-chosen':''"
             @click="viewing = 'list'">技能列表
        </div>
        <div :class="viewing == 'base' ? 'ST-chosen':''"
             @click="viewing = 'base'">基础数值
        </div>
      </div>
      <SkillList v-if="viewing == 'list'"/>
      <SkillBase v-if="viewing == 'base'"/>
    </div>
  </div>
</template>

<style scoped>
.ST-wrapper {
  display: flex;
  position: absolute;
  height: 100%;
  left: 10vw;
  width: 90vw;
  top: 0;
  flex-direction: row;
  transition: all 0.1s linear;
}
.ST-rotate {
  animation: a-ST-rotating 1s linear infinite forwards;
  user-select: none;
}

@keyframes a-ST-rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.ST-Angela {
  position: relative;
  bottom: 0;
  z-index: 0;
  transform: rotateY(180deg);
  user-select: none;

}

.ST-right {
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 2;
  padding-top: 75px;
  flex-grow: 1;
}

.ST-chooser {
  width: 100%;
  position: absolute;
  top: 3px;
  height: 70px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding-left: 5px;
}

.ST-chooser > div {
  width: 160px;
  height: 45px;

  border: rgb(100, 65, 35) 3px solid;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  background-color: rgb(18, 9, 4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s linear;

  font-size: 1.25rem;
  color: white;
  cursor: pointer;
  user-select: none;
}

.ST-chooser > div:hover {
  border-color: rgb(249, 197, 1);
  border-width: 3px;
  background-color: rgb(63, 26, 3);
}

.ST-chosen {
  border-color: rgb(249, 197, 1) !important;
  border-width: 3px;
  background-color: rgb(63, 26, 3) !important;
}
</style>