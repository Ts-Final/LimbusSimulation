<script lang="ts" setup>

import {CurrentTab, TabName, Tabs} from "../core/ui.ts";
</script>

<template>
  <div class="SB-wrapper">
    <div v-for="tab in Tabs" :class="CurrentTab == tab ? 'chosen' : ''" @click="CurrentTab = tab">
      {{ TabName(tab) }}
    </div>
  </div>

</template>

<style scoped>
.SB-wrapper {
  width: 10vw;
  display: flex;
  flex-direction: column;

}

.SB-wrapper > div {
  border-right: 1px solid #7cdcf4;
  border-bottom: 1px solid #7cdcf4;
  text-align: center;
  line-height: 3rem;
  cursor: pointer;
  user-select: none;
  transition: all 0.3s linear;
}

.chosen {
  border-left: 5px solid #7cdcf4;
}
</style>