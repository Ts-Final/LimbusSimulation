<script lang="ts" setup>

import {EGO} from "@/core/ego.ts";

const editor = EGO.Editor
</script>

<template>
  <div class="EA-wrapper">
    <div class="inf-list">
      <div>
        <div class="inf-title">
          基础信息
        </div>
        消耗理智
        <input v-model="editor.awakening.sp" min="0" type="number">
        硬币数
        <input v-model="editor.awakening.coin" min="1" type="number">
        基础威力
        <input v-model="editor.awakening.basePower" type="number">
        变动值
        <input v-model="editor.awakening.coinPower" type="number">
        攻击等级修正
        <input v-model="editor.awakening.ATKLevel" type="number">
        攻击容量
        <input v-model="editor.awakening.ATKWeight" type="number">
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
.EA-wrapper {
  display: flex;
  position: relative;
  width: 100%;
  flex-direction: column;

  gap: 10px 0;

  height: 100%;
  padding: 10px;
}


input {
  border-bottom: 1px solid #7cdcf4;
  border-radius: 2px;
  position: relative;
  width: 80%;
  padding-bottom: 2px;
  margin-bottom: 2px;
}

span {
  text-align: left;
  overflow-x: visible;
  margin-bottom: 5px;
}
</style>