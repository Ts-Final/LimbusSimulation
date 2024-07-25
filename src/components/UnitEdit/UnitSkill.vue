<script lang="ts" setup>
import {Unit} from "../../core/unit/UnitBase.ts";
import {range} from "../../core/utils/utils.ts";
import {notify} from "../../core/utils/notify.ts";
import {Skill} from "../../core/skill/SkillBase.ts";
import AffinityImg from "../small/affinityImg.vue";

const unit = Unit.current
const UnitEditor = Unit.Editor

function deleteSkill(index: number) {
  if (unit.value.skills.length == 1) {
    notify.error("再删没啦！", 1000)
    return
  }
  UnitEditor.skills.value.splice(index, 1)
}

function newSkill() {
  const skill = Skill.init()
  UnitEditor.skills.value.push(skill)
}

const editor = Skill.Editor
editor.assign(Skill.current.value)
</script>

<template>
  <div class="US-wrapper">
    <div class="US-list">
      <div v-for="index in range(UnitEditor.skills.value.length)"
           :class="unit.skills[index].affinity"
           class="affinity-button"
           @click="Skill.viewing.value = index"
           @contextmenu="(e) =>{deleteSkill(index); e.preventDefault()}">
        {{ unit.skills[index].name }}
      </div>
      <div style="cursor: pointer" @click="newSkill">新增</div>
      <div style="color: red">右键删除</div>
    </div>
    <table cellspacing="0" class="US-table">
      <tr>
        <td>
          <AffinityImg :affinity="editor.affinity.value" style="max-width: 1rem"/>
          技能{{ Skill.viewing.value + 1 }}</td>
        <td>名称：</td>
        <td>
          <input type="text" v-model="editor.name.value" style="text-align:center;"
                 placeholder="都是你的错！亚哈！">
        </td>
        <td>
          数量：&times;
          <input type="number" v-model="editor.count.value" style="max-width: 4rem">
        </td>
      </tr>
      <tr>
        <td>硬币数</td>
        <td>
          <input type="text" v-model="editor.coins.value">
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
          <input type="text" v-model="editor.BasePower.value">
        </td>

        <td>变动值</td>
        <td>
          <input type="text" v-model="editor. coinPower.value">
        </td>
      </tr>
      <tr>
        <td>攻击等级</td>
        <td>
          <input type="text" v-model="editor.ATKLevel.value">
        </td>
        <td>攻击容量</td>
        <td>
          <input type="text" v-model="editor.ATKWeight.value">
        </td>
      </tr>
    </table>
  </div>

</template>

<style scoped>
.US-wrapper {
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: row;
}

.US-list {
  display: flex;
  flex-direction: column;
  background-color: #080604;
  width: 10rem;
}

.US-list > div {
  border: 2px solid #11161b;
  border-bottom: none;
  color: white;
  text-align: center;
  height: 2.2rem;
  line-height: 2rem;
  user-select: none;
}

.US-list > div:last-child {
  border-bottom: 2px solid #11161b;
}
.US-table {
  width: calc(100% - 10rem - 4px);
  margin: 2px;
}
select {
  line-height: 1.25rem;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  border-radius: 0;
}
option {
  color: #11161b;
}
</style>