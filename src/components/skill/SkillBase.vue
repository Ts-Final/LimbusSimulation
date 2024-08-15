<script setup lang="ts">

import AttackTypeSelect from "@/components/small/AttackTypeSelect.vue";
import {Skill} from "@/core/skill.ts";
import AtkTypeImg from "../small/atkTypeImg.vue";
import {computed} from "vue";

const editor = Skill.Editor
</script>

<template>
  <div class="SB-wrapper">
    <div class="inf-list">
      <div>
        <div class="inf-title">
          基础信息
        </div>
        技能名
        <input v-model="editor.name" min="0">
        <div>
          攻击类型
          <AtkTypeImg :atk-type="computed(() => editor.ATKType)"/>
        </div>
        <AttackTypeSelect v-model="editor.ATKType"/>
        硬币数
        <input v-model="editor.coin" min="1" type="number">
        基础威力
        <input v-model="editor.basePower" type="number">
        变动值
        <input v-model="editor.coinPower" type="number">
        攻击等级修正
        <input v-model="editor.ATKLevel" type="number">
        攻击容量
        <input v-model="editor.ATKWeight" type="number">
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
.SB-wrapper {
  width: 100%;
  height: min-content;
}
</style>