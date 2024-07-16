<script setup lang="ts">

import {Skill} from "../../core/skill/SkillBase.ts";
import {computed, ComputedRef, inject} from "vue";
import {Unit} from "../../core/unit/UnitBase.ts";
import {ui} from "../../core/ui.ts";
import {range} from "../../core/utils/utils.ts";
import {notify} from "../../core/utils/notify.ts";
import AffinityImg from "./affinityImg.vue";

const unit = inject("unit") as ComputedRef<Unit.dataType>
const UnitEditor = Unit.Editor
const skill = computed(() => unit.value.skills[ui.skill.view.value])
const editor = Skill.Editor

function newSkill() {
  const skill = Skill.init()
  UnitEditor.skills.value.push(skill)
}

function deleteSkill(index: number) {
  if (unit.value.skills.length == 1) {
    notify.error("再删没啦！", 1000)
    return
  }
  UnitEditor.skills.value.splice(index, 1)
}
</script>

<template>
  <table class="Skill-list" cellspacing="0">
    <tr v-for="index in range(UnitEditor.skills.value.length)"
        @click="ui.skill.view.value = index"
        @contextmenu="(e) =>{deleteSkill(index); e.preventDefault()}"
        :class="unit.skills[index].affinity" class="affinity-button">
      <td>{{ unit.skills[index].name }}</td>
    </tr>
    <tr>
      <td @click="newSkill" class="pointer">新增</td>
    </tr>
    <tr>
      <td>
        右键删除
      </td>
    </tr>
    <tr>
      <td style="text-wrap: nowrap; color: red; font-weight: bold; font-size: 1.25rem">
        不可撤销！！
      </td>
    </tr>
  </table>
  <table cellspacing="0" class="skill-edit">
    <tr>
      <td>
        <AffinityImg :affinity="editor.affinity.value"/>
        技能{{ ui.skill.view.value + 1 }}</td>
      <td>名称：</td>
      <td colspan="2">
        <input type="text" v-model="editor.name.value" style="text-align:center;"
               placeholder="都是你的错！亚哈！"
               @input="skill.name = editor.name.value ?? '执着鱼叉' ">
      </td>
    </tr>
    <tr>
      <td>硬币数</td>
      <td>
        <input type="text" v-model="editor.coins.value"
               @input="skill.coins = editor.coins.value">
      </td>
      <td>罪孽属性</td>
      <td>
        <select v-model="editor.affinity.value">
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
      <td>基础值</td>
      <td>
        <input type="text" v-model="editor.BasePower.value"
               @input="skill.BasePower = editor.BasePower.value">
      </td>

      <td>变动值</td>
      <td>
        <input type="text" v-model="editor. coinPower.value"
               @input="skill.coinPower = editor.coinPower.value">
      </td>
    </tr>
    <tr>
      <td>攻击等级</td>
      <td>
        <input type="text" v-model="editor.ATKLevel.value"
               @input="skill.ATKLevel = editor.ATKLevel.value">
      </td>
      <td>攻击容量</td>
      <td>
        <input type="text" v-model="editor.ATKWeight.value"
               @input="skill.ATKWeight = editor.ATKWeight.value">
      </td>
    </tr>
  </table>
</template>

<style scoped>
.Skill-list {
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #080604;
  box-shadow: #11161b 0 0 5px 5px;
  width: 10rem;
}

.skill-edit {
  margin-left: 5px;
}

.skill-edit tr td {
  line-height: 1.5rem;
}

td input {
  text-align: center;
}

select {
  line-height: 1.25rem;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  border-radius: 0;
}

option {
  background-color: #080604;
  border: none;
  border-radius: 0;
  height: 25px;
}
</style>