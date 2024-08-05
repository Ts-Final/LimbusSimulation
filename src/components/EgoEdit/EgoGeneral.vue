<script lang="ts" setup>

import {EGO} from "@/core/ego.ts";
import AffinityImg from "../small/affinityImg.vue";
import {Affinity} from "@/core/constants.ts";
import RiskImg from "../small/riskImg.vue";
import {resToClass, resToWord} from "@/core/utils.ts"

const ego = EGO.current()

function resCount(val: number) {
  if (val <= 0) return "res-ineff"
  return "res-normal"
}
</script>

<template>
  <div class="EG-wrapper">
    <div class="EG-name">
      <div style="opacity: 0.6;">{{ ego.source }}</div>
      <RiskImg :risk-level="ego.RiskLevel" style="height: 1.5rem"/>
      <div>
        <AffinityImg :affinity="ego.affinity" style="width: 1.8rem;"/>
        {{ ego.name }}
      </div>
    </div>
    <table class="EG-table border-table">
      <tr>
        <td>罪孽</td>
        <td v-for="key in Affinity">
          <AffinityImg :affinity="key" style="width: 1.5rem;"/>
        </td>
      </tr>
      <tr>
        <td>资源</td>
        <td v-for="val in Affinity" :class="resCount(ego.resource[val])">
          {{ ego.resource[val] }}
        </td>
      </tr>
      <tr>
        <td>
          抗性
          <br>
          ???
        </td>
        <td v-for="val in Affinity" :class="resToClass(ego.resistance[val])">
          {{ resToWord(ego.resistance[val]) }}
          <br>
          &times;{{ ego.resistance[val] }}
        </td>
      </tr>
    </table>
    <table class="EG-table border-table" style="margin-top: 30px;">
      <tr>
        <td>觉醒</td>
        <td>{{ ego.awakening.basePower }}{{ ego.awakening.coinPower.toSigned() }}&times;{{ ego.awakening.coin }}</td>
      </tr>
      <tr v-if="ego.corrosion.has">
        <td>侵蚀</td>
        <td>{{ ego.corrosion.basePower }}{{ ego.corrosion.coinPower.toSigned() }}&times;{{ ego.corrosion.coin }}</td>
      </tr>
      <tr v-else>
        <td colspan="2">
          没有侵蚀。（乐）
        </td>
      </tr>
    </table>

  </div>

</template>

<style scoped>
.EG-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.EG-name {
  line-height: 2rem;
  height: 3rem;
  font-size: 1.5rem;
  font-family: "Mikodacs", sans-serif;
  color: #b8dcee;
  font-weight: bold;
  user-select: none;
  position: relative;
  text-align: right;
  right: 0;

  padding-right: 5rem;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
}

.EG-table {
  left: 5px;
  width: calc(100% - 10px);
  position: relative;
}
</style>