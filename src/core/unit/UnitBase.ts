import {Skill} from "../skill/SkillBase.ts";
import {AttackType, RiskLevel} from "../constants.ts";
import {computed, Ref, ref, watch} from "vue";
import {EGO} from "../ego/EGOBase.ts";
import {isNumberLike} from "../utils/utils.ts";
import {notify} from "../utils/notify.ts";

export const Unit = (function () {
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
  watch(viewing, (v) => Editor.assign(storage[v]))

  const HP = computed(() => {
    return Math.floor(current.value.hpBase + current.value.hpModifier * 45)
  })

  function staggerThreshold(unit: Unit.dataType) {
    let arr = unit.stagger.split(" ")
    arr = arr.filter(v => v.length > 0)
    let vals = arr.map(v => parseFloat(v))
    vals = vals.sort((a, b) => b - a)
    const hp = HP.value
    return vals.map(v => Math.floor(hp * v)).join(" ")
  }

  function egos(unit: Unit.dataType) {
    const r: Record<string, EGO.dataType> = {}
    if (unit.EGO.ZAYIN != undefined) {
      r.ZAYIN = EGO.index(unit.EGO.ZAYIN)
    } else {
      unit.EGO.ZAYIN = 0
      r.ZAYIN = EGO.index(0)
      notify.error(unit.name + "没有Z级EGO，已将该单位Z级EGO替换为初始EGO。",1000)
    }
    if (unit.EGO.TETH != undefined) {
      r.TETH = EGO.index(unit.EGO.TETH)
    }
    if (unit.EGO.HE != undefined) {
      r.HE = EGO.index(unit.EGO.HE)
    }
    if (unit.EGO.WAW != undefined) {
      r.WAW = EGO.index(unit.EGO.WAW)
    }
    if (unit.EGO.ALEPH != undefined) {
      r.ALEPH = EGO.index(unit.EGO.ALEPH)
    }
    return r

  }

  function init(): Unit.dataType {
    return {
      character: "TerminalFlow",
      name: `羽化A.R.K.="雪芸"`,
      hpBase: 68,
      rarity: 4,
      hpModifier: 2.3,
      defense: -3,
      speedRange: [4, 7],
      affiliation: "Terminal Society Company",
      attackResistance: {
        pierce: 0.5,
        blunt: 2,
        slash: 1,
      },
      stagger: "0.75 0.4 0.2",
      skills: [Skill.init()],
      EGO: {
        ZAYIN: 0,
        TETH: undefined,
        HE: undefined,
        WAW: undefined,
        ALEPH: undefined,
        TARK: undefined,
      },
    }
  }

  const Editor = {
    character: ref("TerminalFlow"),
    name: ref(`羽化A.R.K.="初芸"`),
    hpBase: ref(68),
    rarity: ref(4),
    hpModifier: ref(2.3),
    defense: ref(-3),
    speedRange: [ref(4), ref(7)],
    affiliation: ref("Terminal Society Company"),
    attackResistance: {
      pierce: ref(0.5),
      blunt: ref(2),
      slash: ref(1),
    },
    stagger: ref(""),
    skills: ref([] as Skill.dataType[]),
    EGO: {
      ZAYIN: ref(0),
      TETH: ref(undefined),
      HE: ref(undefined),
      WAW: ref(undefined),
      ALEPH: ref(undefined),
      TARK: ref(undefined),
    } as Record<RiskLevel, Ref<number | undefined>>,

    assign(unit: Unit.dataType) {
      // so we have this fuck until there's a more beautiful way to assign it.
      Editor.character.value = unit.character
      Editor.name.value = unit.name
      Editor.hpBase.value = unit.hpBase
      Editor.rarity.value = unit.rarity
      Editor.hpModifier.value = unit.hpModifier
      Editor.defense.value = unit.defense
      Editor.speedRange[0].value = unit.speedRange[0]
      Editor.speedRange[1].value = unit.speedRange[1]
      Editor.affiliation.value = unit.affiliation
      Editor.attackResistance.pierce.value = unit.attackResistance.pierce
      Editor.attackResistance.blunt.value = unit.attackResistance.blunt
      Editor.attackResistance.slash.value = unit.attackResistance.slash
      Editor.stagger.value = unit.stagger
      Editor.skills.value = unit.skills

      Editor.EGO.ZAYIN.value = unit.EGO.ZAYIN
      if (unit.EGO.TETH) Editor.EGO.TETH.value = unit.EGO.TETH
      if (unit.EGO.HE) Editor.EGO.HE.value = unit.EGO.HE
      if (unit.EGO.WAW) Editor.EGO.WAW.value = unit.EGO.WAW
      if (unit.EGO.ALEPH) Editor.EGO.ALEPH.value = unit.EGO.ALEPH
      if (unit.EGO.TARK) Editor.EGO.TARK.value = unit.EGO.TARK

    }
  }

  // Fuck
  watch(Editor.character, (v) => current.value.character = v)
  watch(Editor.name, (v) => current.value.name = v)
  watch(Editor.hpBase, (v) => current.value.hpBase = v)
  watch(Editor.rarity, (v) => current.value.rarity = v)
  watch(Editor.hpModifier, (v) => current.value.hpModifier = v)
  watch(Editor.defense, (v) => current.value.defense = v)
  watch(Editor.speedRange[0], (v) => current.value.speedRange[0] = v)
  watch(Editor.speedRange[1], (v) => current.value.speedRange[1] = v)
  watch(Editor.affiliation, (v) => current.value.affiliation = v)
  watch(Editor.attackResistance.pierce,
    (v) => current.value.attackResistance.pierce = v ?? 0)
  watch(Editor.attackResistance.blunt,
    (v) => current.value.attackResistance.blunt = v ?? 0)
  watch(Editor.attackResistance.slash,
    (v) => current.value.attackResistance.slash = v ?? 0)
  watch(Editor.stagger, (v) => {
    const values = v.split(" ")
    current.value.stagger =
      values.filter(v => isNumberLike(v))
        .map(v => parseFloat(v))
        .sort((a, b) => b - a)
        .join(" ")
  })
  watch(Editor.skills, (v) => current.value.skills = v)
  watch(Editor.EGO.ZAYIN, v => current.value.EGO.ZAYIN = v ?? 0)
  watch(Editor.EGO.TETH, v => current.value.EGO.TETH = v)
  watch(Editor.EGO.HE, v => current.value.EGO.HE = v)
  watch(Editor.EGO.WAW, v => current.value.EGO.WAW = v)
  watch(Editor.EGO.ALEPH, v => current.value.EGO.ALEPH = v)
  watch(Editor.EGO.TARK, v => current.value.EGO.TARK = v)


  return {
    storage,
    viewing,
    current,
    HP,
    staggerThreshold,
    egos,
    init,
    Editor,

  }
})()

export namespace Unit {
  export interface dataType {
    character: string
    name: string
    rarity: number
    // 基础值
    hpBase: number
    // 每级变动值
    hpModifier: number
    defense: number
    speedRange: [number, number]
    affiliation: string
    attackResistance: Record<AttackType, number>
    stagger: string
    skills: Skill.dataType[]
    EGO: Record<RiskLevel, number | undefined>
  }
}