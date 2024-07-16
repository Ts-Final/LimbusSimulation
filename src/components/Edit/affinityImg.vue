<script setup lang="ts">
import {Affinity} from "../../core/constants.ts";
const {affinity} = defineProps<{affinity: Affinity}>()
</script>

<template>
  <img src="../../assets/affinity/Wrath.png" alt="" v-if="affinity === 'Wrath'">
  <img src="../../assets/affinity/Lust.png" alt="" v-if="affinity === 'Lust'">
  <img src="../../assets/affinity/Envy.png" alt="" v-if="affinity === 'Envy'">
  <img src="../../assets/affinity/Pride.png" alt="" v-if="affinity === 'Pride'">
  <img src="../../assets/affinity/Gloom.png" alt="" v-if="affinity === 'Gloom'">
  <img src="../../assets/affinity/Gluttony.png" alt="" v-if="affinity === 'Gluttony'">
  <img src="../../assets/affinity/Sloth.png" alt="" v-if="affinity === 'Sloth'">
</template>

<style scoped>
img {
  max-width: 1rem;
}
</style>