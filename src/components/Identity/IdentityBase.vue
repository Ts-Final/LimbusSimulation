<script lang="ts" setup>
import { Identity } from "@/core/identity.ts";
import AtkTypeImg from "@/components/small/atkTypeImg.vue";
import { resToClass } from "@/core/utils";

const editor = Identity.editor
</script>

<template>
  <div class="IB-wrapper">
    <div class="IB-col">
      <div class="IB-base">
        <div class="IB-title">
          基本信息
        </div>
        角色
        <input v-model="editor.character" type="text">
        称号
        <input v-model="editor.name" type="text">
        稀有度
        <input v-model.number="editor.rarity" type="number">
      </div>
      <div class="IB-base">
        <div class="IB-title">
          基础数值
        </div>
        等级：
        <input v-model.number="editor.level" type="number">
        体力-基础值：
        <input v-model.number="editor.hp.base" type="text">
        体力-变动值：
        <input v-model.number="editor.hp.modify" type="text">
        体力-预览：
        <span>
          {{ editor.hp.base }}{{ editor.hp.modify.toSigned() }}*{{ editor.level }} =
          {{ Identity.refs.hp.value }}
        </span>
        防御-基础值：
        <span>人格等级</span>
        防御-变动值：
        <input v-model.number="editor.defense" type="text">
        防御等级：
        <span>{{ editor.level + editor.defense }}</span>
        速度-最小值：
        <input v-model.number="editor.speed[0]" type="number">
        速度-最大值：
        <input v-model.number="editor.speed[1]" type="number">
        <label :class="resToClass(editor.resistance.pierce)">
          抗性：
          <AtkTypeImg atk-type="pierce" />
        </label>
        <input type="text" v-model.number="editor.resistance.pierce" />
        <label :class="resToClass(editor.resistance.blunt)">
          抗性：
          <AtkTypeImg atk-type="blunt" />
        </label>
        <input type="text" v-model.number="editor.resistance.blunt" />
        <label :class="resToClass(editor.resistance.slash)">
          抗性：
          <AtkTypeImg atk-type="slash" />
        </label>
        <input type="text" v-model.number="editor.resistance.slash" />

      </div>
    </div>
    <div class="IB-col">
      <div class="IB-base">
        <div class="IB-title">
          被动能力
        </div>
        Coming s∞n
      </div>
    </div>
  </div>

</template>

<style scoped>
.IB-wrapper {
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
}

.IB-col {
  margin: 5px;
  padding: 10px;
  height: min-content;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px 0;
}

.IB-base {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px 4px;
  border: #7cdcf4 1px solid;
  height: min-content;
  position: relative;
  padding: 4rem;
  text-align: center;
}

.IB-title {
  display: block;
  position: absolute;
  top: 5px;
  width: 100%;
  text-align: center;
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