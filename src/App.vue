<script lang="ts" setup>
import IdentityTab from "@/components/Identity/IdentityTab.vue";
import {CurrentTab} from "@/core/ui.ts";
import SideBar from "@/components/SideBar.vue";
import EgoTab from "@/components/EgoEdit/EgoTab.vue";
import SkillTab from "@/components/skill/SkillTab.vue";
import StartUpTab from "@/components/StartUp/StartUpTab.vue";
import SoundFile from "@/components/Others/SoundFile.vue";
import Sounds from "@/components/Others/Music.vue";
import StageTab from "@/components/Stage/StageTab.vue";
</script>

<template>
  <SideBar/>
  <KeepAlive>
    <Transition>
      <IdentityTab v-if="CurrentTab == 'identity'"/>
      <EgoTab v-else-if="CurrentTab == 'ego'"/>
      <SkillTab v-else-if="CurrentTab == 'skill'"/>
      <Sounds v-else-if="CurrentTab == 'sound'"/>
      <StageTab v-else-if="CurrentTab == 'stage'"/>
      <StartUpTab v-else/>
    </Transition>
  </KeepAlive>
  <div id="notify-container"></div>
  <SoundFile/>
</template>

<style scoped>
#notify-container {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 114514;
  align-items: end;
}
.v-enter-from,
.v-leave-to{
  opacity: 0;
  transform: translateX(25%);
}
.v-enter-active,
.v-leave-active{
  transition: all 0.2s linear;
}
</style>
