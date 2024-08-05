<script setup lang="ts">

import {EGO} from "@/core/ego.ts";
import AffinityImg from "../small/affinityImg.vue";
import {resToClass, resToWord} from "@/core/utils.ts"
import RiskSelect from "@/components/small/RiskSelect.vue";
import AffinitySelect from "@/components/small/AffinitySelect.vue";
import {Affinity} from "@/core/constants.ts";

const editor = EGO.Editor
</script>

<template>
  <table style="margin: 4px;" class="border-table">
    <tr :class="editor.affinity">
      <td style="width: 7rem;">
        EGO名：
      </td>
      <td>
        <input type="text" v-model="editor.name" class="mi">
      </td>
      <td>
        来源：
      </td>
      <td>
        <input type="text" v-model="editor.source" class="mi">
      </td>
      <td>
        危险等级：
      </td>
      <td>
        <RiskSelect v-model="editor.RiskLevel" />
      </td>
      <td>
        罪孽属性：
      </td>
      <td>
        <AffinitySelect v-model="editor.affinity"/>
      </td>
    </tr>
    <tr>
      <td>罪孽</td>
      <td v-for="key in Affinity">
        <AffinityImg :affinity="key" style="width: 1.5rem;"/>
      </td>
    </tr>
    <tr>
      <td>
        资源
      </td>
      <td v-for="key in Affinity">
        <input type="text" v-model.number="editor.resource[key]"
               style="text-align:center;max-width: 40px"/>
      </td>
    </tr>
    <tr>
      <td>抗性</td>
      <td v-for="key in Affinity" :class="resToClass(editor.resistance[key])">
        {{resToWord(editor.resistance[key])}}
        &times;
        <input type="text" :class="resToClass(editor.resistance[key])"
               v-model.number="editor.resistance[key]" style="width: 3rem;">
      </td>
    </tr>
  </table>
</template>

<style scoped>
.mi {
  min-width: 90px;
  max-width: 110px;
  text-align: center;
}
</style>