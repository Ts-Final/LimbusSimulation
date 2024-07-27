<script setup lang="ts">
import {Affinity} from "../../core/constants.ts";

const affinity = defineModel<Affinity>()
</script>

<template>
  <select class="EA-s-affinity" v-model="affinity">
    <option value="Wrath">暴怒！</option>
    <option value="Lust">色欲</option>
    <option value="Gluttony">暴食</option>
    <option value="Sloth">怠惰</option>
    <option value="Gloom">忧郁！</option>
    <option value="Pride">傲慢！</option>
    <option value="Envy">嫉妒！</option>
  </select>
</template>

<style scoped>

select {
  line-height: 1.25rem;
  border: none;
  font-size: 1rem;
  border-radius: 0;
}

option {
  color: #fff;
  background-color: #000000;
}
</style>