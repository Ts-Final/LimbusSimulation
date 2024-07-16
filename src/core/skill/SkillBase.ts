import {Affinity, AttackType} from "../constants.ts";
import {Ref, ref, watch} from "vue";
import {ui} from "../ui.ts";

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

  export function init(): Skill.dataType {
    return {
      name: "执着鱼叉",
      count: 1,
      ATKType: "Pierce",
      ATKLevel: 3,
      ATKWeight: 1,
      coins: 4,
      coinPower: 3,
      BasePower: 4,
      affinity: "Wrath",
    }
  }

  export const Editor: {
    [key in keyof Skill.dataType]: Ref<Skill.dataType[key]>
  } & {
    assign(data: Skill.dataType): void
  } = {
    count: ref(1),
    name: ref("执着鱼叉"),
    ATKType: ref("Pierce"),
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
  watch(Editor.count, (v) => ui.skill.current.value.count = v)
  watch(Editor.name, (v) => ui.skill.current.value.name = v)
  watch(Editor.ATKType, (v) => ui.skill.current.value.ATKType = v)
  watch(Editor.ATKLevel, (v) => ui.skill.current.value.ATKLevel = v)
  watch(Editor.ATKWeight, (v) => ui.skill.current.value.ATKWeight = v)
  watch(Editor.coins, (v) => ui.skill.current.value.coins = v)
  watch(Editor.coinPower, (v) => ui.skill.current.value.coinPower = v)
  watch(Editor.BasePower, (v) => ui.skill.current.value.BasePower = v)
  watch(Editor.affinity, (v) => ui.skill.current.value.affinity = v)


}