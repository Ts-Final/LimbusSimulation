<script lang="ts" setup>
import { computed, ref } from "vue";
import { EGO } from "@/core/ego.ts";
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

function toDragStart(index: number | string) {
  return function (e: DragEvent) {
    e.dataTransfer?.setData("ego/index", index.toString())
  }
}

function dropDelete(e:DragEvent) {
  if (e.dataTransfer) {
    const index = parseInt(e.dataTransfer.getData("ego/index"))
    EGO.del(index)
  }
}
function dropCopy(e:DragEvent) {
  if (e.dataTransfer) {
    const index = parseInt(e.dataTransfer.getData("ego/index"))
    EGO.copy(index)
  }
}
</script>

<template>
  <div v-if="display" class="EL-wrapper">
    <div class="EL-cards">
      <EgoCard v-for="[index, data] in Object.entries(EGO.storage)" draggable="true"
        :chosen="computed(() => viewing == index.num())" @dragstart="e => toDragStart(index)(e)" :ego="data"
        @click="viewing = index.num()" @contextmenu.prevent="deleteEgo(index.num())" />
    </div>
    <div class="EL-table">
      <div>
        将EGO卡片拖动至下列按钮。
      </div>
      <div @dragover.prevent @drop="dropCopy">
        复制
      </div>
      <div @dragover.prevent @drop="dropDelete">
        删除
      </div>
      <div @click="newEgo" style="cursor: pointer;">
        新增
      </div>
    </div>
  </div>
</template>

<style scoped>
* :not(span) {
  user-select: none;
}

.EL-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: min-content;
}

.EL-cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  width: 80%;
  padding: 5px;
  height: min-content;
  gap: 4px;
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

.EL-table {
  display: flex;
  flex-direction: column;
  width: 15%;
  text-align: center;
  border-top: 2px solid #7cdcf4;
  border-left: 2px solid #7cdcf4;
  height: min-content;
}

.EL-table>div {
  border-right: 2px solid #7cdcf4;
  border-bottom: 2px solid #7cdcf4;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>