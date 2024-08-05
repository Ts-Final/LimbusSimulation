<script lang="ts" setup>
import {RiskLevel} from "@/core/constants.ts";

const model = defineModel<RiskLevel>()
</script>

<template>
  <select v-model="model">
    <option value="ZAYIN">ZAYIN</option>
    <option value="TETH">TETH</option>
    <option value="HE">HE</option>
    <option value="WAW">WAW</option>
    <option value="ALEPH">ALEPH</option>
    <option value="TARK">T.ARK.</option>
  </select>
</template>

<style scoped>

select {
  line-height: 1.25rem;
  border: none;
  font-size: 1rem;
  border-radius: 0;
  background-color: transparent;
}

option {
  color: #fff;
  background-color: #000000;
}
</style>