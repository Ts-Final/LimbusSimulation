<script lang="ts" setup>

import {ref} from "vue";
import IdentityBase from "@/components/Identity/IdentityBase.vue";
import IdentityList from "@/components/Identity/IdentityList.vue";
import IdentityGeneral from "@/components/Identity/IdentityGeneral.vue";
import IdentitySkill from "@/components/Identity/IdentitySkill.vue";
import IdentityEgo from "@/components/Identity/IdentityEgo.vue";

const viewing = ref("list")
</script>

<template>
  <div class="IT-wrapper">
    <div class="IT-right">
      <div class="IT-chooser">
        <div @click="viewing = 'list'"
             :class="viewing == 'list' ? 'IT-chosen':''">人格列表</div>
        <!-- <div @click="viewing = 'general'"
             :class="viewing == 'general' ? 'IT-chosen':''">总览</div> -->
        <div @click="viewing = 'base'"
             :class="viewing == 'base' ? 'IT-chosen':''">基础数值</div>
        <div @click="viewing = 'skill'"
             :class="viewing == 'skill' ? 'IT-chosen':''">技能</div>
        <div @click="viewing = 'ego'"
             :class="viewing == 'ego' ? 'uT-chosen':''">E!G!O!</div>
      </div>
      <IdentityList v-if="viewing == 'list'" />
      <IdentityGeneral v-else-if="viewing == 'general'"/>
      <IdentityBase v-else-if="viewing == 'base'"/>
      <IdentitySkill v-else-if="viewing == 'skill'"/>
      <IdentityEgo v-else />
    </div>
  </div>
</template>

<style scoped>
.IT-wrapper {
  display: flex;
  position: absolute;
  height: 100%;
  left: 10vw;
  width: 90vw;
  top: 0;
  padding: 5px;
}

.IT-right {
  position: absolute;
  width: 100%;
  height: 100%; 
  display: flex;
  flex-direction: column;
  z-index: 2;
  flex-grow: 1;
}

.IT-chooser {
  width: 100%;
  top: 3px;
  height: 70px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  padding-left: 5px;
}

.IT-chooser > div {
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

.IT-chooser > div:hover {
  border-color: rgb(249, 197, 1);
  border-width: 3px;
  background-color: rgb(63, 26, 3);
}

.IT-chosen {
  border-color: rgb(249, 197, 1) !important;
  border-width: 3px;
  background-color: rgb(63, 26, 3) !important;
}
</style>