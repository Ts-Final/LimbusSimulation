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

function del(index: number) {
  Skill.del(index)
  fuck()
}
</script>

<template>
  <div v-if="display" class="SL-wrapper">
    <div style="text-align:center;">右键以删除。左键即可编辑该技能。</div>
    <div class="SL-new" @click="add">点我新增技能</div>
    <div class="SL-contain">
      <SkillCard
          v-for="[index, skill] in Object.entries(Skill.storage)"
          @click="viewing = index.num()"
          :chosen="computed(() => viewing == index.num())"
          :skill="skill" @contextmenu.prevent="del(index.num())"/>
    </div>
  </div>


</template>

<style scoped>
.SL-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.SL-contain {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
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
</style>