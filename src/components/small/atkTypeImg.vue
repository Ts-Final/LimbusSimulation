<script lang="ts" setup>
import {AttackType} from "../../core/constants.ts";

const {atkType} = defineProps<{ atkType: AttackType }>()
</script>

<template>
  <img v-if="atkType == 'slash'" alt="" src="../../assets/icons/slash.png">
  <img v-else-if="atkType == 'blunt'" alt="" src="../../assets/icons/blunt.png">
  <img v-else alt="" src="../../assets/icons/pierce.png">
</template>

<style scoped>

</style>