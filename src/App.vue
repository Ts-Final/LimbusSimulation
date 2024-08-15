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
  <div>
    <audio id="sound-compass" src="src/assets/music/compass.mp3"/>
    <audio id="sound-fly-wings" src="src/assets/music/fly.ogg"/>
    <audio id="sound-between-worlds" src="src/assets/music/BetweenTwoWorlds.ogg"/>
    <audio id="sound-vitamins" src="src/assets/music/Vitamins.mp3"/>
    <audio id="sound-in-hell" src="src/assets/music/InHellWeLive.ogg"/>
    <audio id="sound-xiao" src="src/assets/music/Children%20of%20the%20city.mp3"/>
    <audio id="sound-patches" src="src/assets/music/Patches.mp3"/>
  </div>
</template>

<style scoped>
#notify-container {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 114514;
}
</style>
