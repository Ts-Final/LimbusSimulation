<script lang="ts" setup>
import {Identity} from "@/core/identity.ts";
import {notify} from "@/core/utils.ts";
import {Skill} from "@/core/skill.ts";
import Times from "@/components/small/times.vue";
import {computed, ref} from "vue";
import SkillCard from "@/components/skill/SkillCard.vue";

const editor = Identity.editor

function wheel(i: number) {
  return function (e: WheelEvent) {
    const data = editor.value.skill.find(x => x[0] == i)
    if (!data) return

    if (e.deltaY > 0) {
      if (total() == 1) {
        notify.error("技能组里边没有可刷新的技能啦！", 1000)
        return
      }
      data[1] = Math.max(data[1] - 1, 0)
    } else {
      data[1] = data[1] + 1
    }
  }
}

function dragStart(i: number) {
  return function (e: DragEvent) {
    if (equipped.value.includes(i)) {
      notify.error("你已经装备这个技能啦！", 1000)
    }
    if (e.dataTransfer) e.dataTransfer.setData("skill/index", i.toString())
  }
}

function prevent(e: Event) {
  e.preventDefault()
}

function drop(e: DragEvent) {
  if (e.dataTransfer) {
    const index = parseInt(e.dataTransfer.getData("skill/index"))
    if (editor.value.skill.map(x => x[0]).includes(index)) {
      notify.error("你已经携带这个技能啦！", 1000)
      return
    }
    editor.value.skill.push([index, 1])
  }
}

function total() {
  return editor.value.skill.map(x => x[1]).reduce((x, y) => x + y,0)
}

function unEquip(idx: number) {
  if (editor.value.skill.length == 1) {
    notify.error("至少保留一个技能！", 1000)
    return
  }
  editor.value.skill = editor.value.skill.filter(x => x[0] != idx)
  fuck()
}

const equipped = computed(() => editor.value.skill.map(x => x[0]))

function at(index: number) {
  return Skill.index(index)
}

const display = ref(true)
function fuck() {
  display.value = false
  setTimeout(() => display.value = true, 1)

}
</script>

<template>
  <div class="IS-wrapper" v-if="display">
    <div class="IS-container IS-equipped" @dragover="prevent" @drop="drop">
      <SkillCard
          v-for="[index, count] in editor.skill"
          :skill="at(index)"
          draggable="true"
          @wheel.passive="e => wheel(index)(e)"
          @contextmenu.prevent="unEquip(index)">
        <div>
          <times/>
          {{ count }}
        </div>
      </SkillCard>
    </div>
    <div class="IS-container">
      <template v-for="[index, skill] in Object.entries(Skill.storage)">
        <SkillCard v-if="!equipped.includes(index.num())"
                   :class="skill.affinity"
                   :skill="skill"
                   draggable="true"
                   @dragstart="e => dragStart(Number(index))(e)"/>
      </template>
    </div>
  </div>
</template>

<style scoped>
.IS-wrapper {
  width: 100%;
}

.IS-card {
  width: 200px;
  height: auto;
  display: flex;
  flex-direction: column;
  border: #7cdcf4 2px solid;
  align-items: center;
  margin: 10px;
  cursor: pointer;
  user-select: none;
}

.IS-atk-div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 2px;
  align-items: center;
  justify-content: center;
}

.IS-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2px;
  margin: 5px;
}

.IS-equipped {
  border: 2px solid #f7f12c;
}

.IS-chosen-card {
  border: #f7f12c 2px solid;
  box-shadow: #bbb516 0 0 5px 5px;
}
</style>