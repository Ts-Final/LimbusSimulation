/*Extermination of Geometrical Organ */

import {Affinities, Affinity, AttackType, RiskLevel} from "../constants.ts";
import {computed, Ref, ref, watch} from "vue";

export const EGO = (function () {
  const storage = [init()]
  const viewing = ref(0)
  const current = computed(
    () => {
      if (viewing.value >= 0) {
        return storage[viewing.value]
      } else {
        return storage[0]
      }
    })

  function init(): EGO.dataType {
    return {
      name: "捕鲸叉",
      source: "以实玛利",
      affinity: "Gloom",
      RiskLevel: "ZAYIN",
      resistance: {
        Wrath: 1,
        Lust: 2,
        Sloth: 2,
        Gluttony: 1,
        Gloom: 0.75,
        Pride: 1,
        Envy: 1,
      },
      resource: {
        Wrath: 2,
        Lust: 0,
        Sloth: 0,
        Gluttony: 0,
        Gloom: 2,
        Pride: 0,
        Envy: 0,
      },
      ATKType: "blunt",
      awakening: {
        coin: 1,
        coinPower: 4,
        basePower: 19,
        sp: 10,

        ATKLevel: -4,
        ATKWeight: 1,
      },
      corrosion: {
        sp: 35,
        has: false,
        coin: 1,
        coinPower: -10,
        basePower: 35,
        ATKLevel: 0,
        ATKWeight: 7,
      }
    }
  }

  const Editor = {
    name: ref(""),
    source: ref(""),
    affinity: ref("Gloom") as Ref<Affinity>,
    resistance: {
      Wrath: ref(1),
      Lust: ref(2),
      Sloth: ref(2),
      Gluttony: ref(1),
      Gloom: ref(0.75),
      Pride: ref(1),
      Envy: ref(1),
    },
    resource: {
      Wrath: ref(2),
      Lust: ref(0),
      Sloth: ref(0),
      Gluttony: ref(0),
      Gloom: ref(2),
      Pride: ref(0),
      Envy: ref(0),
    },
    awakening: {
      coin: ref(1),
      sp: ref(10),
      coinPower: ref(4),
      basePower: ref(19),
      ATKLevel: ref(-4),
      ATKWeight: ref(1),
    },
    // so we have a Blind Obsession here.
    corrosion: {
      has: ref(false),
      coin: ref(1),
      sp: ref(35),
      coinPower: ref(-10),
      basePower: ref(35),
      ATKLevel: ref(0),
      ATKWeight: ref(7),
    },
    ATKType: ref("blunt") as Ref<AttackType>,
    RiskLevel: ref("ZAYIN") as Ref<RiskLevel>,

    assign(ego: EGO.dataType) {
      Editor.name.value = ego.name
      Editor.source.value = ego.source
      Editor.affinity.value = ego.affinity
      Editor.awakening.ATKLevel.value = ego.awakening.ATKLevel
      Editor.awakening.ATKWeight.value = ego.awakening.ATKWeight
      for (const key in ego.resistance) {
        Editor.resistance[(key as Affinity)].value
          = ego.resistance[(key as Affinity)]
      }
      for (const key in ego.resource) {
        Editor.resource[(key as Affinity)].value
          = ego.resource[(key as Affinity)]
      }
      Editor.awakening.coin.value = ego.awakening.coin
      Editor.awakening.coinPower.value = ego.awakening.coinPower
      Editor.awakening.basePower.value = ego.awakening.basePower
      Editor.ATKType.value = ego.ATKType
    }
  }

  watch(Editor.name, (v) => current.value.name = v)
  watch(Editor.source, (v) => current.value.source = v)
  watch(Editor.affinity, (v) => current.value.affinity = v)
  watch(Editor.ATKType, (v) => current.value.ATKType = v)
  watch(Editor.RiskLevel, (v) => current.value.RiskLevel = v)

  watch(Editor.awakening.ATKLevel, (v) => current.value.awakening.ATKLevel = v)
  watch(Editor.awakening.ATKWeight, (v) => current.value.awakening.ATKWeight = v)
  watch(Editor.awakening.coin, (v) => current.value.awakening.coin = v)
  watch(Editor.awakening.coinPower, (v) => current.value.awakening.coinPower = v)
  watch(Editor.awakening.basePower, (v) => current.value.awakening.basePower = v)
  watch(Editor.awakening.sp, (v) => current.value.awakening.sp = v)

  watch(Editor.corrosion.has, (v) => current.value.corrosion.has = v)
  watch(Editor.corrosion.ATKLevel, (v) => current.value.corrosion.ATKLevel = v)
  watch(Editor.corrosion.ATKWeight, (v) => current.value.corrosion.ATKWeight = v)
  watch(Editor.corrosion.coin, (v) => current.value.corrosion.coin = v)
  watch(Editor.corrosion.coinPower, (v) => current.value.corrosion.coinPower = v)
  watch(Editor.corrosion.basePower, (v) => current.value.corrosion.basePower = v)
  watch(Editor.corrosion.sp, (v) => current.value.corrosion.sp = v)

  // Affinity related
  for (const affinity of Affinities) {
    watch(Editor.resistance[affinity],
      (v) => current.value.resistance[affinity] = v)
    watch(Editor.resource[affinity],
      (v) => current.value.resource[affinity] = v)
  }

  function index(v: number): EGO.dataType
  function index(): undefined
  function index(v?: any) {
    if (v === undefined) return undefined
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
    source: string
    affinity: Affinity
    resistance: Record<Affinity, number>
    resource: Record<Affinity, number>
    ATKType: AttackType
    RiskLevel: RiskLevel

    awakening: {
      sp: number
      ATKLevel: number
      ATKWeight: number
      coin: number
      coinPower: number
      basePower: number
    }
    corrosion: {
      has: boolean
      sp: number
      ATKLevel: number
      ATKWeight: number
      coin: number
      coinPower: number
      basePower: number
    }
  }


}