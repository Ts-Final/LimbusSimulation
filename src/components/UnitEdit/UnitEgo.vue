<script setup lang="ts">

import {Unit} from "../../core/unit/UnitBase.ts";
import {EGO} from "../../core/ego/EGOBase.ts";
import AffinityImg from "../small/affinityImg.vue";
import AtkTypeImg from "../small/atkTypeImg.vue";
import RiskImg from "../small/riskImg.vue";
import {parseRiskLevel, RiskLevel} from "../../core/constants.ts";
import {notify} from "../../core/utils/notify.ts";

const editor = Unit.Editor

function toDragStart(index:string) {
  return function (event: DragEvent) {
    if (event.dataTransfer) {
      event.dataTransfer.setData("ego-index", index)
    }
  }
}
function toDrop(rl:RiskLevel) {
  return function (event: DragEvent) {
    if (event.dataTransfer) {
      const index = Number(event.dataTransfer.getData("ego-index"))
      const IndexOf = Object.values(editor.EGO).map(v => v.value).indexOf(index)
      if (IndexOf == 0) {
        notify.error("这个EGO已经装备为ZAYIN级",1000)
        notify.error("请先卸掉再替换。",1000)
      } else if (IndexOf > 0) {
        editor.EGO[RiskLevel[IndexOf]].value = undefined
        editor.EGO[rl].value = index
        notify.normal("已将"+ RiskLevel[IndexOf] + "级的EGO调换到" + rl,1000)
      } else {
        editor.EGO[rl].value = index
      }
    }
  }
}
function toUnload(rl:RiskLevel) {
  return function () {
    if (rl == "ZAYIN") {
      alert("ZAYIN的你也要卸掉吗？")
      return
    } else {
      editor.EGO[rl].value = undefined
    }
  }
}
function fuck<T>(x:T|undefined):T{
  if (x === undefined) throw new Error()
  return x
}
</script>

<template>
  <table>
    <tr>
      <td v-for="rl in RiskLevel"
          title="点击以解除装备"
          class="UE-load"
          @click="() => toUnload(rl)()"
          @drop="e =>toDrop(rl)(e)"
          @dragover="e => e.preventDefault()">
        <template v-if="editor.EGO[rl].value == undefined">
          装备为{{parseRiskLevel(rl)}}
          <br>
        </template>
        <template v-if="typeof editor.EGO[rl].value == 'number'">
          {{ parseRiskLevel(rl) }}：<br>
          {{EGO.index(fuck(editor.EGO[rl].value)).name}}
        </template>
      </td>

    </tr>
    <tr v-for="[index, ego] in Object.entries(EGO.storage)">
      <td draggable="true" @dragstart="e => toDragStart(index)(e)">
        {{ego.name}}
      </td>
      <td>
        默认：
        <RiskImg :risk-level="ego.RiskLevel"/>
      </td>
      <td>
        <AffinityImg :affinity="ego.affinity"/>
        <AtkTypeImg :atk-type="ego.ATKType"/>
      </td>
      <template v-if="ego.corrosion.has">
        <td>
          {{ ego.awakening.basePower }}{{ ego.awakening.coinPower.toSigned() }}&times;{{ ego.awakening.coin }}
        </td>
        <td>
          {{ ego.corrosion.basePower }}{{ ego.corrosion.coinPower.toSigned() }}&times;{{ ego.corrosion.ATKWeight }}
        </td>
      </template>
      <template v-else>
        <td colspan="2">
          {{ ego.awakening.basePower }}{{ ego.awakening.coinPower.toSigned() }}&times;{{ ego.awakening.coin }}
        </td>
      </template>
      <td>
        攻击容量：
        {{ego.awakening.ATKWeight}}<span v-if="ego.corrosion.has">/{{ego.corrosion.ATKWeight}}</span>
      </td>
    </tr>

  </table>
</template>

<style scoped>
img {
  height: 30px;
  position: relative;
}
.UE-load {
  cursor: pointer;
  user-select: none;
}
</style>