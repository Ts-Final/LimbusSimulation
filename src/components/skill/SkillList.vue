<script lang="ts" setup>
import {computed, ref} from "vue";
import {Skill} from "@/core/skill.ts";
import SkillCard from "@/components/skill/SkillCard.vue";

const display = ref(true)
const viewing = Skill.viewing

function fuck() {
  display.value = false
  setTimeout(() => display.value = true, 50)
}

function add() {
  Skill.add()
  fuck()
}

function toDragStart(index: number | string) {
  return function (e: DragEvent) {
    e.dataTransfer?.setData("skill/index", index.toString())
  }
}

function dropDelete(e:DragEvent) {
  if (e.dataTransfer) {
    const index = parseInt(e.dataTransfer.getData("skill/index"))
    Skill.del(index)
    fuck()
  }
}
function dropCopy(e:DragEvent) {
  if (e.dataTransfer) {
    const index = parseInt(e.dataTransfer.getData("skill/index"))
    Skill.copy(index)
    fuck()
  }
}
</script>

<template>
  <div v-if="display" class="SL-wrapper">
    <div class="SL-contain">
      <SkillCard
          v-for="[index, skill] in Object.entries(Skill.storage)"
          @click="viewing = index.num()" draggable="true"
          @dragstart="e => toDragStart(index.num())(e)"
          :chosen="computed(() => viewing == index.num())"
          :skill="skill"/>
    </div>
    <div class="SL-table">
      <div>
        操作台
        <br>
        将卡拖至按钮
      </div>
      <div @drop="dropDelete" @dragover.prevent style="cursor:move;">
        删除
      </div>
      <div @drop="dropCopy" @dragover.prevent style="cursor: move;">
        复制
      </div>
      <div @click="add" style="cursor: pointer;">
        新增
      </div>
    </div>
  </div>


</template>

<style scoped>
.SL-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.SL-contain {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 80%;
  padding: 2px;
}

.SL-card {
  width: 200px;
  height: auto;
  display: flex;
  flex-direction: column;
  border: #7cdcf4 2px solid;
  align-items: center;
  margin: 10px;
  cursor: pointer;
}

.SL-atk-div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 2px;
  align-items: center;
  justify-content: center;
}

.SL-chosen-card {
  border: #f7f12c 2px solid;
  box-shadow: #bbb516 0 0 5px 5px;
}

.SL-new {
  cursor: pointer;
  user-select: none;
  border: #b8dcee 2px solid;
  line-height: 1.6rem;
  width: 10rem;
  text-align: center;
}
.SL-table {
  display: flex;
  flex-direction: column;
  width: 15%;
  text-align: center;
  border-top: 2px solid #7cdcf4;
  border-left: 2px solid #7cdcf4;
  height: min-content;
}

.SL-table>div {
  border-right: 2px solid #7cdcf4;
  border-bottom: 2px solid #7cdcf4;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>