<script lang="ts" setup>
import FaultLiesYouIshmael from "./components/FaultLiesYouIshmael.vue";
import UnitTab from "./components/UnitEdit/UnitTab.vue";
import SideBar from "./components/SideBar.vue";
import {CurrentTab} from "./core/ui.ts";
import StartUpTab from "./components/StartUp/StartUpTab.vue";
import EgoTab from "./components/EgoEdit/EgoTab.vue";
</script>

<template>
  <SideBar/>
  <StartUpTab v-if="CurrentTab == 'startUp'"/>
  <UnitTab v-if="CurrentTab == 'unit'"/>
  <EgoTab v-if="CurrentTab == 'ego'" />
  <div id="notify-container"></div>
  <FaultLiesYouIshmael/>
</template>

<style scoped>
#notify-container {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 100;
}
</style>
