<script setup lang="ts">

import {EGO} from "@/core/ego.ts";
import AffinityImg from "../small/affinityImg.vue";
import AffinitySelect from "@/components/small/AffinitySelect.vue";
import {Affinity} from "@/core/constants.ts";
import {computed} from "vue";
import AtkTypeImg from "@/components/small/atkTypeImg.vue";
import AttackTypeSelect from "@/components/small/AttackTypeSelect.vue";
import SpiltCol from "@/components/small/SpiltCol.vue";
import {resToClass, resToWord} from "@/core/utils.ts";

const editor = EGO.Editor
</script>

<template>
  <SpiltCol>
    <template v-slot:l>
      <div class="inf-list">
        <div>
          <div class="inf-title">
            基础信息
          </div>
          EGO名
          <input v-model="editor.name">
          来源：
          <input v-model="editor.source">
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
        </div>
        <div>
          <div class="inf-title">
            资源/抗性
          </div>
          <template v-for="aff in Affinity">
            <AffinityImg :affinity="aff" style="max-height: 30px"/>
            <div>
              <label>
                资源：
                <input v-model="editor.resource[aff]" type="number" style="width: 4rem;">
              </label>
              <label>
                <span :class="resToClass(editor.resistance[aff])">抗性&times;</span>
                <input v-model.number="editor.resistance[aff]" style="width: 4rem;">
                {{resToWord(editor.resistance[aff])}}
              </label>
            </div>
          </template>
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
</template>

<style scoped>
.mi {
  min-width: 90px;
  max-width: 110px;
  text-align: center;
}
img {
  justify-self: center;
}
</style>