<script lang="ts" setup>

import {EGO} from "@/core/ego.ts";

const editor = EGO.Editor
</script>

<template>
  <div class="EC-wrapper">
    <label>
      <input v-model="editor.corrosion.has" type="checkbox">
      启用侵蚀
    </label>
    <div class="inf-list" v-if="editor.corrosion.has">
      <div>
        <div class="inf-title">
          基础信息
        </div>
        消耗理智
        <input v-model="editor.corrosion.sp" min="0" type="number">
        硬币数
        <input v-model="editor.corrosion.coin" min="1" type="number">
        基础威力
        <input v-model="editor.corrosion.basePower" type="number">
        变动值
        <input v-model="editor.corrosion.coinPower" type="number">
        攻击等级修正
        <input v-model="editor.corrosion.ATKLevel" type="number">
        攻击容量
        <input v-model="editor.corrosion.ATKWeight" type="number">
      </div>
      <div>
        <div class="inf-title">
          效果
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped>
.EC-wrapper {
  position: relative;
  width: 100%;
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