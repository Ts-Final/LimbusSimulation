<script setup lang="ts">
import {RiskLevel} from "../../core/constants.ts";

const {riskLevel} = defineProps<{riskLevel: RiskLevel}>()
</script>

<template>
  <img src="../../assets/risk/ZAYIN.png" alt="" v-if="riskLevel == 'ZAYIN'">
  <img src="../../assets/risk/TETH.png" alt="" v-else-if="riskLevel == 'TETH'">
  <img src="../../assets/risk/HE.png" alt="" v-else-if="riskLevel == 'HE'">
  <img src="../../assets/risk/WAW.png" alt="" v-else-if="riskLevel == 'WAW'">
  <img src="../../assets/risk/ALEPH.png" alt="" v-else-if="riskLevel == 'ALEPH'">
  <img src="../../assets/risk/TARK.png" alt="" v-else-if="riskLevel == 'TARK'">


</template>

<style scoped>

</style>