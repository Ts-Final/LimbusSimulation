<script setup lang="ts">
import {Affinity} from "@/core/constants.ts";
const {affinity} = defineProps<{affinity: Affinity}>()
</script>

<template>
  <img src="../../assets/affinity/wrath.png" alt="" v-if="affinity === 'wrath'">
  <img src="../../assets/affinity/lust.png" alt="" v-else-if="affinity === 'lust'">
  <img src="../../assets/affinity/envy.png" alt="" v-else-if="affinity === 'envy'">
  <img src="../../assets/affinity/pride.png" alt="" v-else-if="affinity === 'pride'">
  <img src="../../assets/affinity/gloom.png" alt="" v-else-if="affinity === 'gloom'">
  <img src="../../assets/affinity/gluttony.png" alt="" v-else-if="affinity === 'gluttony'">
  <img src="../../assets/affinity/sloth.png" alt="" v-else>
</template>

<style scoped>

</style>