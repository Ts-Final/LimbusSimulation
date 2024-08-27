<script lang="ts" setup>
import { Identity } from "@/core/identity.ts";
import { notify } from "@/core/utils.ts";
import { Skill } from "@/core/skill.ts";
import Times from "@/components/small/times.vue";
import { computed, ref } from "vue";
import SkillCard from "@/components/skill/SkillCard.vue";
import AffinityImg from "../small/affinityImg.vue";
import { Affinity } from "@/core/constants";

const editor = Identity.editor

function wheel(i: number) {
  return function (e: WheelEvent) {
    const data = editor.value.skill.find(x => x[0] == i)
    if (!data) return

    if (e.deltaY > 0) {
      if (data[1] == 0) {
        notify.error("这个技能已经不刷新啦。", 1000)
      } else if (total() == 1) {
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
function drop2(e: DragEvent) {
  if (e.dataTransfer) {
    const index = parseInt(e.dataTransfer.getData("skill/index"))
    if (index) unEquip(index)
  }
}

function total() {
  return editor.value.skill.map(x => x[1]).reduce((x, y) => x + y, 0)
}

function unEquip(idx: number) {
  if (editor.value.skill.length == 1) {
    notify.error("至少保留一个技能！", 1000)
    return
  }
  // if (total() == 1) {
  //   notify.error("技能组没有可刷新的技能啦！", 1000)
  //   return
  // }
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
function EGOResources(data: Identity) {
  const r: Partial<Record<Affinity, number>> = {}
  for (const [index, count] of data.skill) {
    const skill = Skill.index(index)
    const affinity = skill.affinity
    if (r[affinity] && typeof r[affinity] === 'number') {
      r[affinity] += count
    } else {
      r[affinity] = count
    }
  }
  return r
}
</script>

<template>
  <div class="IS-wrapper" v-if="display">
    <div class="IS-cards">
      <div class="IS-equipped" @dragover="prevent" @drop="drop">
        <SkillCard v-for="[index, count] in editor.skill" :skill="at(index)" @wheel.passive="e => wheel(index)(e)"
          @contextmenu.prevent="unEquip(index)">
          <div>
            <times />
            {{ count }}
          </div>
        </SkillCard>
      </div>
      <div class="IS-container" @drop="drop2" @dragover.prevent>
        <template v-for="[index, skill] in Object.entries(Skill.storage)">
          <SkillCard v-if="!equipped.includes(index.num())" :class="skill.affinity" :skill="skill" draggable="true"
            @dragstart="e => dragStart(Number(index))(e)" />
        </template>
      </div>
    </div>
    <div class="IS-right">
      <div class="IS-right-des">
        技能编辑<br>
        将技能卡拖到上方即可<br>
        右键卸除
      </div>
      <div class="IS-right-title">
        EGO资源
      </div>
      <div class="IS-right-ego">
        <div v-for="([key, value]) in Object.entries(EGOResources(editor))">
          <AffinityImg :affinity="key as Affinity" style="width: 25px;"/>
          &times;{{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.IS-wrapper {
  width: 100%;
  display: flex;
  height: 80%;
  flex-grow: 1;
}

.IS-cards {
  width: 75%;
  height: 100%;
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
  height: min-content;
  max-width: 100%;
}

.IS-equipped {
  border: 2px solid #f7f12c;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 2px;
  margin: 5px;
}

.IS-chosen-card {
  border: #f7f12c 2px solid;
  box-shadow: #bbb516 0 0 5px 5px;
}

.IS-right {
  width: 20%;
  border: 1px solid #7cdcf4;
  margin-left: 2%;
  height: min-content;
  padding: 2px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.IS-right-des {
  text-align: center;
}
.IS-right-title {
  text-align: center;
  margin-top: 1rem;
}
.IS-right-ego {
  display: flex;
  margin-top: 5px;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 150px;
  gap: 10px;
}
</style>