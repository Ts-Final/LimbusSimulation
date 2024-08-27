<script setup lang="ts">

const props = defineProps<{lw?: number}>()
const gtc = (props.lw ?? 50) + "fr " + (100 - (props.lw ?? 50)) + "fr"
</script>

<template>
  <div class="split-wrapper">
      <slot name="l"></slot>
      <slot name="r"></slot>
  </div>
</template>

<style scoped>
.split-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

@media screen and (min-width: 1280px) {
  .split-wrapper {
    display: grid;
    grid-template-columns: v-bind(gtc);
    gap: 5px;
  }
}
@media screen and (max-width: 1280px){
  .split-wrapper {
    display: flex;
    flex-direction: column;
  }
}
</style>