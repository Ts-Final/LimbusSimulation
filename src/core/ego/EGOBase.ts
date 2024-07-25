/*Extermination of Geometrical Organ */

import {Affinities, Affinity, AttackType, RiskLevel} from "../constants.ts";
import {computed, Ref, ref, watch} from "vue";

export const EGO = (function () {
  const storage = [init()]
  const viewing = ref(0)
  const current = computed(() => storage[viewing.value])

  function init(): EGO.dataType {
    return {
      name: "捕鲸叉",
      affinity: "Gloom",
      ATKLevel: -4,
      ATKWeight: 1,
      RiskLevel: "ZAYIN",
      affinityResistance: {
        Wrath: 1,
        Lust: 2,
        Sloth: 2,
        Gluttony: 1,
        Gloom: 0.75,
        Pride: 1,
        Envy: 1,
      },
      Resource: {
        Wrath: 2,
        Lust: 0,
        Sloth: 0,
        Gluttony: 0,
        Gloom: 2,
        Pride: 0,
        Envy: 0,
      },
      coin: 1,
      coinPower: 4,
      basePower: 19,
      ATKType: "blunt"
    }
  }

  const Editor = {
    name: ref(""),
    affinity: ref("Gloom") as Ref<Affinity>,
    ATKLevel: ref(-4),
    ATKWeight: ref(1),
    affinityResistance: {
      Wrath: ref(1),
      Lust: ref(2),
      Sloth: ref(2),
      Gluttony: ref(1),
      Gloom: ref(0.75),
      Pride: ref(1),
      Envy: ref(1),
    },
    Resource: {
      Wrath: ref(2),
      Lust: ref(0),
      Sloth: ref(0),
      Gluttony: ref(0),
      Gloom: ref(2),
      Pride: ref(0),
      Envy: ref(0),
    },
    coin: ref(1),
    coinPower: ref(4),
    basePower: ref(19),
    ATKType: ref("blunt") as Ref<AttackType>,
    RiskLevel:ref("ZAYIN") as Ref<RiskLevel>,

    assign(ego: EGO.dataType) {
      Editor.name.value = ego.name
      Editor.affinity.value = ego.affinity
      Editor.ATKLevel.value = ego.ATKLevel
      Editor.ATKWeight.value = ego.ATKWeight
      for (const key in ego.affinityResistance) {
        Editor.affinityResistance[(key as Affinity)].value
          = ego.affinityResistance[(key as Affinity)]
      }
      for (const key in ego.Resource) {
        Editor.Resource[(key as Affinity)].value
          = ego.Resource[(key as Affinity)]
      }
      Editor.coin.value = ego.coin
      Editor.coinPower.value = ego.coinPower
      Editor.basePower.value = ego.basePower
      Editor.ATKType.value = ego.ATKType
    }
  }

  watch(Editor.name, (v) => current.value.name = v)
  watch(Editor.affinity, (v) => current.value.affinity = v)
  watch(Editor.ATKLevel, (v) => current.value.ATKLevel = v)
  watch(Editor.ATKWeight, (v) => current.value.ATKWeight = v)
  watch(Editor.coin, (v) => current.value.coin = v)
  watch(Editor.coinPower, (v) => current.value.coinPower = v)
  watch(Editor.basePower, (v) => current.value.basePower = v)
  watch(Editor.ATKType, (v) => current.value.ATKType = v)
  for (const affinity of Affinities) {
    watch(Editor.affinityResistance[affinity],
      (v) => current.value.affinityResistance[affinity] = v)
    watch(Editor.Resource[affinity],
      (v) => current.value.Resource[affinity] = v)
  }

  function index(v: number) {
    return storage[v]
  }

  return {
    storage,
    viewing,
    current,
    index,
    Editor,
    init,
  }
})()

export namespace EGO {

  export interface dataType {
    name: string
    affinity: Affinity
    ATKLevel: number
    ATKWeight: number
    affinityResistance: Record<Affinity, number>
    Resource: Record<Affinity, number>
    coin: number
    coinPower: number
    basePower: number
    ATKType: AttackType
    RiskLevel:RiskLevel
  }


}