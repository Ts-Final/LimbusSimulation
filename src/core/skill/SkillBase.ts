import {Affinity, AttackType} from "../constants.ts";
import {computed, Ref, ref, watch} from "vue";
import {Unit} from "../unit/UnitBase.ts";

export const Skill = (function () {
  const viewing = ref(0)
  const current = computed(() => Unit.current.value.skills[viewing.value])

  watch(viewing, (v) => Editor.assign(Unit.current.value.skills[v]))

  function init(): Skill.dataType {
    return {
      name: "执着鱼叉",
      count: 1,
      ATKType: "pierce",
      ATKLevel: 3,
      ATKWeight: 1,
      coins: 4,
      coinPower: 3,
      BasePower: 4,
      affinity: "Wrath",
    }
  }

  const Editor: {
    [key in keyof Skill.dataType]: Ref<Skill.dataType[key]>
  } & {
    assign(data: Skill.dataType): void
  } = {
    count: ref(1),
    name: ref("执着鱼叉"),
    ATKType: ref("pierce"),
    ATKLevel: ref(3),
    ATKWeight: ref(1),
    coins: ref(4),
    coinPower: ref(3),
    BasePower: ref(4),
    affinity: ref("Wrath"),

    assign(data: Skill.dataType) {
      Editor.name.value = data.name
      Editor.count.value = data.count
      Editor.ATKType.value = data.ATKType
      Editor.ATKLevel.value = data.ATKLevel
      Editor.ATKWeight.value = data.ATKWeight
      Editor.coins.value = data.coins
      Editor.coinPower.value = data.coinPower
      Editor.BasePower.value = data.BasePower
      Editor.affinity.value = data.affinity

    }
  }

  watch(Editor.count, (v) => current.value.count = v)
  watch(Editor.name, (v) => current.value.name = v)
  watch(Editor.ATKType, (v) => current.value.ATKType = v)
  watch(Editor.ATKLevel, (v) => current.value.ATKLevel = v)
  watch(Editor.ATKWeight, (v) => current.value.ATKWeight = v)
  watch(Editor.coins, (v) => current.value.coins = v)
  watch(Editor.coinPower, (v) => current.value.coinPower = v)
  watch(Editor.BasePower, (v) => current.value.BasePower = v)
  watch(Editor.affinity, (v) => current.value.affinity = v)


  return {
    viewing,
    current,
    init,
    Editor
  }
})()
export namespace Skill {
  export interface dataType {
    name: string
    count: number
    ATKType: AttackType
    ATKLevel: number
    ATKWeight: number
    coins: number
    coinPower: number
    BasePower: number
    affinity: Affinity
  }
}