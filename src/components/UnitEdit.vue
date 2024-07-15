<script setup lang="ts">
import {ui} from "../core/ui.ts";
import {computed} from "vue";
import {Storage} from "../core/Storage.ts";
import {FaultLiesYouIshmael} from "../core/utils/faultLiesYouIshmael.ts";
import {Unit} from "../core/unit/UnitDataBase.ts";

const unit = computed(() => Storage.unit[ui.unit.view.value])
const editor = Unit.Editor
</script>

<template>
  <div class="UE-wrapper" v-if="ui.display">
    <div class="UE-Ishmael" @click="FaultLiesYouIshmael.play()"/>
    <div class="UE-edit-top">
      <div class="UE-first-row">
        <input type="text" class="UE-character"
               v-model="editor.character.value"
               @input="unit.character = editor.character.value">
        <input type="text" class="UE-name"
               v-model="editor.name.value"
               @input="unit.name = editor.name.value">
        <table class="UE-Levels" cellspacing="0">
          <tr>
            <td colspan="9" style="height: 1.5rem;">
              基础信息
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <img src="../assets/icos/hp.png" alt="体力" style="width: 30px;">
            </td>
            <td colspan="2">
              <img src="../assets/icos/def.png" alt="防御" style="width: 30px;"/>
            </td>
            <td colspan="3">混乱阈值</td>
            <td colspan="2">速度</td>
          </tr>
          <tr>
            <td>基础值</td>
            <td>
              <input type="text" v-model="editor.hpBase.value"
                     @input="unit.hpBase = editor.hpBase.value">
            </td>
            <td rowspan="2">变动值</td>
            <td rowspan="2">
              <input type="text" v-model="editor.defense.value"
                     @input="unit.defense = editor.defense.value">
            </td>
            <td>
              <input type="text" v-model="editor.stagger[0].value"
                     @input="unit.stagger[0] = editor.stagger[0].value">
            </td>
            <td>
              <input type="text" v-model="editor.stagger[1].value"
                     @input="unit.stagger[1] = editor.stagger[1].value">
            </td>
            <td>
              <input type="text" v-model="editor.stagger[2].value"
                     @input="unit.stagger[2] = editor.stagger[2].value">
            </td>
            <td>
              <input type="text" v-model="editor.speedRange[0].value"
                     @input="unit.speedRange[0] = editor.speedRange[0].value">
            </td>
            <td>
              <input type="text" v-model="editor.speedRange[1].value"
                     @input="unit.speedRange[1] = editor.speedRange[1].value">
            </td>
          </tr>
          <tr>
            <td>变动值</td>
            <td>
              <input type="text" v-model="editor.hpModifier.value"
                     @input="unit.hpModifier = editor.hpModifier.value">
            </td>
            <td colspan="3">
              如只有2个，请把最后一个设为0
            </td>
            <td colspan="2">
              ???
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.UE-wrapper {
  position: relative;
  left: 10vw;
  width: 90vw;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.UE-Ishmael {
  position: relative;
  width: 40%;
  height: 100%;
  background-image: url("../assets/captain.png");
  background-size: cover;
  background-position: -450px 0;
  z-index: 0;
  box-shadow: black 0 0 70px 20px inset;
}

.UE-edit-top {
  position: absolute;
  right: 0;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.UE-first-row {
  height: 30%;
  width: 100%;
  position: relative;
}

.UE-character {
  position: absolute;
  left: 10%;
  top: 20%;
  font-size: 2rem;
  font-family: "Mikodacs", sans-serif;
  color: #b8dcee;
  font-weight: bold;
}

.UE-name {
  position: absolute;
  right: 10%;
  top: 50%;
  color: #b8dcee;
  width: 40%;
  text-align: right;

  font-family: "Mikodacs", sans-serif;
  font-size: 1.5rem;
}

.UE-Levels {
  position: absolute;
  top: 80%;
  left: 10%;
  width: 80%;
  background-color: transparent;
  border-right: 1px solid gray;
  border-top: 1px solid gray;

}

table td {
  align-items: center;
  text-align: center;
  border-bottom: 1px solid gray;
  border-left: 1px solid gray;
  color: #b8dcee;
  width: 10%;
}

table input {
  text-align: center;
}
</style>