<script setup lang="ts">

import Times from "@/components/small/times.vue";
import AttackTypeSelect from "@/components/small/AttackTypeSelect.vue";
import {Skill} from "@/core/skill.ts";
import AffinitySelect from "@/components/small/AffinitySelect.vue";

const editor = Skill.Editor
</script>

<template>
  <div class="SB-table">
    <div>
      <div :class="editor.affinity" class="flex-center"
           style="width: 70px !important;">
        技能名：
      </div>
      <div style="flex-grow: 1  ">
        <input v-model="editor.name" class="SB-s-name wrap-word" type="text">
      </div>
      <div style="width: 80px;" class="pl-4">
        <img alt="" src="../../assets/icons/coin.png" style="width: 20px;">
        <times/>
        <input v-model="editor.coin" class="SB-s-coins"
               min="1" type="number">

      </div>
      <div style="width: calc(30px + 3.7rem);">
        <img alt="攻击等级" src="../../assets/icons/atk.png" style="width: 30px;">
        <span v-if="editor.ATKLevel >= 0">+</span>
        <span v-else style="visibility: hidden">+</span>
        <input v-model="editor.ATKLevel" class="SB-s-atkLevel" type="number">
      </div>
    </div>
    <div>
      <div style="width: 70px;">
        <img alt="???" src="../../assets/70-Snagharpoon.png"
             style="width: calc(100% - 24px);
               margin: 8px;position:relative;">
        <AttackTypeSelect v-model="editor.ATKType"/>
        <AffinitySelect v-model="editor.affinity" />
      </div>
      <div style="flex-grow: 1;padding: 4px;user-select: none">
        <div>
          基础值：
          <input v-model.number="editor.basePower"
                 class="SB-s-basePower" type="number">
        </div>
        <div>
          变动值：
          <span v-if="editor.coinPower >= 0">+</span>
          <span v-else style="visibility: hidden">+</span>
          <input v-model.number="editor.coinPower"
                 type="number">
        </div>
        <div>
          攻击容量：
          <input v-model="editor.ATKWeight"
                 min="1"
                 style="width: 4rem;" type="number">

        </div>


      </div>
    </div>
  </div>
</template>

<style scoped>
.SB-wrapper {
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: row;
  height: 100%;
}

.SB-table {
  width: calc(100% - 4px);
  margin: 2px;
  height: min-content;
  display: flex;
  flex-direction: column;
  border-right: 1px solid gray;
  border-top: 1px solid gray;
}

.SB-table > div {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.SB-table > div > div {
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
}

.SB-right > div {
  position: relative;
}

.SB-s-basePower {
  font-family: ExcelsiorSans, sans-serif;
  font-size: 1.2rem;
  text-align: left;
  border: none !important;
}


.SB-s-affinity {
  line-height: 2rem;
  height: 2.2rem;
  vertical-align: center;
  text-align: center;
  background-color: transparent;
  transition: all 0.2s linear;
  border: none;
}

.SB-s-CP > input {
  width: 5rem;
  text-align: left;
  font-family: ExcelsiorSans, sans-serif;
  font-size: 1.5rem;
  border-bottom: none !important;
}

.SB-s-source {
  width: 6rem;
}

.SB-s-atkType {
  align-self: center;
  background-color: transparent;
  position: relative;
}

.SB-s-coins {
  width: 2.2rem;
  padding-left: 4px;
}


.SB-s-name {
  text-align: left;
  border: none !important;
  margin: 0;
  width: 100%;

}

.SB-s-atkLevel {
  width: 2.5rem;
  border: none !important;
}

.SB-s-l-img {
  width: 30px;
  height: 30px;
  left: 20px;
  position: relative;
  margin-top: 5px;
}
</style>