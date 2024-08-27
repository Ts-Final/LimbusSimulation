<script lang="ts" setup>

import {Identity} from "@/core/identity.ts";
import {computed, ref} from "vue";
import IdentityCard from "./IdentityCard.vue";

const viewing = Identity.viewing


function deleteUnit(event: DragEvent) {
  const index = event.dataTransfer?.getData("identity")
  if (index) Identity.del(index.num())
  fuck()
}

function copyUnit(event: DragEvent) {
  const index = event.dataTransfer?.getData("identity")
  if (index) Identity.copy(index.num())
  fuck()
}

function newUnit() {
  Identity.add()
  fuck()
}

const display = ref(true)

function fuck() {
  display.value = false
  setTimeout(() => display.value = true, 0)
}

function toDragStart(index: string) {
  return (event: DragEvent) => {
    event.dataTransfer?.setData("identity", index)
  }
}
</script>

<template>
  <div class="IL-wrapper" v-if="display">
    <div class="IL-cards">
      <IdentityCard v-for="[index, identity] in Object.entries(Identity.storage)" @click="viewing = index.num()"
                    :chosen="computed(() => viewing === index.num())"
                    @contextmenu.prevent="Identity.del(index.num());fuck()"
                    @dragstart="e => toDragStart(index)(e)" :key="index"
                    :identity="identity"/>
    </div>
    <div class="IL-table">
      <div>
        操作<br>
        将人格卡拖动至此
      </div>
      <div>
        点击人格卡以编辑
      </div>
      <div @drop="deleteUnit" @dragover.prevent>
        删除
        <br>
        或右键人格卡
      </div>
      <div @drop="copyUnit" @dragover.prevent>
        复制
      </div>
      <div @click="newUnit">
        新增
      </div>
    </div>
  </div>
</template>

<style scoped>
.IL-wrapper {
  width: calc(100% - 10px);
  height: 90%;
  padding: 10px;
  display: flex;
  flex-direction: row;
}

.IL-cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  width: 80%;
  overflow-y: auto;
  padding: 5px;
  height: min-content;
  max-height: 100%;
}

.IL-button {
  cursor: pointer;
  user-select: none;
}

.IL-delete {
  cursor: pointer;
  user-select: none;
  color: red;
  font-size: 1.5rem;
  font-weight: bold;
}

.IL-table {
  display: flex;
  flex-direction: column;
  width: 15%;
  text-align: center;
  border-top: 2px solid #7cdcf4;
  border-left: 2px solid #7cdcf4;
  height: min-content;
}

.IL-table > div {
  border-right: 2px solid #7cdcf4;
  border-bottom: 2px solid #7cdcf4;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>