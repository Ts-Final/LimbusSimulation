<script setup lang="ts">
import {Affinity} from "@/core/constants.ts";

const affinity = defineModel<Affinity>()
</script>

<template>
  <select class="EA-s-affinity" v-model="affinity">
    <option value="wrath">暴怒！</option>
    <option value="lust">色欲</option>
    <option value="gluttony">暴食</option>
    <option value="sloth">怠惰</option>
    <option value="gloom">忧郁！</option>
    <option value="pride">傲慢！</option>
    <option value="envy">嫉妒！</option>
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