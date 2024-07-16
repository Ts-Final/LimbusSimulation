<script setup lang="ts">
import {computed, provide} from "vue";
import {ui} from "../../core/ui.ts";
import {GameStorage} from "../../core/GameStorage.ts";
import {FaultLiesYouIshmael} from "../../core/utils/faultLiesYouIshmael.ts";
import BaseEdit from "./BaseEdit.vue";
import EGOEdit from "./EGOEdit.vue";
import SkillEdit from "./SkillEdit.vue";

const unit = computed(() => GameStorage.unit[ui.unit.view.value])
provide("unit", unit)
</script>

<template>
  <div class="UE-wrapper" v-if="ui.display.value">
    <div class="UE-Ishmael" @click="FaultLiesYouIshmael.play()"/>
    <div class="UE-edit-wrapper">
      <BaseEdit/>
      <table cellspacing="0" style="margin-top: 2rem;">
        <tr>
          <td class="none-select pointer" @click="ui.editing.value = 'skill'">
            技能
          </td>
          <td class="none-select pointer" @click="ui.editing.value = 'EGO'">
            E.G.O
          </td>
        </tr>
      </table>
      <div class="UE-ego/skill">
        <SkillEdit v-if="ui.editing.value == 'skill'"/>
        <EGOEdit v-else/>
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
  background-image: url("../../assets/captain.png");
  background-size: cover;
  background-position: -450px 0;
  z-index: 0;
  box-shadow: black 0 0 70px 20px inset;
}

.UE-edit-wrapper {
  position: absolute;
  right: 0;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.UE-ego\/skill {
  height: 70%;
  width: 100%;
  position: relative;
  margin-top: 7px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
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