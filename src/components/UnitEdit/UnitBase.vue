<script lang="ts" setup>
import {Unit} from "../../core/unit/UnitBase.ts";

const unit = Unit.current
const editor = Unit.Editor
</script>

<template>
  <table cellspacing="0" style="margin: 4px;">
    <tr>
      <td>
        角色
      </td>
      <td colspan="2">
        <input v-model="editor.character.value" type="text">
      </td>
      <td>
        称号
      </td>
      <td colspan="2">
        <input v-model="editor.name.value" type="text">
      </td>
      <td>稀有度</td>
      <td>
        <input v-model="editor.rarity.value" type="text">
      </td>
    </tr>
    <tr>
      <td>
        <img alt="体力" src="../../assets/icons/hp.png" style="width: 30px;">
      </td>
      <td>{{ Unit.HP }}</td>
      <td>
        <img alt="防御" src="../../assets/icons/def.png" style="width: 30px;"/>
      </td>
      <td>{{ unit.defense + 45 }}</td>
      <td colspan="2">混乱阈值</td>
      <td colspan="2">速度</td>
    </tr>
    <tr>
      <td>基础值</td>
      <td>
        <input v-model="editor.hpBase.value" type="text">
      </td>
      <td>基础值</td>
      <td>人格等级</td>
      <td>系数</td>
      <td>
        <input v-model="editor.stagger.value" class="text-center" type="text">
      </td>
      <td rowspan="2">
        <input v-model="editor.speedRange[0].value" class="ci" type="text">
      </td>
      <td rowspan="2">
        <input v-model="editor.speedRange[1].value" class="ci" type="text">
      </td>
    </tr>
    <tr>
      <td>变动值</td>
      <td>
        <input v-model="editor.hpModifier.value" type="text">
      </td>
      <td>变动值</td>
      <td>
        <input v-model="editor.defense.value" type="text">
      </td>
      <td>阈值</td>
      <td>
        {{ Unit.staggerThreshold(unit) }}
      </td>
    </tr>
  </table>
  <table cellspacing="0" style="width: 60%; align-self: center; margin-top: 20px;">
    <tr>
      <td colspan="3">攻击抗性</td>
    </tr>
    <tr>
      <td>
        <img alt="斩击" src="../../assets/icons/slash.png" style="width: 30px;">
      </td>
      <td>
        <img alt="穿刺" src="../../assets/icons/pierce.png" style="width: 30px;">
      </td>
      <td>
        <img alt="打击" src="../../assets/icons/blunt.png" style="width: 30px;">
      </td>
    </tr>
    <tr>
      <td>
        &times;
        <input v-model="editor.attackResistance.slash.value" class="si" type="text">
      </td>
      <td>
        &times;
        <input v-model="editor.attackResistance.pierce.value" class="si" type="text">
      </td>
      <td>
        &times;
        <input v-model="editor.attackResistance.blunt.value" class="si" type="text">
      </td>
    </tr>
  </table>
</template>

<style scoped>
.si {
  min-width: 40px;
  width: 0;
}

.ci {
  width: 40px;
  text-align: center;
}
</style>