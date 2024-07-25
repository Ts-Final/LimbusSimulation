<script lang="ts" setup>

import {FaultLiesYouIshmael} from "../../core/utils/faultLiesYouIshmael.ts";
import {ref} from "vue";
import UnitGeneral from "./UnitGeneral.vue";
import UnitBase from "./UnitBase.vue";
import UnitSkill from "./UnitSkill.vue";
import UnitList from "./UnitList.vue";

const viewing = ref("list")
</script>

<template>
  <div class="UT-wrapper">
    <div class="UT-Ishmael" @click="FaultLiesYouIshmael.play()"/>
    <div class="UT-right">
      <div class="ET-chooser">
        <div @click="viewing = 'list'">人格列表</div>
        <div @click="viewing = 'general'">总览</div>
        <div @click="viewing = 'base'">基础数值</div>
        <div @click="viewing = 'skill'">技能</div>
        <div @click="viewing = 'ego'">E!G!O!</div>
      </div>
      <UnitList v-if="viewing == 'list'"/>
      <UnitGeneral v-else-if="viewing == 'general'"/>
      <UnitBase v-else-if="viewing == 'base'"/>
      <UnitSkill v-else-if="viewing == 'skill'"/>
    </div>
  </div>
</template>

<style scoped>
.UT-wrapper {
  display: flex;
  position: absolute;
  height: 100%;
  left: 10vw;
  width: 90vw;
  top: 0;
}

.UT-Ishmael {
  position: relative;
  width: 40%;
  height: 100%;
  background-image: url("../../assets/captain.png");
  background-size: cover;
  background-position: -450px 0;
  z-index: 0;
  box-shadow: black 0 0 70px 20px inset;
}

.UT-right {
  position: absolute;
  right: 0;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 2;
  padding-top: 75px;
}

.ET-chooser {
  width: 100%;
  position: absolute;
  top: 3px;
  height: 70px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding-left: 5px;
}

.ET-chooser > div {
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

.ET-chooser > div:hover {
  border-color: rgb(249, 197, 1);
  border-width: 3px;
  background-color: rgb(63, 26, 3);
}
</style>