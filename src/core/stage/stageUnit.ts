import {randomInteger, shuffle, sorter} from "@/core/utils.ts";
import {Identity} from "@/core/identity.ts";
import {EGO, Ego} from "@/core/ego.ts";
import {Affinity, AttackType, RiskLevel} from "@/core/constants.ts";
import {Skill} from "@/core/skill.ts";
import {StageBackend} from "@/core/stage/stageBackend.ts";
import {computed, onMounted, onUnmounted, ref, Ref, watch} from "vue";
import {clashStat, skillStat} from "@/core/stage/typings.ts";


function fuck(): never {
  throw new Error()
}

function notUndefined<T>(v: T | undefined): v is T {
  return v !== undefined
}

export abstract class StageUnit {
  name: string
  target: {
    _main: StageUnit | undefined,
    get main(): StageUnit | undefined,
    set main(val),
    others: StageUnit[]
  }
  speeds: [number, number]
  level: number
  skills: [number, number][]
  side: "A" | "E"
  refs: {
    hp: Ref<number>
    sp: Ref<number>
    pending: Ref<number | undefined>
    threshold: Ref<number[]>
    speed: Ref<number>
    hp_max: Ref<number>
    cartridge: Ref<number[]>
    div: Ref<HTMLDivElement | null>
    targetFlag: Ref<boolean>
    using: Ref<number>
    stagger_level: Ref<number>
  }
  arrow: HTMLDivElement

  protected constructor(
    side: "A" | "E",
    name: string,
    speed: [number, number],
    skill: [number, number][],
    level: number,) {
    this.side = side
    this._hp = 0
    this._sp = 0
    this._staggerThreshold = []
    this.name = name
    this._pendingSkill = undefined
    this.speeds = speed
    this._speed = 0
    this.level = level
    this.skills = skill
    this._stagger_level = 0

    const targetFlag = ref(false)
    const this1 = this
    this.target = {
      others: [],
      _main: undefined,
      get main() {
        return this._main
      },
      set main(target) {
        const x = this._main
        this._main = target
        targetFlag.value = !targetFlag.value
        this1.update_target()
        if (x) x.update_target()
        if (target) target.update_target()
      }
    }
    this.refs = {
      hp: ref(0),
      sp: ref(0),
      pending: ref(undefined),
      threshold: ref(this._staggerThreshold),
      speed: ref(0),
      hp_max: ref(0),
      cartridge: ref([]),
      div: ref(null),
      targetFlag: targetFlag,
      using: ref(0),
      stagger_level: ref(0)
    }
    this._hp_max = 0
    this._cartridge = []

    this.updateCartridge()
    this.arrow = document.createElement("div")

    function cb(this: StageUnit) {
      this.updateArrow()
    }

    watch(targetFlag, cb.bind(this))
  }

  _stagger_level: number

  get stagger_level() {
    return this._stagger_level
  }

  set stagger_level(value) {
    this._stagger_level = value.clamp(0, 3)
    this.refs.stagger_level.value = value
  }

  _speed: number

  get speed() {
    return this._speed
  }

  set speed(v) {
    this._speed = v
    this.refs.speed.value = v
  }

  _cartridge: number[]

  get cartridge() {
    return this._cartridge
  }

  set cartridge(value: number[]) {
    this._cartridge = value
    this.refs.cartridge.value = value
  }

  _hp_max: number

  get hp_max() {
    return this._hp_max
  }

  set hp_max(value) {
    this._hp_max = value
    this.refs.hp_max.value = value
  }

  _staggerThreshold: number[]

  get staggerThreshold() {
    return this._staggerThreshold.sort(sorter.BigToSmall)
  }

  set staggerThreshold(value: number[]) {
    this._staggerThreshold = value.map(Math.round).sort(sorter.BigToSmall)
    this.refs.threshold.value = this._staggerThreshold
  }

  _hp: number

  get hp() {
    return this._hp
  }

  protected set hp(value) {
    value = Math.round(value)
    this._hp = value
    this.refs.hp.value = value
  }

  _sp: number

  get sp() {
    return this._sp
  }

  set sp(val) {
    this._sp = val
    this.refs.sp.value = val
  }

  abstract get resistance(): Record<AttackType | Affinity, number>

  _pendingSkill: number | undefined

  get pendingSkill() {
    return this._pendingSkill
  }

  set pendingSkill(value: number | undefined) {
    this._pendingSkill = value
    this.refs.pending.value = value
    this.refs.using.value = this.cartridge.indexOf(value ?? -1)
  }

  get willClash() {
    if (this.target.main) {
      return this.target.main.target.main == this
    }
    return false
  }

  /*toss() {
    // 来吧，边魅时！（笑）
    const result = this.now.toss(Math.random() * 100 < this.sp)
    this.target.main
    return result
  }*/

  get indexInUnits() {
    return StageBackend.units.findIndex(u => u == this)
  }

  get movable() {
    return computed(() => {
      return this.refs.hp.value >= 0 && this.refs.stagger_level.value <= 0
    })
  }

  get stagger() {
    return this.stagger_level > 0
  }

  get alive() {
    return this.hp > 0
  }

  applyAbsDamage(value: number) {
    this.hp -= value
  }

  applyDamageWithResistance(value: number, affinity?: Affinity, atkType?: AttackType) {
    if (!this.alive) return 0
    if (affinity) {
      value *= this.resistance[affinity]
    }
    if (atkType) {
      value *= this.resistance[atkType]
    }
    this.hp -= value

    this.checkStaggerThreshold()
    return value
  }

  checkStaggerThreshold() {
    const length = this.staggerThreshold.filter(x => x >= this.hp).length
    if (length) {
      this.stagger_level += length
      this.staggerThreshold = this.staggerThreshold.filter(x => x < this.hp)
      if (this.stagger) StageBackend.setTimeout(() => {
        this.stagger_level = 0
      }, 2)
    }
  }

  // this function directly remove the hp and does not check for stagger threshold.
  applyAbsLossHp(value: number) {
    this.hp -= value
  }

  raise(): never {
    throw new Error()
  }

  checkSkillUseCondition() {
    if (!this.movable) return false
    if (!this.pendingSkill) return false
    if (!this.target.main) return false
    //
    return true
  }

  clash(): clashStat {
    if (!this.target.main) fuck()
    if (!notUndefined(this.pendingSkill)) fuck()

    const skill = Skill.index(this.pendingSkill)
    /*let x = skill.basePower
    for (let i = coin_lost; i < skill.coin; i++) {
      x += Math.random() <= this.sp * 100 ? skill.coinPower : 0
    }
    return x*/
    const unit = this
    // return function (coin_lost = 0): clashStat {
    //   let x = skill.basePower
    //   const results = []
    //   for (let i = coin_lost; i < skill.coin; i++) {
    //     const result = Math.random() <= (unit.sp + 50) / 100
    //      x += result ? skill.coinPower : 0
    //     results.push(result)
    //   }
    //   return {
    //     value: x,
    //     results,
    //     last: skill.coin - coin_lost <= 1
    //   }
    // }
    return {
      value: skill.basePower,
      fn() {
        this.value = skill.basePower
        const results: boolean[] = []
        for (let i = this.coin_lost; i < skill.coin; i++) {
          const res = Math.random() <= (this.unit.sp + 50) / 100
          this.value += res ? skill.coinPower : 0
          results.push(res)
        }
        this.last = skill.coin - this.coin_lost <= 1
        this.results = results
        return this
      },
      coin_lost: 0,
      last: false,
      unit,
      results: Array(skill.coin).fill(undefined),
      skill: this.pendingSkill
    }
  }

  useSkill(coin_lost = 0): skillStat {
    if (!this.movable) fuck()
    if (!notUndefined(this.pendingSkill)) fuck()
    if (!this.target.main) fuck()

    const stage = StageBackend
    const skill = Skill.index(this.pendingSkill)
    const allTarget = [this.target.main, ...this.target.others]
    /*for (let i = result?.coin_lost ?? 0; i < skill.coin; i++) {
      const result = Math.random() <= this.sp * 100
      stat.results.push(result)
      stat.value += result ? skill.coinPower : 0

      // After changing the value of power, then calc the base dmg
      // basing on the unit's situations.
      // now just don't really implement the step.
      const dmg = stat.value

      allTarget.forEach(u =>
        u.applyDamageWithResistance(dmg, skill.affinity, skill.ATKType))
    }*/
    stage.gainResource(this.side, skill.affinity)
    this.cartridge = this.cartridge.splice(0,1)

    return {
      skill: this.pendingSkill,
      value: skill.basePower,
      results: Array(skill.coin - coin_lost).fill(undefined),
      current: coin_lost,
      max: skill.coin -1,
      end: false,
      total: 0,
      fn() {
        const result = Math.random() <= (this.unit.sp + 50) / 100
        this.results[this.current - coin_lost] = result
        this.value += result ? skill.coinPower : 0

        for (const target of allTarget) {
          this.total += target.applyDamageWithResistance(
            this.value, skill.affinity, skill.ATKType)
        }

        if (allTarget.every(x => !x.alive)) {
          // 全死了
          this.end = true
        }
        if (this.current >= this.max) {
          this.end = true
        }
        this.current += 1
        return this
      },
      unit: this,
      allTarget: allTarget
    }
  }

  updateCartridge() {
    while (this.cartridge.length < 4) {
      const arr = []
      for (const item of this.skills) {
        for (let j = 0; j < item[1]; j++) {
          arr.push(item[0])
        }
      }
      this.cartridge = this.cartridge.concat(shuffle(arr))
    }
  }

  updateSpeed() {
    this.speed = randomInteger(...this.speeds)
  }

  update_target() {
    this.update_clash()
  }

  update_clash() {
    if (!this.target.main) return
    if (this.target.main.target.main == this)
      this.arrow.classList.add("clash")
    else this.arrow.classList.remove("clash")
  }

  updateArrow() {
    if (!this.target.main) {
      this.arrow.style.display = "none"
      return
    }
    if (!this.refs.div.value) return
    if (!this.target.main.refs.div.value) return

    const rect = this.refs.div.value.getBoundingClientRect()
    const target_rect = this.target.main.refs.div.value.getBoundingClientRect()

    const start = this.getArrowPosition(rect, this.side)
    const end = this.getArrowPosition(target_rect, this.target.main.side)

    const middle = {x: (start.x + end.x) / 2, y: (start.y + end.y) / 2}
    const delta = {x: (end.x - start.x), y: (end.y - start.y)}


    // 勾 股 定 理
    const width = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y) ** 2)
    // the width here actually is 30px shorter than the real width, as we have a
    // 10px's border-right and 10px's arrow('s position) offset and 10px's arrow
    // thin. So -30px here.
    this.arrow.style.width = width - 30 + "px"

    /*to find the original position of the array, firstly lets draw that:
    * *-------------+ the line is drawn in the opposite *(s), and here we
    * |             | have horizontally dx / (anyway)ly dy, and we know
    * |             | the center of the rect is that (const) middle = {x,y}.
    * +-------------*
    * Then we calculate the width by fucking x^2 + y^2 = z^2,
    * and we have the angle calculated by:
    * (dy/dx) => tan(angle), and fuck it with a arctan() to get that angle.
    * Since the arrow div should be like this(<==) so we have to simply add
    * a 190deg to rotate it.
    * After getting those, we have the center('s position) and the width,
    * so the element's left/top should be like dis:
    * */

    const widthSideOffset = this.side == "A" ? 5 : 8

    this.arrow.style.left = middle.x - width / 2 + widthSideOffset + "px"
    this.arrow.style.top = middle.y - 5 / 2 + "px" // here 5px for the arrow's height.

    const angle = Math.atan(delta.y / delta.x)
    const deg180 = Math.acos(-1)
    if (this.side == "A")
      this.arrow.style.transform = `rotate(${angle - deg180}rad)`
    else this.arrow.style.transform = `rotate(${angle}rad)`


    /*const sin = Math.sin((end.y - start.y) / width)
    const angle = Math.asin(sin)
    // 用负的是因为这个sb东西正着顺时针转。服了哥们，我们数学不存在了（不是
    this.arrow.style.transform = `rotateZ(${angle}rad) rotateY(180deg)`*/
    this.arrow.style.display = "block"
  }

  fuckArrow() {
    for (const arrow of document.getElementsByClassName("line-arrow")) {
      arrow.remove()
    }
  }

  useArrow() {
    onMounted(this.initArrow.bind(this))
    onUnmounted(this.fuckArrow.bind(this))
  }

  getArrowPosition(rect: DOMRect, side: "A" | "E") {
    const x = side == "A" ? rect.left + rect.width : rect.left
    const y = rect.top + rect.height / 2
    return {x, y}
  }

  initArrow() {
    // a &gt; instead, as the fucking innerText doesnt specify that.
    this.arrow.style.position = "absolute"
    this.arrow.style.display = "none"
    this.arrow.classList.add("line-arrow")
    document.getElementById("app")?.appendChild(this.arrow)

  }

  stageStart() {
    this.updateCartridge()
    this.updateSpeed()
  }

  turnStart() {
    this.updateCartridge()
    this.pendingSkill = undefined
    this.target.main = undefined
    this.updateSpeed()
  }

}

export class IdentityStageUnit extends StageUnit {
  data: Identity
  egoLevel: RiskLevel

  constructor(side: "A" | "E", data: Identity) {
    super(side,
      data.character + "<br>" + data.name,
      data.speed,
      data.skill,
      data.level)
    this.data = data
    this.egoLevel = "ZAYIN"
    this.hp = data.hp.base + data.hp.modify * data.level
    this.hp_max = this.hp
    this.staggerThreshold = data.stagger
      .split(" ")
      .map(parseFloat)
      .sort(sorter.BigToSmall)
      .map(x => x * this.hp)

  }

  get resistance(): Identity["resistance"] & Ego["resistance"] {
    return {
      ...this.data.resistance,
      ...this.ego_Must(this.egoLevel).resistance
    }
  }

  ego(level?: RiskLevel) {
    if (typeof this.data.ego["ZAYIN"] != "number") throw new Error("Where my Z ego?")
    if (!level) return EGO.index(this.data.ego["ZAYIN"])
    return EGO.index(this.data.ego[level] ?? 0)
  }

  ego_Must(level?: RiskLevel) {
    if (typeof this.data.ego["ZAYIN"] != "number") throw new Error("Where my Z ego?")
    if (!level) level = "ZAYIN"
    if (typeof this.data.ego[level] != "number") throw new Error("Calling must-return-EGO with not-equipped level")
    else return EGO.index(this.data.ego[level] ?? 0)
  }


}