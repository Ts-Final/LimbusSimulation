<script lang="ts" setup>
import {Skill} from "@/core/skill.ts";
import {range} from "@/core/utils.ts";
import AtkTypeImg from "@/components/small/atkTypeImg.vue";
import {Ref} from "vue";

const props = defineProps<{ skill: Skill, chosen?: Ref<boolean> }>()
const skill = props.skill
const chosen = props.chosen ?? false

</script>

<template>
  <div :class="skill.affinity + (chosen ? ' skill-card-chosen' :'')"
       class="skill-card">
    <div style="margin: 4px">{{ skill.name }}</div>
    <div class="skill-card-type">
      <AtkTypeImg v-for="_ in range(skill.coin)" :atk-type="skill.ATKType"/>
    </div>
    <div>
      {{ skill.basePower }}{{ skill.coinPower.toSigned() }}&times;{{ skill.coin }}
    </div>
    <slot>

    </slot>
  </div>

</template>

<style scoped>
.skill-card {
  width: 200px;
  height: min-content;
  display: flex;
  flex-direction: column;
  border: #7cdcf4 2px solid;
  align-items: center;
  margin: 5px;
  cursor: pointer;


  word-break: break-all;
  line-break: anywhere;
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