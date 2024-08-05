<script lang="ts" setup>
import {computed, ref} from "vue";
import {EGO} from "@/core/ego.ts";
import EgoCard from "@/components/EgoEdit/EgoCard.vue";

function deleteEgo(index: number) {
  EGO.del(index)
  fuck()
}

const display = ref(true)
const viewing = EGO.viewing

function fuck() {
  display.value = false
  setTimeout(() => display.value = true, 10)

}

function newEgo() {
  EGO.add()
  fuck()
}
</script>

<template>
  <div v-if="display" class="EL-wrapper">
    <div class="EL-new" @click="newEgo">新增</div>
    <div class="EL-cards">
      <EgoCard
          v-for="[index, data] in Object.entries(EGO.storage)"
          :chosen="computed(() => viewing == index.num())"
          :ego="data"
          @click="viewing = index.num()" @contextmenu.prevent="deleteEgo(index.num())"/>
    </div>

  </div>


</template>

<!--suppress SpellCheckingInspection -->
<style scoped>
* :not(span) {
  user-select: none;
}

.EL-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: min-content;
}

.EL-cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.EL-new {
  cursor: pointer;
  user-select: none;
  line-height: 2rem;
  border: 2px solid #7cdcf4;
  width: 5rem;
  text-align: center;
  vertical-align: center;
  margin-bottom: 5px;
  align-self: center;
}
</style>