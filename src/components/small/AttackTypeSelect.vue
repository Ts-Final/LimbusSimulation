<script setup lang="ts">

import {AttackType} from "@/core/constants.ts";

const ATKType = defineModel<AttackType>()
</script>

<template>
  <select class="US-s-atkType" v-model="ATKType">
    <option value="pierce">
      穿刺
    </option>
    <option value="blunt">
      打击
    </option>
    <option value="slash">
      斩击
    </option>
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