<script lang="ts" setup>
import {ref} from 'vue';
import EgoAwakening from "./EgoAwakening.vue";
import EgoCorrosion from "./EgoCorrosion.vue";
import EgoList from "./EgoList.vue";
import EgoBase from "./EgoBase.vue";

/*const rotating = ref(false)

function rotate() {
  if (rotating.value) {
    rotating.value = false
    return
  }
  if (confirm("你也要起舞吗？")) {
    rotating.value = true
  }
}*/

const viewing = ref('list')
</script>

<template>
  <div class="ET-wrapper">
    <div class="ET-right">
      <div class="ET-chooser">
        <div :class="viewing == 'list'? 'ET-chosen' :''" @click="viewing = 'list'">EGO列表</div>
        <div :class="viewing == 'base'? 'ET-chosen' :''" @click="viewing = 'base'">基础信息</div>
        <div :class="viewing == 'awakening'? 'ET-chosen' :''" @click="viewing = 'awakening'">觉醒</div>
        <div :class="viewing == 'corrosion'? 'ET-chosen' :''" @click="viewing = 'corrosion'">侵蚀</div>

      </div>
      <EgoList v-if="viewing == 'list'"/>
      <EgoBase v-if="viewing == 'base'"/>
      <EgoAwakening v-if="viewing == 'awakening'"/>
      <EgoCorrosion v-if="viewing == 'corrosion'"/>

    </div>
  </div>
</template>

<style scoped>
.ET-wrapper {
  display: flex;
  position: absolute;
  height: 100%;
  left: 10vw;
  width: 90vw;
  top: 0;
  padding: 5px;
}

.ET-Snagharpoon {
  width: 40%;
  background-image: url("../../assets/Snagharpoon.png");
  background-size: 100%;
  height: 36vw;

  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  border-radius: 50%;
  top: calc(50vh - 18vw);
  border: 2px solid rgb(249, 197, 1);
}

.ET-Snagharpoon-rotating {
  animation: a-Snagharpoon-rotate 1s infinite linear;
}

@keyframes a-Snagharpoon-rotate {
  0% {
    transform: rotate3d(0, 1, 0, 0deg) translateY(-20px);
  }
  25% {
    transform: rotate3d(0, 1, 0, 90deg) translateY(0px);
  }
  50% {
    transform: rotate3d(0, 1, 0, 180deg) translateY(20px);
  }
  75% {
    transform: rotate3d(0, 1, 0, 270deg) translateY(0px);
  }
  100% {
    transform: rotate3d(0, 1, 0, 360deg) translateY(-20px);
  }
}

.ET-right {
  position: absolute;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.ET-chooser {
  width: 100%;
  top: 3px;
  height: 70px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-top: 5px;
  padding-left: 5px;
}

.ET-chooser > div {
  width: 160px;
  height: 45px;

  border: rgb(90, 0, 0) 3px solid;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  background-color: rgb(15, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s linear;

  font-size: 1.25rem;
  color: white;
  cursor: pointer;
  user-select: none;
}

.ET-chooser > div:hover {
  border-color: rgb(249, 197, 1);
  border-width: 3px;
  background-color: rgb(64, 20, 0);
}

.ET-chosen {
  border-color: rgb(249, 197, 1) !important;
  border-width: 3px;
  background-color: rgb(63, 26, 3) !important;
}
</style>