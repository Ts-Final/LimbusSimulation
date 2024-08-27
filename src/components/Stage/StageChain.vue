<script setup lang="ts">

import {chain_token, StageBackend} from '@/core/stage/stageBackend';
import {computed, reactive, Ref, ref, watch} from "vue";
import {clashStat, skillStat} from "@/core/stage/typings.ts";
import StageCard from "@/components/Stage/StageCard.vue";
import {Skill} from "@/core/skill.ts";
import SkillCard from "@/components/skill/SkillCard.vue";
import Coin from "@/components/small/coin.vue";

const tokens = StageBackend.chain_tokens.sort((a, b) => a.speed - b.speed)

const state = ref("one-side") as Ref<"one-side" | "clash">
const pending_time = 1000

const index_source = ref(0)
const index_targets: Ref<number[]> = ref([])

/* data abouts */
const data = reactive({
  skill: 0,
  value: 0,
  total: 0,
  results: [] as (boolean | undefined)[],
})
const skill = computed(() => {
  return Skill.index(data.skill)
})

const clash = reactive({
  A: {
    value: 0,
    lost: 0,
    results: [] as (boolean | undefined)[],
    skill: 0,
  },
  B: {
    value: 0,
    lost: 0,
    results: [] as (boolean | undefined)[],
    skill: 0,
  },
  count: 0
})

watch([data, clash], () => fuck(), {deep: true})

function reset_data() {
  data.skill = 0
  data.value = 0
  data.total = 0
  data.results.clear()
}

function reset_clash() {
  clash.A.value = 0
  clash.A.lost = 0
  clash.A.results = []
  clash.A.skill = 0
  clash.B.value = 0
  clash.B.lost = 0
  clash.B.results = []
  clash.B.skill = 0
  clash.count = 0
}

const paused = ref(false)
const display = ref(true)

function fuck() {
  display.value = !display.value
  setTimeout(
      () => display.value = !display.value,
      10)
}

function loop() {
  if (paused.value) {
    setTimeout(loop, 100)
    return
  }
  const token = tokens.shift()
  if (!token) {
    StageBackend.nextTurn()
    return;
  }
  fuck()
  if (token.type == "one-side") {
    reset_data()
    state.value = "one-side"

    const skill = token.unit.useSkill(token.clash_coin_lost)
    index_source.value = skill.unit.indexInUnits
    index_targets.value = skill.allTarget.map(x => x.indexInUnits)
    data.skill = skill.skill
    setTimeout(() => execute_one_side(skill), pending_time)
  } else if (token.type == 'clash') {
    reset_clash()
    state.value = "clash"

    index_source.value = token.A.indexInUnits
    index_targets.value = [token.B.indexInUnits]
    const clashA = token.A.clash()
    const clashB = token.B.clash()
    clash.A.skill = clashA.skill
    clash.B.skill = clashB.skill
    setTimeout(() => execute_clash(token, clashA, clashB), pending_time)
  }
}

function execute_one_side(skill: skillStat) {
  if (paused.value) {
    setTimeout(() => execute_one_side(skill), 100)
    return
  }
  const result = skill.fn()
  data.value = result.value
  data.total = result.total
  data.results = result.results
  fuck()

  if (result.end)
    setTimeout(loop, 1000)
  else
    setTimeout(() => execute_one_side(skill), pending_time)
}


function execute_clash(token: chain_token & { type: "clash" }, clA: clashStat, clB: clashStat) {
  if (paused.value) {
    setTimeout(() => execute_clash(token, clA, clB), 100)
    return
  }
  const resultA = clA.fn()
  const resultB = clB.fn()

  clash.A.value = resultA.value
  clash.A.results = resultA.results
  clash.A.lost = resultA.coin_lost
  clash.B.value = resultB.value
  clash.B.results = resultB.results
  clash.B.lost = resultB.coin_lost
  clash.count += 1
  fuck()
  if (resultA.value > resultB.value) {
    resultB.coin_lost += 1
    if (resultB.last) {
      tokens.unshift({
        type: 'one-side',
        unit: token.A,
        clash_coin_lost: clash.A.lost,
        speed: 99 // here the speed doesnt matter as it's unshift-ed into the tokens-array
      })
      setTimeout(loop, pending_time)
      return
    }
  } else if (resultA.value < resultB.value) {
    resultA.coin_lost += 1
    if (resultA.last) {
      tokens.unshift({
        type: 'one-side',
        unit: token.B,
        clash_coin_lost: clash.B.lost,
        speed: 99 // here the speed doesnt matter as it's unshift-ed into the tokens-array
      })
      setTimeout(loop, pending_time)
      return
    }
  }
  if (clash.count >= 99) setTimeout(loop, pending_time)
  else setTimeout(() => execute_clash(token, clA, clB), pending_time)
}

loop()

function side(val?: boolean) {
  if (val == undefined) return undefined
  return val ? 'head' : 'tail'
}
</script>

<template>
  <div class="SC-wrapper">
    <div class="pause" @click="paused = !paused">
      <span v-if="!paused">&par;</span>
      <span v-else>&gtdot;</span>
    </div>
    <div v-if="state == 'one-side'" class="one-side-wrapper">
      <div class="one-side-source">
        <SkillCard :skill="skill" />
        <StageCard :unit="StageBackend.units[index_source]"/>
        <div style="display:flex;" v-if="display">
          <coin v-for="res in data.results" :side="side(res)"/>
        </div>
        <div class="value">
          {{ data.value }}
        </div>
        <div>
          TOTAL {{ data.total }}
        </div>
      </div>
      <div class="one-side-enemy">
        <StageCard :unit="StageBackend.units[index]" v-for="index in index_targets"/>
      </div>
    </div>
    <div v-else-if="state == 'clash'" class="clash-wrapper">
      <div>
        <SkillCard :skill="Skill.index(clash.A.skill)" style="background-color:transparent;">
          <div style="display:flex;" v-if="display">
            <Coin v-for="res in clash.A.results" :side="side(res)"></Coin>
          </div>
        </SkillCard>
        <StageCard :unit="StageBackend.units[index_source]"/>
        <div class="value">
          {{ clash.A.value }}
        </div>
      </div>
      <div>
        <SkillCard :skill="Skill.index(clash.B.skill)" style="background-color:transparent;">
          <div style="display:flex;" v-if="display">
            <Coin v-for="res in clash.B.results" :side="side(res)"></Coin>
          </div>
        </SkillCard>
        <StageCard :unit="StageBackend.units[index_targets[0]]"/>
        <div class="value">
          {{ clash.B.value }}
        </div>
      </div>
      <div class="clash-stats">

      </div>
    </div>
  </div>
</template>

<style scoped>
.SC-wrapper {
  width: 100%;
  height: 100%;
}

.pause {
  position: absolute;
  left: 15px;
  top: 15px;
  line-height: 1.6rem;
  border: #7cdcf4 2px solid;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  font-size: 1.6rem;
  text-align: center;
  user-select: none;
  cursor: pointer;
  z-index: 999;
}

.skill-stat {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;
  min-height: 15%;
}

.value {
  font-family: "ExcelsiorSans", sans-serif;
  font-size: 40px;
  color: #f9c501;
}

.one-side-wrapper {
  top: 10%;
  width: 100%;
  position: relative;
  display: flex;

}

.one-side-source {
  min-width: 30%;
  flex-direction: column;
  display: flex;
  align-items: center;
  padding-top: 100px;
}

.one-side-enemy {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 50%;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
}

.clash-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  top: 10%;
  position: relative;
}

.clash-wrapper > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.clash-wrapper > div > * {
  width: 100%;
}
</style>