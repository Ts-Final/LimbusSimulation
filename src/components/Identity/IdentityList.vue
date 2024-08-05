<script lang="ts" setup>

import {Identity} from "@/core/identity.ts";
import AffinityImg from "../small/affinityImg.vue";
import {Affinity} from "@/core/constants.ts";
import {ref} from "vue";
import {Skill} from "@/core/skill.ts";

const viewing = Identity.viewing

function dataToHp(data: Identity) {
  return Math.floor(data.hp.base + 45 * data.hp.modify)
}

function EGOResources(data: Identity) {
  const r: Record<string, number> = {}
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

function deleteUnit(index:number) {


  Identity.del(index)
  fuck()
}


function newUnit() {
  Identity.add()
  fuck()
}

const display = ref(true)
function fuck() {
  display.value = false
  setTimeout(() => display.value = true, 10)

}
</script>

<template>
  <div class="IL-wrapper">
    <table v-if="display" class="border-table IL-table">
      <tr>
        <td class="IL-button" @click="newUnit">
          新增
        </td>
        <td colspan="5">
          这里是空的。
        </td>
      </tr>
      <tr v-for="[index,data] in Object.entries(Identity.storage)">
        <td>
          {{ data.character }}
          <br>
          {{ data.name }}
        </td>
        <td style="line-height: 1.5rem;text-align:center; ">
          <img alt="" src="../../assets/icons/hp.png" style="width: 1.5rem">
          <br>
          {{ data.hp.base }} + {{ data.hp.modify }}&times;45 = {{ dataToHp(data) }}
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
        <td class="IL-button" v-if="viewing != index.num()"
            @click="Identity.viewing.value = Number(index)">
          编辑
        </td>
        <td v-else class="IL-button">
          正在编辑
        </td>
        <td class="IL-delete" @click="deleteUnit(Number(index))">
          删除
        </td>
      </tr>

    </table>
  </div>
</template>

<style scoped>
.IL-wrapper {
  width: calc(100% - 10px);
  margin: 5px;
  overflow-y: scroll;
  height: 90%;
}
.IL-table {
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
</style>