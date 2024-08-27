<script setup lang="ts">

const props = defineProps<{ side?: "head" | "tail" }>()
const val = props.side
</script>

<template>
  <span v-if="val == 'head'" class="head">正</span>
  <span v-else-if="val== 'tail'" class="tail">反</span>
  <span v-else>？</span>
</template>

<style scoped>
span {
  font-weight: bold;
}
.head {
  color: #f9c501;
}

.tail {
  color: #b61c1c;
}

</style>