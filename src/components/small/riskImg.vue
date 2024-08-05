<script setup lang="ts">
import {RiskLevel} from "@/core/constants.ts";

const {riskLevel} = defineProps<{riskLevel: RiskLevel}>()
</script>

<template>
  <img draggable="false" src="../../assets/risk/ZAYIN.png" alt="" v-if="riskLevel == 'ZAYIN'">
  <img draggable="false" src="../../assets/risk/TETH.png" alt="" v-else-if="riskLevel == 'TETH'">
  <img draggable="false" src="../../assets/risk/HE.png" alt="" v-else-if="riskLevel == 'HE'">
  <img draggable="false" src="../../assets/risk/WAW.png" alt="" v-else-if="riskLevel == 'WAW'">
  <img draggable="false" src="../../assets/risk/ALEPH.png" alt="" v-else-if="riskLevel == 'ALEPH'">
  <img draggable="false" src="../../assets/risk/TARK.png" alt="" v-else-if="riskLevel == 'TARK'">
</template>

<style scoped>

</style>