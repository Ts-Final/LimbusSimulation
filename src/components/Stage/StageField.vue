<script setup lang="ts">
import {StageBackend} from "@/core/stage/stageBackend.ts";
import StageCard from "@/components/Stage/StageCard.vue";

const ui = StageBackend.ui
</script>

<template>
  <div class="SF-wrapper">
    <div class="SF-op-w">
      <div class="SF-operator">
        <div style="display:flex; justify-content: space-evenly;">
          <span>Wave:{{ ui.wave }}</span>
          <span>Turn:{{ui.turn}}</span>
        </div>
        <div @click="ui.switch('pre-stage')" class="pointer">
          结束战斗
        </div>
        <div @click="StageBackend.runChain" class="pointer">
          开打！
        </div>
      </div>
    </div>
    <div class="SF-side-wrapper">
      <div class="SF-side">
        <StageCard :unit="u" v-for="u in StageBackend.sideA.sort((a,b) => a.speed - b.speed)"/>
      </div>
      <div class="SF-side" style="direction: ltr">
        <StageCard :unit="u" v-for="u in StageBackend.sideE.sort((a,b) => a.speed - b.speed)"/>
      </div>
    </div>

  </div>

</template>

<style scoped>
.SF-wrapper {
  width: 100%;
  height: 100%;
  position: relative;

}
div {
  position: relative;
}
.SF-op-w {
  position: relative;
  left: 50%;
  min-width: 300px;
  transform: translateX(-50%);
  max-width: 500px;
  user-select: none;
}
.pointer {
  cursor: pointer;
}
.SF-side-wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.SF-side {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  direction: rtl;
  padding: 1.5rem 5px;
  height: 90%;
  top: 5%;
  align-items: flex-end;
}
.SF-operator {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  border-top: 2px solid #7cdcf4;
  border-left:  2px solid #7cdcf4;
}
.SF-operator > div {
  border-right:  2px solid #7cdcf4;
  border-bottom: 2px solid #7cdcf4;
  width: 100%;
  text-align: center;
}
</style>