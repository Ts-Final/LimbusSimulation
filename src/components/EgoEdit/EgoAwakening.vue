<script lang="ts" setup>

import {EGO} from "../../core/ego/EGOBase.ts";
import AtkTypeImg from "../small/atkTypeImg.vue";
import Times from "../small/times.vue";

const editor = EGO.Editor
</script>

<template>
  <div class="EA-table">
    <div>
      <div :class="editor.affinity.value" class="flex-center"
           style="width: calc(70px + 10rem) !important;">
        EGO觉醒
      </div>
      <div style="width: 80px;" class="pl-4">
        <img alt="" src="../../assets/icons/coin.png" style="width: 20px;">
        <times/>
        <input v-model="editor.awakening.coin.value" class="EA-s-coins excelsiorSans"
               min="1" type="number">

      </div>
      <div style="width: calc(30px + 3.7rem);">
        <img alt="攻击等级" src="../../assets/icons/atk.png" style="width: 30px;">
        <span v-if="editor.awakening.ATKLevel.value >= 0">+</span>
        <span v-else style="visibility: hidden">+</span>
        <input v-model="editor.awakening.ATKLevel.value" class="EA-s-atkLevel excelsiorSans" type="number">
      </div>
      <div style="flex-grow: 1"></div>
    </div>
    <div>
      <div style="width: 70px;">
        <img alt="???" src="../../assets/70-Snagharpoon.png"
             style="width: calc(100% - 24px);
               margin: 8px;position:relative;">
        <AtkTypeImg :atk-type="editor.ATKType.value" class="EA-s-l-img"/>
        <select v-model="editor.ATKType.value" class="EA-s-atkType">
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
      </div>
      <div style="flex-grow: 1;padding: 4px;user-select: none">
        <div>
          基础值：
          <input v-model.number="editor.awakening.basePower.value"
                 class="EA-s-basePower excelsiorSans" type="number">
        </div>
        <div>
          变动值：
          <span v-if="editor.awakening.coinPower.value >= 0">+</span>
          <span v-else style="visibility: hidden">+</span>
          <input v-model.number="editor.awakening.coinPower.value"
                 class="excelsiorSans"
                 type="number">
        </div>
        <div>
          攻击容量：
          <input v-model="editor.awakening.ATKWeight.value"
                 class="excelsiorSans" min="1"
                 style="width: 4rem;" type="number">

        </div>


      </div>
    </div>
  </div>

</template>

<style scoped>
.EA-wrapper {
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: row;
  height: 100%;
}

.EA-table {
  width: calc(100% - 4px);
  margin: 2px;
  height: min-content;
  display: flex;
  flex-direction: column;
  border-right: 1px solid gray;
  border-top: 1px solid gray;
}

.EA-table > div {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.EA-table > div > div {
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
}

.EA-right > div {
  position: relative;
}

.EA-s-basePower {
  font-family: ExcelsiorSans, sans-serif;
  font-size: 1.2rem;
  text-align: left;
  border: none !important;
}


.EA-s-affinity {
  line-height: 2rem;
  height: 2.2rem;
  vertical-align: center;
  text-align: center;
  background-color: transparent;
  transition: all 0.2s linear;
  border: none;
}

.EA-s-CP > input {
  width: 5rem;
  text-align: left;
  font-family: ExcelsiorSans, sans-serif;
  font-size: 1.5rem;
  border-bottom: none !important;
}

.EA-s-source {
  width: 6rem;
}

.EA-s-atkType {
  align-self: center;
  background-color: transparent;
  position: relative;
}

.EA-s-coins {
  width: 2.2rem;
  padding-left: 4px;
}


.EA-s-name {
  text-align: left;
  border: none !important;
  margin: 0;
  width: 100%;

}

.EA-s-atkLevel {
  width: 2.5rem;
  border: none !important;
}

.EA-s-l-img {
  width: 30px;
  height: 30px;
  left: 20px;
  position: relative;
  margin-top: 5px;
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
  border-radius: 0;
}
</style>