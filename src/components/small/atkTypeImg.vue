<script lang="ts" setup>
import {AttackType} from "@/core/constants.ts";
import { Ref } from "vue";

const props = defineProps<{ atkType: AttackType|Ref<AttackType>, width?:number|string}>()
const atkType = props.atkType
const width = props.width || '30px'
</script>

<template>
  <img draggable="false" v-if="atkType == 'slash'" alt="斩击" src="../../assets/icons/slash.png">
  <img draggable="false" v-else-if="atkType == 'blunt'" alt="打击" src="../../assets/icons/blunt.png">
  <img draggable="false" v-else alt="穿刺" src="../../assets/icons/pierce.png">
</template>

<style scoped>
img {
  max-width: v-bind(width);
}
</style>