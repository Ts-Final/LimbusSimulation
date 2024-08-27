<script setup lang="ts">

import AttackTypeSelect from "@/components/small/AttackTypeSelect.vue";
import {Skill} from "@/core/skill.ts";
import AtkTypeImg from "../small/atkTypeImg.vue";
import {computed} from "vue";
import AffinitySelect from "@/components/small/AffinitySelect.vue";
import AffinityImg from "@/components/small/affinityImg.vue";
import SpiltCol from "@/components/small/SpiltCol.vue";

const editor = Skill.Editor
</script>

<template>
  <div class="SB-wrapper">
    <SpiltCol>
      <template v-slot:l>
        <div class="inf-list">
          <div>
            <div class="inf-title">
              基础信息
            </div>
            技能名
            <input v-model="editor.name">
            <div>
              攻击类型
              <AtkTypeImg :atk-type="computed(() => editor.ATKType)"/>
            </div>
            <AttackTypeSelect v-model="editor.ATKType"/>
            <div>
              罪孽：
              <AffinityImg :affinity="computed(() => editor.affinity)" style="max-height: 25px"/>
            </div>
            <AffinitySelect v-model="editor.affinity"/>
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
        </div>
      </template>
      <template v-slot:r>
        <div class="inf-list">
          <div>
            <div class="inf-title">
              效果
            </div>
          </div>
        </div>

      </template>

    </SpiltCol>
  </div>
</template>

<style scoped>
.SB-wrapper {
  width: 100%;
  height: min-content;
}
img {
  justify-self: center;
}
</style>