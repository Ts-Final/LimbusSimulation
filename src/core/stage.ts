/*
import {Identity} from "@/core/identity.ts";
import {deepmerge, randomInteger, shuffle, sorter} from "@/core/utils.ts";
import {Affinity, AttackType, RiskLevel} from "@/core/constants.ts";
import {Ego, EGO} from "@/core/ego.ts";
import {Skill} from "@/core/skill.ts";

function todo() {
  // do nothing.
}

function coin(data: { coin: number, coinPower: number, basePower: number }) {
  return {
    throwing: 0,
    value: data.basePower,
    toss(result: boolean) {
      if (result) this.value += data.coinPower;
      this.throwing += 1
      return this.throwing >= data.coin;
    }

  }
}

class SkillBar {
  data: [number, number][]
  bar1: number[]
  bar2: number[]

  constructor(data: [number, number][]) {
    this.data = data
    if (data.length <= 0) {
      throw new Error("no skill?")
    }
    this.bar1 = []
    this.bar2 = []

    this.generate()
  }

  generate() {
    for (const [index, count] of this.data) {
      this.bar1.push(...Array(count).fill(index))
      this.bar2.push(...Array(count).fill(index))
    }
    shuffle(this.bar1)
    shuffle(this.bar2)
  }

  generate2() {
    this.bar2 = []
    for (const [index, count] of this.data) {
      this.bar2.push(...Array(count).fill(index))
    }
    shuffle(this.bar2)
  }

  use(at: 0 | 1) {
    this.bar1.splice(at, 1)
  }

  check() {
    while (this.bar1.length <= 3) {
      this.generate2()
      this.bar1 = this.bar1.concat(...this.bar2)
    }
  }
}

abstract class StageUnit {
  skillBar: SkillBar
  name: string
  target: StageUnit[]
  /!* The min/max of speed *!/
  speeds: [number, number]
  speed: number
  now: ReturnType<typeof coin>
  level: number
  private staggerRoundFlag: 0 | 1 | 2

  protected constructor(
    {skill, name, speed}:
      { name: string, skill: [number, number][], speed: [number, number] },
    level: number) {
    this._hp = 0
    this._sp = 0
    this._staggerLevel = 0
    this._staggerThreshold = []
    this.staggerRoundFlag = 0
    this.skillBar = new SkillBar(skill)
    this.name = name
    this._pendingSkill = undefined
    this.target = []
    this.speeds = speed
    this.speed = 0
    this.now = coin(Skill.index(0))
    this.level = level
  }

  _staggerLevel: number

  get staggerLevel() {
    return this._staggerLevel
  }

  set staggerLevel(value: number) {
    if (value == 0) this.staggerRoundFlag = 0
    this._staggerLevel = value.clamp(0, 3)
  }

  _staggerThreshold: number[]

  get staggerThreshold() {
    return this._staggerThreshold.sort(sorter.BigToSmall)
  }

  set staggerThreshold(value: number[]) {
    this._staggerThreshold.splice(0, this._staggerThreshold.length)
    this._staggerThreshold.push(...value)
  }

  _hp: number

  get hp() {
    return this._hp
  }

  protected set hp(value) {
    this._hp = value
  }

  _sp: number

  get sp() {
    return this._sp
  }

  set sp(val) {
    this._sp = val
  }

  abstract get resistance(): Identity["resistance"] & Ego["resistance"]

  get staggerCoefficient(): number {
    switch (this.staggerLevel) {
      case 0:
        return 1
      case 1:
        return 2
      case 2:
        return 2.5
      case 3:
        return 3
      default:
        throw new Error("What stagger Level???")
    }
  }

  get stagger() {
    return this._staggerLevel > 0
  }

  get movable() {
    return !this.staggerRoundFlag
  }

  get skillChained() {
    return this.pendingSkill != undefined && this.target.length != 0
  }

  _pendingSkill: number | undefined

  get pendingSkill() {
    return this._pendingSkill
  }

  set pendingSkill(value: number | undefined) {
    this._pendingSkill = value
  }

  checkStaggerThreshold() {
    const pending = this.staggerThreshold.filter(v => v <= this.hp).length
    if (pending) {
      this.staggerLevel += pending
      this.staggerThreshold = this.staggerThreshold.filter(v => v <= this.hp)
      if (!this.staggerLevel) {
        this.staggerLevel = 2
      }
    }
  }

  applyAbsDamage(value: number) {
    this.hp -= value
    this.checkStaggerThreshold()
  }

  applyDamageWithResistance(value: number, affinity?: Affinity, atkType?: AttackType) {
    if (affinity) {
      value *= this.resistance[affinity]
    }
    if (atkType) {
      value *= this.stagger ? this.staggerCoefficient : this.resistance[atkType]
    }
    this.hp -= value
    this.checkStaggerThreshold()
  }

  // this function directly remove the hp and does not check for stagger threshold.
  applyAbsLossHp(value: number) {
    this.hp -= value
  }

  toss() {
    // 来吧，边魅时！（笑）
    const result = this.now.toss(Math.random() * 100 < this.sp)
    this.target.forEach(x => x.applyDamageWithResistance(this.now.value))
    return result
  }

  newTurnStart() {
    this.staggerRoundFlag -= 1
    this._pendingSkill = undefined
    this.speed = randomInteger(Math.min(...this.speeds), Math.max(...this.speeds))
  }

  roundStart() {
    todo()
  }

  setTarget(target: StageUnit[]) {
    this.target.splice(0, this.target.length)
    this.target.push(...target)
  }

}

class IdentityUnit extends StageUnit {
  identity: Identity
  _stagger: number[]
  riskLevel: RiskLevel

  constructor(identity: Identity, level: number) {
    super(identity,level)
    this.level = level
    this.identity = identity
    this._hp = Math.floor(identity.hp.base + identity.hp.modify * level)
    this._stagger = identity.stagger
      .split(" ")
      .map(parseFloat)
      .map(x => x * this._hp)
      .map(Math.floor)
      .sort(sorter.BigToSmall)
    this._staggerLevel = 0
    this.riskLevel = "ZAYIN"
    if (typeof identity.ego.ZAYIN == 'object') throw new Error("Where's my ZAYIN?")
    this.sp = 0
  }

  get resistance() {
    return deepmerge(this.identity.resistance, EGO.index(this.identity.ego[this.riskLevel] as number).resistance)
  }

}

function visual(stage: _Stage) {
  const skill = {
    executor: undefined as number | undefined,
    target: [] as number[],
    value: [],
    damage: {
      total: 0,
      current: 0,
    }
  }
  const basic = {}
  return {
    skill
  }
}

class _Stage {
  started: boolean
  Aside: StageUnit[]
  Eside: StageUnit[]
  shards: {
    A: Record<Affinity, number>,
    E: Record<Affinity, number>
  }
  pending: StageUnit | undefined
  visual: ReturnType<typeof visual>

  constructor() {
    this.started = false
    this.Aside = []
    this.Eside = []
    this.shards = {
      A: {
        wrath: 0,
        lust: 0,
        gloom: 0,
        gluttony: 0,
        envy: 0,
        pride: 0,
        sloth: 0,
      },
      E: {
        wrath: 0,
        lust: 0,
        gloom: 0,
        gluttony: 0,
        envy: 0,
        pride: 0,
        sloth: 0,
      }
    }
    this.pending = undefined
    this.visual = visual(this)
    this._round = 0
  }

  _round: number

  get round() {
    return this._round
  }

  set round(val) {
    this._round = val
  }

  get units() {
    return this.Aside.concat(this.Eside)
  }

  get skill() {
    return {
      chained: this.units.map(x => x.skillChained).includes(false)
    }
  }

  setDataA(i:[Identity, number][]) {
    this.Aside = i.map(x => new IdentityUnit(x[0],x[1]))
  }
  clearSideA() {
    this.Aside = []
  }
  setDataE(i:[Identity, number][]) {
    this.Eside = i.map(x=> new IdentityUnit(...x))
  }
  clearSideE() {
    this.Eside = []
  }

  newTurnStart() {
    this.units.forEach(v => v.newTurnStart())
  }

  runSkill() {
    if (!this.skill.chained) return
  }

  skillPending(unit: StageUnit) {
    this.pending = unit
  }

  skillChosen(target: StageUnit) {
    if (!this.pending) return
    this.pending.target = [target]
  }

  execSkill(unit: StageUnit) {
    if (!unit.skillChained) throw new Error()
  }

  indexAt(index: number) {
    return this.units[index]
  }

  indexedAt(...index: number[]) {
    const r = []
    for (const i of index) {
      r.push(this.units[i])

    }
  }
}*/
