<script setup lang="ts">

import StageSide from "@/components/Stage/StageSide.vue";

import {StageBackend} from "@/core/stage/stageBackend.ts";
import StageField from "@/components/Stage/StageField.vue";
import StageChain from "@/components/Stage/StageChain.vue";

const ui = StageBackend.ui
</script>

<template>
  <div class="stage-wrapper">
    <StageSide v-if="ui.state == 'pre-stage'"/>
    <StageField v-else-if="ui.state == 'chaining'"/>
    <StageChain v-else />
  </div>
</template>

<style scoped>
.stage-wrapper {
  position: absolute;
  left: 10vw;
  width: 90vw;
  height: 100%;

}
</style>