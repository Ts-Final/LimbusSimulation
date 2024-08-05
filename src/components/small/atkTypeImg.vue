<script lang="ts" setup>
import {AttackType} from "@/core/constants.ts";

const props = defineProps<{ atkType: AttackType, width?:number|string}>()
const atkType = props.atkType
const width = props.width || '30px'
</script>

<template>
  <img v-if="atkType == 'slash'" alt="斩击" src="../../assets/icons/slash.png">
  <img v-else-if="atkType == 'blunt'" alt="打击" src="../../assets/icons/blunt.png">
  <img v-else alt="穿刺" src="../../assets/icons/pierce.png">
</template>

<style scoped>
img {
  max-width: v-bind(width);
}
</style>