<script lang="ts" setup>
import IdentityTab from "@/components/Identity/IdentityTab.vue";
import {CurrentTab} from "@/core/ui.ts";
import SideBar from "@/components/SideBar.vue";
import EgoTab from "@/components/EgoEdit/EgoTab.vue";
import SkillTab from "@/components/skill/SkillTab.vue";
import StartUpTab from "@/components/StartUp/StartUpTab.vue";
</script>

<template>
  <SideBar/>
  <IdentityTab v-if="CurrentTab == 'identity'"/>
  <EgoTab v-else-if="CurrentTab == 'ego'"/>
  <SkillTab v-else-if="CurrentTab == 'skill'"/>
  <StartUpTab v-else/>
  <div id="notify-container"></div>
</template>

<style scoped>
#notify-container {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 114514;
}
</style>
