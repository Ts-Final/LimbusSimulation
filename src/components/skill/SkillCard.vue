<script lang="ts" setup>
import {Skill} from "@/core/skill.ts";
import AtkTypeImg from "@/components/small/atkTypeImg.vue";
import {Ref} from "vue";
import {sound} from "@/core/sound.ts";

const props = defineProps<{ skill: Skill | number, chosen?: Ref<boolean> }>()
const skill = typeof props.skill === "number" ? Skill.index(props.skill) : props.skill
const chosen = props.chosen ?? false

</script>

<template>
  <div :class="skill.affinity + (chosen ? ' skill-card-chosen' :'')"
       @mouseenter="sound.skill.hover.play"
       class="skill-card">
    <div style="margin: 4px">{{ skill.name }}</div>
    <div>
      <div>
        <AtkTypeImg :atk-type="skill.ATKType"/>
        {{ skill.basePower }}{{ skill.coinPower.toSigned() }}&times;{{ skill.coin }}
      </div>
      <div>
        <img src="../../assets/icons/atk.png" style="max-height: 25px" alt="攻等：">
        {{ skill.ATKLevel.toSigned() }}
      </div>
    </div>
    <slot></slot>
  </div>

</template>

<style scoped>
.skill-card {
  max-width: 200px;
  min-width: 150px;
  height: min-content;
  display: flex;
  flex-direction: column;
  border: #7cdcf4 2px solid;
  align-items: center;
  margin: 5px;
  cursor: pointer;
  direction: ltr;
  word-break: break-all;
  line-break: anywhere;

  * {
    user-select: none;
  }
}

.skill-card-type {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  padding: 2px;
  align-items: center;
  justify-content: center;
}

.skill-card-chosen {
  border: #f7f12c 2px solid;
  box-shadow: #bbb516 0 0 5px 5px;
}
</style>