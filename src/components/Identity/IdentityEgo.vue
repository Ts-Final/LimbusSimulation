<script lang="ts" setup>

import {Identity} from "@/core/identity.ts";
import {EGO} from "@/core/ego.ts";
import {parseRiskLevel, RiskLevel} from "@/core/constants.ts";
import {notify} from "@/core/utils.ts";
import EgoCard from "@/components/EgoEdit/EgoCard.vue";
import { ref } from "vue";

const editor = Identity.Editor

function toDragStart(index: string) {
  return function (event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData("ego-index", index)
    }
  }
}

function toDrop(rl: RiskLevel) {
  return function (event: DragEvent) {
    if (event.dataTransfer) {
      const index = Number(event.dataTransfer.getData("ego-index"))
      const IndexOf = Object.values(editor.value.ego).indexOf(index)
      if (IndexOf == 0) {
        notify.error("这个EGO已经装备为ZAYIN级", 1000)
        notify.error("请先卸掉再替换。", 1000)
      } else if (IndexOf > 0) {
        editor.value.ego[RiskLevel[IndexOf]] = undefined
        editor.value.ego[rl] = index
        notify.normal("已将" + RiskLevel[IndexOf] + "级的EGO调换到" + rl, 1000)
      } else {
        editor.value.ego[rl] = index
      }
    }
  }
}

function toUnload(rl: RiskLevel) {
  return function () {
    if (rl == "ZAYIN") {
      alert("ZAYIN的你也要卸掉吗？")
      return
    } else {
      editor.value.ego[rl] = undefined
    fuck()
    }
  }
}
const display = ref(true)
function fuck() {
  display.value = false
  setTimeout(() => display.value = true, 10)
}
</script>

<template>
  <div class="inf-list" v-if="display">
    <div class="IE-equipped">
      <div class="inf-title">
        装备中
      </div>
      <div v-for="rl in RiskLevel"
           @contextmenu.prevent="toUnload(rl)()"
           @drop.prevent="e => toDrop(rl)(e)" @dragenter.prevent @dragover.prevent>
        <div>{{ parseRiskLevel(rl) }}</div>
        <EgoCard v-if="editor.ego[rl] !== undefined" :risk-level="rl"
                 :ego="EGO.index(editor.ego[rl])"/>
        <div v-else>未装备</div>
      </div>
    </div>
    <div class="IE-cards">
      <div class="inf-title">
        EGO列表
      </div>
      <EgoCard v-for="[index, ego] in Object.entries(EGO.storage)" :ego="ego"
               draggable="true" :chosen="Object.values(editor.ego).includes(index.num())"
               @dragstart="e => toDragStart(index)(e)"/>
    </div>
  </div>
</template>

<style scoped>
img {
  height: 30px;
  position: relative;
}

.IE-load {
  cursor: pointer;
  user-select: none;
}

.IE-equipped {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  text-align: center;
  min-height: 150px;
}
.IE-cards {
  display: flex;
  flex-direction: row;
  gap: 4px;
}
</style>