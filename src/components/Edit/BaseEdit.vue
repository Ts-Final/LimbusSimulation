<script setup lang="ts">
import {computed, ComputedRef, inject, ref, watch} from "vue";
import {Unit} from "../../core/unit/UnitBase.ts";
import {notify} from "../../core/utils/notify.ts";
import {FaultLiesYouIshmael} from "../../core/utils/faultLiesYouIshmael.ts";

const unit = inject("unit") as ComputedRef<Unit.dataType>
const editor = Unit.Editor
const staggerEditor = Unit.StaggerEditor

function hpCalc(level: number = 45) {
  if (!level) {
    level = 45
  }
  const value = Number(editor.hpBase.value)
      + level * Number(editor.hpModifier.value)
  return Math.floor(value)
}
/*
* Using 2 values here is going to satisfy those who wants to have multiple
* stagger-thresholds. To implement this, the "thresholdIndex" shows the index
* of the threshold editing, and the "Data" represents the current value.
*
* To bind the editing with the values stored, those refs are watched.
*
* But if you simply change the Index and trigger the watcher, this will
* unintentionally trigger the "Data"'s watcher and reassign the value.
*
* This seemly has no effect.
* It has no effect (except slight time executing) really tho.
* */
const thresholdIndex = ref(1)
watch(thresholdIndex, (value) => {
  thresholdData.value = staggerEditor.indexAt(value - 1)
})

const thresholdData = ref(staggerEditor.indexAt(0) ?? 0)
watch(thresholdData, (value) =>
    staggerEditor.modify(thresholdIndex.value - 1, value)
)

const hasThreshold = ref(staggerEditor.arr.length > 0)

const RarityWidth = computed(() => editor.rarity.value * 12 + "px")

function scrollHandler(ev: WheelEvent) {
  const deltaY = ev.deltaY
  if (deltaY < 0) {
    if (editor.rarity.value == 101) {
      FaultLiesYouIshmael.FuckYouDante("碰我帽子了！")
    }
    editor.rarity.value += 1
  } else if (editor.rarity.value == 1) {
    notify.error("没灯啦！", 1000)
    return
  } else {
    editor.rarity.value -= 1
  }
}

function addStaggerThreshold() {
  staggerEditor.push(0)
  hasThreshold.value = staggerEditor.arr.length > 0
  thresholdIndex.value = staggerEditor.arr.length
}

function deleteThreshold() {
  if (staggerEditor.length == 0) {
    notify.error("不是哥们？", 1000)
    return
  }
  if (staggerEditor.length == 1) {
    staggerEditor.clear()
    hasThreshold.value = false
    return;
  }
  staggerEditor.delete(thresholdIndex.value - 1)
  console.log("editor",editor.stagger.value)
  console.log("unit", unit.value.stagger)
  thresholdIndex.value = 1
  thresholdData.value = staggerEditor.indexAt(0)
}
</script>

<template>
  <div class="UE-first-row">
    <input type="text" class="UE-character"
           v-model="editor.character.value">
    <input type="text" class="UE-name"
           v-model="editor.name.value">
    <div class="UE-rarity" @wheel="scrollHandler">

    </div>
    <table class="UE-Levels" cellspacing="0">
      <tr>
        <td colspan="5" style="height: 1.5rem;">
          基础信息
        </td>
        <td colspan="2">
          请输入等级：
        </td>
        <td>
          <input type="text" v-model="editor.level.value"
                 placeholder="45">
        </td>
      </tr>
      <tr>
        <td colspan="1">
          <img src="../../assets/icos/hp.png" alt="体力" style="width: 30px;">
        </td>
        <td style="font-weight: bold">
          {{ hpCalc(editor.level.value) }}
        </td>
        <td colspan="2">
          <img src="../../assets/icos/def.png" alt="防御" style="width: 30px;"/>
        </td>
        <td colspan="2">混乱阈值</td>
        <td colspan="2">速度</td>
      </tr>
      <tr>
        <td>基础值</td>
        <td>
          <input type="text" v-model="editor.hpBase.value">
        </td>
        <td rowspan="2">变动值</td>
        <td rowspan="2">
          <input type="text" v-model="editor.defense.value">
        </td>
        <template v-if="hasThreshold">
          <td>
            第：
            <input type="number" v-model="thresholdIndex" style="width: 3rem;"
                   min="1" :max="editor.stagger.value.split(' ').length">
          </td>
          <td>
            <input type="text" v-model="thresholdData">
          </td>
        </template>
        <template v-else>
          <td colspan="2">
            没有混乱阈值。
          </td>
        </template>
        <td>
          <input type="text" v-model="editor.speedRange[0].value">
        </td>
        <td>
          <input type="text" v-model="editor.speedRange[1].value">
        </td>
      </tr>
      <tr>
        <td>变动值</td>
        <td>
          <input type="text" v-model="editor.hpModifier.value">
        </td>
        <td class="pointer" @click="addStaggerThreshold">加一条</td>
        <td class="pointer" @click="deleteThreshold">删掉这条</td>
        <td colspan="2">
          ???
        </td>
      </tr>
    </table>
  </div>
</template>


<style scoped>
.UE-first-row {
  width: 100%;
  position: relative;
  height: 40%;
}

.UE-character {
  position: absolute;
  left: 10%;
  top: 10%;
  font-size: 2rem;
  font-family: "Mikodacs", sans-serif;
  color: #b8dcee;
  font-weight: bold;
}

.UE-name {
  position: absolute;
  right: 10%;
  top: 30%;
  color: #b8dcee;
  width: 40%;
  text-align: right;

  font-family: "Mikodacs", sans-serif;
  font-size: 1.5rem;
}

.UE-rarity {
  top: calc(30% - 22px);
  right: 10%;
  width: v-bind(RarityWidth);
  position: absolute;
  height: 20px;
  background-image: url("../../assets/rarity.png");
}

.UE-Levels {
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 80%;

}


table input {
  text-align: center;
}

select {
  background-color: transparent;
  border: none;
}

option {
  background-color: #080604;
}
</style>