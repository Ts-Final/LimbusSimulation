<script lang="ts" setup>

import {EGO} from "@/core/ego.ts";
import AffinityImg from "../small/affinityImg.vue";
import AtkTypeImg from "../small/atkTypeImg.vue";
import Times from "../small/times.vue";
import AttackTypeSelect from "@/components/small/AttackTypeSelect.vue";

const editor = EGO.Editor
</script>

<template>
  <input type="checkbox" v-model="editor.corrosion.has" id="EC-has">
  <label for="EC-has">启用侵蚀</label>
  <div class="EC-table" v-if="editor.corrosion.has">
    <div>
      <div :class="editor.affinity" class="flex-center"
           style="width: calc(70px + 10rem) !important;">
        EGO侵蚀
      </div>
      <div style="width: 80px;" class="pl-4">
        <img alt="" src="../../assets/icons/coin.png" style="width: 20px;">
        <times/>
        <input v-model="editor.corrosion.coin" class="EC-s-coins"
               min="1" type="number">

      </div>
      <div style="width: calc(30px + 3.7rem);">
        <img alt="攻击等级" src="../../assets/icons/atk.png" style="width: 30px;">
        <span v-if="editor.corrosion.ATKLevel >= 0">+</span>
        <span v-else style="visibility: hidden">+</span>
        <input v-model="editor.corrosion.ATKLevel"
               class="EC-s-atkLevel" type="number">
      </div>
      <div style="flex-grow: 1"></div>
    </div>
    <div>
      <div style="width: 70px;">
        <img alt="???" src="../../assets/70-Snagharpoon.png"
             style="width: calc(100% - 24px);
               margin: 8px;position:relative;">
        <AtkTypeImg :atk-type="editor.ATKType" />
        <AttackTypeSelect v-model="editor.ATKType"/>
      </div>
      <div style="flex-grow: 1;padding: 4px;user-select: none">
        <div>
          基础值：
          <input v-model.number="editor.corrosion.basePower" class="EC-s-basePower" type="text">
        </div>
        <div>
          变动值：
          <span v-if="editor.corrosion.coinPower >= 0">+</span>
          <span v-else style="visibility: hidden">+</span>
          <input v-model.number="editor.corrosion.coinPower" type="text">
        </div>
        <div>
          攻击容量：
          <input v-model="editor.corrosion.ATKWeight"
                 min="1"
                 style="width: 4rem;" type="number">

        </div>


      </div>
    </div>
  </div>

</template>

<style scoped>
.EC-wrapper {
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: row;
  height: 100%;
}

.EC-table {
  width: calc(100% - 4px);
  margin: 2px;
  height: min-content;
  display: flex;
  flex-direction: column;
  border-right: 1px solid gray;
  border-top: 1px solid gray;
}

.EC-table > div {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.EC-table > div > div {
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

.EC-right > div {
  position: relative;
}

.EC-s-basePower {
  font-family: ExcelsiorSans, sans-serif;
  font-size: 1.2rem;
  text-align: left;
  border: none !important;
}


.EC-s-affinity {
  line-height: 2rem;
  height: 2.2rem;
  vertical-align: center;
  text-align: center;
  background-color: transparent;
  transition: all 0.2s linear;
  border: none;
}

.EC-s-CP > input {
  width: 5rem;
  text-align: left;
  font-family: ExcelsiorSans, sans-serif;
  font-size: 1.5rem;
  border-bottom: none !important;
}

.EC-s-atkType {
  align-self: center;
  background-color: transparent;
  position: relative;
}

.EC-s-coins {
  width: 2.2rem;
  padding-left: 4px;
}


.EC-s-name {
  text-align: left;
  border: none !important;
  margin: 0;
  width: 100%;

}

.EC-s-atkLevel {
  width: 2.5rem;
  border: none !important;
}

.EC-s-l-img {
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