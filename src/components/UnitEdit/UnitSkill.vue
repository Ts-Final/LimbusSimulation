<script lang="ts" setup>
import {Unit} from "../../core/unit/UnitBase.ts";
import {range} from "../../core/utils/utils.ts";
import {notify} from "../../core/utils/notify.ts";
import {Skill} from "../../core/skill/SkillBase.ts";
import Times from "../small/times.vue";
import AtkTypeImg from "../small/atkTypeImg.vue";
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
    <div class="US-table">
      <div>
        <div :class="editor.affinity.value" style="width: 70px;text-align:center;">
          技能{{ Skill.viewing.value + 1 }}
        </div>
        <div style="width: 10rem !important;">
          <input v-model="editor.name.value"
                 class="US-s-name" placeholder="都是你的错！亚哈！" type="text">
        </div>
        <div style="width: 60px;padding-left: 3px;">
          <times/>
          <input v-model="editor.count.value" min="0"
                 style="width: 2rem" type="number">
        </div>
        <div style="width: 80px;">
          <img alt="" src="../../assets/icons/coin.png" style="width: 20px;">
          <times/>
          <input v-model="editor.coins.value" class="US-s-coins"
                 min="1" type="number">

        </div>
        <div style="width: calc(30px + 3.7rem);">
          <img alt="攻击等级" src="../../assets/icons/atk.png" style="width: 30px;">
          <span v-if="editor.ATKLevel.value >= 0">+</span>
          <span v-else style="visibility: hidden">+</span>
          <input v-model="editor.ATKLevel.value" class="US-s-atkLevel" type="number">
        </div>
        <div style="flex-grow: 1"></div>
      </div>
      <div>
        <div style="width: 70px;">
          <img alt="???" src="../../assets/70-Snagharpoon.png"
               style="width: calc(100% - 24px);
               margin: 8px;position:relative;">
          <AtkTypeImg :atk-type="editor.ATKType.value"                      class="US-s-l-img"/>
          <select v-model="editor.ATKType.value" class="US-s-atkType">
            <option value="pierce">
              穿刺
            </option>
            <option value="blunt">
              打击
            </option>
            <option value="slash">
              斩击
            </option>
          </select>
          <AffinityImg :affinity="editor.affinity.value" class="US-s-l-img"/>
          <select v-model="editor.affinity.value"
                  class="US-s-affinity">
            <option value="Wrath">暴怒！</option>
            <option value="Lust">色欲</option>
            <option value="Gluttony">暴食</option>
            <option value="Sloth">怠惰</option>
            <option value="Gloom">忧郁！</option>
            <option value="Pride">傲慢！</option>
            <option value="Envy">嫉妒！</option>
          </select>
        </div>
        <div style="flex-grow: 1;padding: 4px;user-select: none">
          <div>
            基础值：
            <input v-model.number="editor.BasePower.value" class="US-s-basePower" type="text">
          </div>
          <div>
            变动值：
            <span v-if="editor.coinPower.value >= 0">+</span>
            <span v-else style="visibility: hidden">+</span>
            <input v-model.number="editor.coinPower.value" type="text">
          </div>
          <div>
            攻击容量：
            <input v-model="editor.ATKWeight.value"
                   style="width: 4rem;"
                   type="number" min="1">

          </div>


        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.US-wrapper {
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: row;
  height: 100%;
}

.US-list {
  display: flex;
  flex-direction: column;
  background-color: #080604;
  width: 10rem;
  height: min-content;
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
  height: min-content;
  display: flex;
  flex-direction: column;
  border-right: 1px solid gray;
  border-top: 1px solid gray;
}

.US-table > div {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.US-table > div > div {
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
}

select {
  line-height: 1.25rem;
  border: none;
  font-size: 1rem;
  border-radius: 0;
}

option {
  color: #fff;
  background-color: #000000;
}

.US-right > div {
  position: relative;
}

.US-s-basePower {
  font-family: ExcelsiorSans, sans-serif;
  font-size: 1.2rem;
  text-align: left;
  border: none !important;
}


.US-s-affinity {
  line-height: 2rem;
  height: 2.2rem;
  vertical-align: center;
  text-align: center;
  background-color: transparent;
  transition: all 0.2s linear;
  border: none;
}

.US-s-CP > input {
  width: 5rem;
  text-align: left;
  font-family: ExcelsiorSans, sans-serif;
  font-size: 1.5rem;
  border-bottom: none !important;
}

.US-s-atkType {
  align-self: center;
  background-color: transparent;
  position: relative;
}

.US-s-coins {
  width: 2.2rem;
  padding-left: 4px;

}


.US-s-name {
  text-align: left;
  border: none !important;
  margin: 0;
  width: 100%;

}

.US-s-atkLevel {
  width: 2.5rem;
  border: none !important;
}

.US-s-l-img {
  width: 30px;
  height: 30px;
  left: 20px;
  position: relative;
  margin-top: 5px;
}

td {
  position: relative;
}
</style>