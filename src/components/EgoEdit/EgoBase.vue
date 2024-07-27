<script setup lang="ts">

import {EGO} from "../../core/ego/EGOBase.ts";
import {Affinities} from "../../core/constants.ts";
import AffinityImg from "../small/affinityImg.vue";
import {resToClass, resToWord} from "../../core/utils/utils.ts";

const editor = EGO.Editor
</script>

<template>
  <table style="margin: 4px;" >
    <tr :class="editor.affinity.value">
      <td>
        EGO名：
      </td>
      <td>
        <input type="text" v-model="editor.name.value">
      </td>
      <td>
        来源：
      </td>
      <td>
        <input type="text" v-model="editor.source.value">
      </td>
      <td>
        危险等级：
      </td>
      <td>
        <select v-model="editor.RiskLevel.value">
          <option value="ZAYIN">ZAYIN</option>
          <option value="TETH">TETH</option>
          <option value="HE">HE</option>
          <option value="WAW">WAW</option>
          <option value="ALEPH">ALEPH</option>
          <option value="TARK">T.ARK.</option>
        </select>
      </td>
      <td>
        罪孽属性：
      </td>
      <td>
        <select v-model="editor.affinity.value"
                class="EA-s-affinity">
          <option value="Wrath">暴怒！</option>
          <option value="Lust">色欲</option>
          <option value="Gluttony">暴食</option>
          <option value="Sloth">怠惰</option>
          <option value="Gloom">忧郁！</option>
          <option value="Pride">傲慢！</option>
          <option value="Envy">嫉妒！</option>
        </select>
      </td>
    </tr>
    <tr>
      <td>罪孽</td>
      <td v-for="key in Affinities">
        <AffinityImg :affinity="key" style="width: 1.5rem;"/>
      </td>
    </tr>
    <tr>
      <td>
        资源
      </td>
      <td v-for="key in Affinities">
        <input type="text" v-model.number="editor.resource[key].value"
               style="text-align:center;"/>
      </td>
    </tr>
    <tr>
      <td>抗性</td>
      <td v-for="key in Affinities" :class="resToClass(editor.resistance[key].value)">
        {{resToWord(editor.resistance[key].value)}}
        &times;
        <input type="text" :class="resToClass(editor.resistance[key].value)"
               v-model.number="editor.resistance[key].value" style="width: 3rem;">
      </td>
    </tr>
  </table>
</template>

<style scoped>
* :not(input) {
  user-select: none;
}

select {
  line-height: 1.25rem;
  border: none;
  font-size: 1rem;
  border-radius: 0;
  background-color: transparent;
}

option {
  color: #fff;
  background-color: #000000;
}

</style>