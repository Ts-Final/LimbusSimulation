<script setup lang="ts">
import UnitEdit from "./components/Edit/UnitEdit.vue";
import FaultLiesYouIshmael from "./components/FaultLiesYouIshmael.vue";
</script>

<template>
  <UnitEdit/>
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
