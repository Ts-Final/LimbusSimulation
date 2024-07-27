<script lang="ts" setup>

import {Unit} from "../../core/unit/UnitBase.ts";
import AffinityImg from "../small/affinityImg.vue";
import {Affinity} from "../../core/constants.ts";
import {ref} from "vue";
import {Skill} from "../../core/skill/SkillBase.ts";

function dataToHp(data: Unit.dataType) {
  return Math.floor(data.hpBase + 45 * data.hpModifier)
}

function EGOResources(data: Unit.dataType) {
  const r: Record<string, number> = {}
  for (const skill of data.skills) {
    const affinity = skill.affinity
    if (r[affinity] && typeof r[affinity] === 'number') {
      r[affinity] += skill.count
    } else {
      r[affinity] = skill.count
    }
  }
  return r
}

function deleteUnit(index:number) {
  if (Unit.storage.length == 1) {
    alert("至少要保留一个单位。")
    return;
  }
  if (!confirm("删掉吗？")) return

  Unit.viewing.value = -1
  Unit.Editor.assign(Unit.current.value)
  Skill.Editor.assign(Skill.current.value)
  Unit.storage.splice(index, 1)
  Unit.viewing.value = 0
  fuck()
}

const display = ref(true)

function newUnit() {
  Unit.storage.push(Unit.init())
  fuck()
}

function fuck() {
  display.value = false
  setTimeout(() => display.value = true, 10)

}
</script>

<template>
  <table v-if="display" cellspacing="0" class="UL-wrapper">
    <tr v-for="[index,data] in Object.entries(Unit.storage)">
      <td>
        {{ data.character }}
        <br>
        {{ data.name }}
      </td>
      <td style="line-height: 1.5rem;text-align:center; ">
        <img alt="" src="../../assets/icons/hp.png" style="width: 1.5rem">
        <br>
        {{ data.hpBase }} + {{ data.hpModifier }}&times;45 = {{ dataToHp(data) }}
      </td>
      <td>
        <img alt="" src="../../assets/icons/def.png" style="width: 1.5rem;">
        {{ 45 + data.defense }}
      </td>
      <td>
        <template v-for="[affinity, count] in Object.entries(EGOResources(data))">
          <AffinityImg :affinity="affinity as Affinity" style="width: 1.2rem;"/>
          &times;{{ count }}
        </template>
      </td>
      <td class="UL-button" @click="Unit.viewing.value = Number(index)">
        编辑
      </td>
      <td class="UL-delete" @click="deleteUnit(Number(index))">
        删除
      </td>
    </tr>
    <tr>
      <td class="UL-button" @click="newUnit">
        新增
      </td>
      <td colspan="5">
        这里是空的。
      </td>
    </tr>
  </table>
</template>

<style scoped>
.UL-wrapper {
  width: calc(100% - 10px);
  margin: 5px;
}

.UL-button {
  cursor: pointer;
  user-select: none;
}

.UL-delete {
  cursor: pointer;
  user-select: none;
  color: red;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>