<script lang="ts" setup>
import {Identity} from "@/core/identity.ts";
import AtkTypeImg from "@/components/small/atkTypeImg.vue";

const editor = Identity.editor
</script>

<template>
  <table class="border-table" style="margin: 4px;">
    <tr>
      <td>
        角色
      </td>
      <td colspan="2">
        <input v-model="editor.character" type="text" class="bi">
      </td>
      <td>
        称号
      </td>
      <td colspan="2">
        <input v-model="editor.name" type="text" class="bi">
      </td>
      <td>稀有度</td>
      <td>
        <input v-model.number="editor.rarity" class="si" type="text">
      </td>
    </tr>
    <tr>
      <td>
        <img alt="体力" src="../../assets/icons/hp.png" style="width: 30px;">
      </td>
      <td>{{ Identity.refs.hp.value }}</td>
      <td>
        <img alt="防御" src="../../assets/icons/def.png" style="width: 30px;"/>
      </td>
      <td>{{ editor.defense + 45 }}</td>
      <td colspan="2">混乱阈值</td>
      <td colspan="2">速度</td>
    </tr>
    <tr>
      <td>基础值</td>
      <td>
        <input v-model.number="editor.hp.base" class="mi" type="text" placeholder="0">
      </td>
      <td>基础值</td>
      <td>人格等级</td>
      <td>系数</td>
      <td>
        <input v-model.trim="editor.stagger" class="text-center" type="text">
      </td>
      <td rowspan="2">
        <input v-model.number="editor.speed[0]" class="ci" type="text">
      </td>
      <td rowspan="2">
        <input v-model.number="editor.speed[1]" class="ci" type="text">
      </td>
    </tr>
    <tr>
      <td>变动值</td>
      <td>
        <input v-model.number="editor.hp.modify" class="mi" type="text">
      </td>
      <td>变动值</td>
      <td>
        <input v-model.number="editor.defense" class="si" type="text">
      </td>
      <td>阈值</td>
      <td>
        {{ Identity.refs.stagger.value }}
      </td>
    </tr>
  </table>
  <table style="width: 60%; align-self: center; margin-top: 20px;" class="border-table">
    <tr>
      <td colspan="3">攻击抗性</td>
    </tr>
    <tr>
      <td>
        <AtkTypeImg atk-type="slash"/>
      </td>
      <td>
        <AtkTypeImg atk-type="pierce"/>
      </td>
      <td>
        <AtkTypeImg atk-type="blunt"/>
      </td>
    </tr>
    <tr>
      <td>
        &times;
        <input v-model="editor.resistance.slash" class="si" type="text">
      </td>
      <td>
        &times;
        <input v-model="editor.resistance.pierce" class="si" type="text">
      </td>
      <td>
        &times;
        <input v-model="editor.resistance.blunt" class="si" type="text">
      </td>
    </tr>
  </table>
</template>

<style scoped>
.si {
  min-width: 40px;
  max-width: 60px;
}

.mi {
  min-width: 90px;
  max-width: 110px;
  text-align: center;
}
.bi {
  width: calc(100% - 4px);
}

.ci {
  width: 40px;
  text-align: center;
}
</style>