import {StageUnit} from "@/core/stage/stageUnit.ts";
import {Affinity} from "@/core/constants.ts";
import {fromKeys} from "@/core/utils.ts";
import {reactive} from "vue";

type ui_state = "pre-stage" | "chaining" | "running"
const ui = reactive({
  state: "pre-stage" as ui_state,
  switch(val: ui_state) {
    this.state = val
    if (val === "chaining") StageBackend.stageStart()
  },
  turn: 1,
  wave: 1,
})

export type chain_token = {
  type: "clash",
  A: StageUnit,
  B: StageUnit,
  speed: number
} | {
  type: "one-side",
  unit: StageUnit,
  speed: number,
  clash_coin_lost?: number
}

class stageBackend {
  units: StageUnit[]
  resourceA: Record<Affinity, number>
  resourceE: Record<Affinity, number>
  ui = ui
  handlers: Record<number, (() => any)[]>

  constructor() {
    this.units = []
    this.resourceA = fromKeys(Affinity, () => 0)
    this.resourceE = fromKeys(Affinity, () => 0)
    this.handlers = {}
  }

  get sideA() {
    return this.units.filter(x => x.side == "A")
  }

  get sideE() {
    return this.units.filter(x => x.side == "E")
  }

  get wave() {
    return this.ui.wave
  }

  set wave(v) {
    this.ui.wave = v
  }

  get turn() {
    return this.ui.turn
  }

  set turn(v) {
    this.ui.turn = v
  }

  get sorted() {
    return this.units.toSorted((a, b) => b.speed - a.speed)
  }

  get chain_tokens() {
    const token: chain_token[] = []
    const fucked: StageUnit[] = []
    for (const unit of this.sorted) {
      if (fucked.includes(unit)) continue
      if (unit.pendingSkill == undefined) continue
      if (unit.willClash) {
        const target = unit.target.main as StageUnit
        fucked.push(target)
        token.push({
          type: "clash",
          A: unit,
          B: target,
          speed: unit.speed
        })
      } else {
        token.push({
          type: "one-side",
          unit,
          speed: unit.speed
        })
      }
    }
    return token
  }

  gainResource(side: "A" | "E", affinity: Affinity, count = 1) {
    (side == "A" ? this.resourceA : this.resourceE)[affinity] += count
  }

  setUnits(units: StageUnit[]): void {
    this.units = units
  }

  stageStart() {
    this.units.forEach(e => e.stageStart())
  }

  index(n: number) {
    return this.units[n]
  }

  runChain() {
    this.ui.switch("running")

  }

  nextTurn() {
    this.turn += 1
    this.turnStart()
    ui.switch("chaining")
  }

  turnStart() {
    if (this.handlers[this.turn]) {
      this.handlers[this.turn].forEach(x => x())
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this.handlers[this.turn]
    }
    this.units.sort((a, b) => a.speed - b.speed).forEach(x => x.turnStart())
  }

  setTimeout(fn: () => any, turn: number) {
    if (!this.handlers[this.turn + turn]) {
      this.handlers[this.turn + turn] = []
    }
    this.handlers[this.turn + turn].push(fn)
  }
}

export type StageBackend = stageBackend

export const StageBackend = new stageBackend()

// @ts-ignore
window.stageBackend = StageBackend