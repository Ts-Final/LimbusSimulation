<script setup lang="ts">
import {StageUnit} from "@/core/stage/stageUnit.ts";
import SkillCard from "@/components/skill/SkillCard.vue";
import {StageBackend} from "@/core/stage/stageBackend.ts";
import {computed} from "vue";
import {resToClass} from "@/core/utils.ts";
import AffinityImg from "@/components/small/affinityImg.vue";
import {Affinity} from "@/core/constants.ts";

const {unit} = defineProps<{ unit: StageUnit }>()
const {hp, sp, speed, threshold, hp_max,
  pending, cartridge, div, using, stagger_level} = unit.refs

function toWidth(t: number) {
  return "width: " + (t / hp_max.value) * 100 + '%'
}

unit.useArrow()
const movable = unit.movable
const stagger_l = computed(() =>"stagger-" + stagger_level.value)

const side = unit.side

const hp_percent = computed(() =>
    `linear-gradient(90deg, #8a2813 0%,` +
    `#a74024 ${hp.value / hp_max.value * 100}%,` +
    `transparent ${hp.value / hp_max.value * 100}%)`)

function isPending(index: 0 | 1) {
  // if pending == cartridge[index], that the index is selected.
  if (typeof pending.value != "number") return ""
  return using.value == index ? " selected" : " unselected"
}

function toEvl(index: 0 | 1) {
  return function (e: DragEvent) {
    if (e.dataTransfer) {
      e.dataTransfer.setData("stage/pending", cartridge.value[index].toString())
      e.dataTransfer.setData("stage/unit", unit.indexInUnits.toString())
      e.dataTransfer.setData("stage/cartridge", index.toString())
    }
  }
}

function drop(e: DragEvent) {
  if (e.dataTransfer) {
    const d_pending = e.dataTransfer.getData("stage/pending")
    const d_unit = e.dataTransfer.getData("stage/unit")
    if (!isFinite(d_pending.num())) return
    if (!isFinite(d_unit.num())) return;
    const pending = d_pending.num()
    const source = StageBackend.index(d_unit.num())
    source.pendingSkill = pending
    source.target.main = unit

  }
}
</script>

<template>
  <div ref="div" class="stage-card-wrapper">
    <div class="stage-card" v-drop="drop" :class="stagger_l+ ' ' + side">
      <div class="status">
        <div class="speed">
          {{ speed }}
        </div>
        <div>
          <div class="hp-bar">
            <div v-for="t in threshold" class="hp-bar-inner"
                 :style="toWidth(t)">
              <div>
                {{ t }}
              </div>
            </div>
          </div>
          <div class="status-inf">
            <div class="hp">
              {{ hp }}
            </div>
            <div class="sp">
              {{ sp }}
            </div>
            <div class="resist">
              抗性
              <div class="resist-popout" :class="side">
                <div>
                  突刺x<span :class="resToClass(unit.resistance.pierce)">{{ unit.resistance.pierce }}</span>
                  斩击x<span :class="resToClass(unit.resistance.slash)">{{ unit.resistance.slash }}</span>
                  打击x<span :class="resToClass(unit.resistance.blunt)">{{ unit.resistance.blunt }}</span>
                </div>
                <div style="display:flex">
                  <div v-for="aff in  Affinity" style="display: grid;grid-template-columns: repeat(7,1fr)">
                    <AffinityImg :affinity="aff" style="max-width: 15px"/>
                    <div :class="resToClass(unit.resistance[aff])">x{{ unit.resistance[aff] }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-html="unit.name"/>
        </div>
      </div>
    </div>
    <template v-if="StageBackend.ui.state == 'chaining'">
      <SkillCard :skill="cartridge[0]" v-if="movable"
                 v-draggable="(e:DragEvent) => toEvl(0)(e)"
                 class="skill" :class="side+isPending(0)"/>
      <SkillCard :skill="cartridge[1]" class="skill-2" v-if="movable"
                 v-draggable="(e:DragEvent) => toEvl(1)(e)"
                 :class="side+isPending(1)"/>
    </template>
  </div>
</template>

<style scoped>
.stage-card-wrapper {
  display: flex;
  flex-direction: row-reverse;
}

.stage-card {
  display: flex;
  width: min-content;
  padding: 5px;
  direction: ltr;
}

.status {
  display: flex;
}

.status-inf {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.hp {
  color: #b61c1c;
  font-family: "ExcelsiorSans", sans-serif;
  font-size: 20px;
}

.sp {
  color: #b8dcee;
  border: #b8dcee 1px solid;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "ExcelsiorSans", sans-serif;
  font-size: 20px;
}

.speed {
  color: #fefe9a;
  font-family: "ExcelsiorSans", sans-serif;
  font-size: 35px;
  margin-right: 5px;
}

.resist {
  border: 2px solid #7cdcf4;
  text-align: center;
  width: 3rem;
  cursor: move;
  position: relative;
}

.resist-popout {
  opacity: 0;
  position: absolute;
  user-select: none;
  pointer-events: none;
  transition: all 0.1s linear;
  background-image: var(--bgi);
  border: #7cdcf4 2px solid;
  max-width: 300px;
  height: 50px;
  top: 5px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  transform: translate(-50%, -50%);
}

.resist:hover .resist-popout {
  opacity: 1;
  box-shadow: #f9c501 0 0 3px 3px;
}


.hp-bar {
  position: relative;
  background-image: v-bind(hp_percent);
  width: calc(150px - 2 * 2px);
  height: calc(15px - 2 * 2px);
  border: 2px solid #8a2813;
  transition: all 0.1s linear;
}

.hp-bar:hover {
  border: 2px solid #f9c501;
  border-radius: 2px;
  box-shadow: 0 0 5px 0 #f9c501;

}

.hp-bar-inner {
  position: absolute;
  height: 100%;
  text-align: right;
  border-right: #f9c501 2px solid;
}

.hp-bar-inner > div {
  opacity: 0;
  transform: translate(50%, -120%);
  transition: opacity 0.1s linear;
  font-family: "ExcelsiorSans", sans-serif;
  right: 0;
  border: #7cdcf4 1px solid;
  padding-left: 3px;
  padding-right: 5px;
  position: absolute;
  background-image: var(--bgi);
}

.hp-bar-inner:hover > div {
  opacity: 1;
}

/*
.skill.A {
  position: absolute;
  left: 100%;
}

.skill.E {
  position: absolute;
  left: -9px;
  transform: translateX(-100%);
}

.skill-2.A {
  position: absolute;
  left: calc(100% + 4px);
  transform: translateX(100%);
}

.skill-2.E {
  position: absolute;
  left: calc(-9px - 4px);
  transform: translateX(-200%);
}
*/

.selected {
  box-shadow: #f9c501aa 0 0 5px 3px;
  opacity: 1;
}

.unselected {
  opacity: 0.5;
}

.stagger-1 {
  box-shadow: #f9c501 0 0 15px 3px inset;
}
.stagger-2 {
  box-shadow: #b60000 0 0 15px 3px inset;
}
.stagger-3 {
  box-shadow: #16ccae 0 0 15px 3px inset;
}
.stage-card.A {
  border: 2px solid #16ccae;
}
.stage-card.E {
  border: 2px solid #b60000;
}
</style>