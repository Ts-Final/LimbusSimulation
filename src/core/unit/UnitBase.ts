import {Skill} from "../skill/SkillBase.ts";
import {AttackType} from "../constants.ts";
import {ref, watch} from "vue";
import {EGO} from "../ego/EGOBase.ts";
import {ui} from "../ui.ts";

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
    level: number
    speedRange: [number, number]
    affiliation: string
    attackResistance: Record<AttackType, number>
    stagger: string
    skills: Skill.dataType[]
    EGO: EGO.dataType[]
  }

  export function init(): Unit.dataType {
    return {
      character: "TerminalFlow",
      name: `羽化A.R.K.="雪芸"`,
      hpBase: 68,
      rarity: 4,
      hpModifier: 2.3,
      defense: -3,
      level: 45,
      speedRange: [4, 7],
      affiliation: "Terminal Society Company",
      attackResistance: {
        Pierce: 0.5,
        Blunt: 2,
        Slash: 1,
      },
      stagger: "0.75 0.4 0.2",
      skills: [Skill.init()],
      EGO: [EGO.init()],
    }
  }

  export const Editor = {
    character: ref("TerminalFlow"),
    name: ref(`羽化A.R.K.="雪芸"`),
    hpBase: ref(68),
    rarity: ref(4),
    hpModifier: ref(2.3),
    defense: ref(-3),
    level: ref(45),
    speedRange: [ref(4), ref(7)],
    affiliation: ref("Terminal Society Company"),
    attackResistance: {
      Pierce: ref(0.5),
      Blunt: ref(2),
      Slash: ref(1),
    },
    /*affinityResistance: {
      Wrath: ref(1),
      Lust: ref(2),
      Sloth: ref(2),
      Gluttony: ref(1),
      Gloom: ref(0.75),
      Pride: ref(1),
      Envy: ref(1),
    },*/
    stagger: ref(""),
    skills: ref([] as Skill.dataType[]),
    EGO: ref([] as EGO.dataType[]),

    assign(unit: Unit.dataType) {
      // so we have this fuck until there's a more beautiful way to assign it.
      Editor.character.value = unit.character
      Editor.name.value = unit.name
      Editor.hpBase.value = unit.hpBase
      Editor.rarity.value = unit.rarity
      Editor.hpModifier.value = unit.hpModifier
      Editor.defense.value = unit.defense
      Editor.level.value = unit.level
      Editor.speedRange[0].value = unit.speedRange[0]
      Editor.speedRange[1].value = unit.speedRange[1]
      Editor.affiliation.value = unit.affiliation
      Editor.attackResistance.Pierce.value = unit.attackResistance.Pierce
      Editor.attackResistance.Blunt.value = unit.attackResistance.Blunt
      Editor.attackResistance.Slash.value = unit.attackResistance.Slash
      Editor.stagger.value = unit.stagger
      Editor.skills.value = unit.skills
      Editor.EGO.value = unit.EGO
    }
  }

  // Fuck
  watch(Editor.character, (v) => ui.unit.current.value.character = v)
  watch(Editor.name, (v) => ui.unit.current.value.name = v)
  watch(Editor.hpBase, (v) => ui.unit.current.value.hpBase = v)
  watch(Editor.rarity, (v) => ui.unit.current.value.rarity = v)
  watch(Editor.hpModifier, (v) => ui.unit.current.value.hpModifier = v)
  watch(Editor.defense, (v) => ui.unit.current.value.defense = v)
  watch(Editor.level, (v) => ui.unit.current.value.level = v)
  watch(Editor.speedRange[0], (v) => ui.unit.current.value.speedRange[0] = v)
  watch(Editor.speedRange[1], (v) => ui.unit.current.value.speedRange[1] = v)
  watch(Editor.affiliation, (v) => ui.unit.current.value.affiliation = v)
  watch(Editor.attackResistance.Pierce, (v) => ui.unit.current.value.attackResistance.Pierce = v)
  watch(Editor.attackResistance.Blunt, (v) => ui.unit.current.value.attackResistance.Blunt = v)
  watch(Editor.attackResistance.Slash, (v) => ui.unit.current.value.attackResistance.Slash = v)
  watch(Editor.stagger, (v) => ui.unit.current.value.stagger = v)
  watch(Editor.skills, (v) => ui.unit.current.value.skills = v)
  watch(Editor.EGO, (v) => ui.unit.current.value.EGO = v)

  export const StaggerEditor = {
    get arr() {
      const str = Editor.stagger.value
      if (str == "") return []
      return Editor.stagger.value.split(" ").map(v => parseFloat(v))
    },
    toArr(s:string) {
      return s.split(" ").map(v => parseFloat(v))
    },
    indexAt(index: number) {
      return this.arr[index]
    },
    modify(index: number, value: number) {
      const arr = this.arr
      arr[index] = value
      Editor.stagger.value = arr.sort((a, b) => b - a).join(" ")
    },
    get length() {
      return this.arr.length
    },
    push(value: number) {
      const arr = this.arr
      arr.push(value)
      Editor.stagger.value = arr.sort((a, b) => b - a).join(" ")
    },
    clear() {
      Editor.stagger.value = ""
    },
    delete(index:number) {
      const arr = this.arr
      arr.splice(index, 1)
      Editor.stagger.value = arr.sort((a, b) => b - a).join(" ")
    }
  }
}