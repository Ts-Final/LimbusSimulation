/*
export class UnitDataBase {
  character: string
  name: string
  hp: (lv: number) => number
  defense: (lv: number) => number
  skills: SkillBase[]
  affiliation: string
  speed: [number, number]
  stagger: number[]
  // 斩击，穿刺，打击
  attackResistances: [number, number, number]
  affinityResistances: [number, number, number, number, number, number, number]

  constructor(
    skills: SkillBase[],
    character?: string,
    name?: string,
    hp?: (lv: number) => number,
    defense?: (lv: number) => number,
    attackResistances?: [number, number, number],
    affinityResistances?: [number, number, number, number, number, number, number],
    affiliation?: string,
    speed?: [number, number],
    stagger?: number[]
  ) {
    this.character = character ?? "TerminalFlow"
    this.name = name ?? `末式公司 羽化A.R.K.="初芸"`
    this.hp = hp ?? ((lv: number) => 68 + lv * 2.3)
    this.skills = skills
    this.defense = defense ?? (lv => lv - 3)
    this.affiliation = affiliation ?? "Terminal Society"
    this.attackResistances = attackResistances ?? [1, 0.5, 2]
    this.affinityResistances = affinityResistances ?? [1, 1, 1, 1, 1, 1, 1]
    this.speed = speed ?? [4, 7]
    this.stagger = (stagger ?? [0.7, 0.4, 0.2]).sort((a, b) => b - a)
  }


  toUnit(level: number) {
    return new Unit(
      this.character,
      this.name,
      this.hp(level),
      level,
      this.defense(level),
      this.speed,
      this.affiliation,
      this.attackResistances,
      this.affinityResistances,
      this.stagger,
      this.skills
    )
  }
}

export class Unit {
  character: string
  name: string
  hp: number
  hpMax: number
  hpBase: number
  defense: number
  defenseBase: number
  speed: number
  speedRange: [number, number]
  skills: SkillBase[]
  affiliation: string
  attackResistance: {
    Pierce: number,
    Blunt: number,
    Slash: number,
  }
  AffinityResistance: Record<Affinity, number>
  staggerThreshold: { value: number, fucked: boolean }[]
  buffs: Partial<Record<Buff, number[]>>
  level: number

  constructor(
    character: string,
    name: string,
    hp: number,
    level: number,
    defense: number,
    speedRange: [number, number],
    affiliation: string,
    attackResistance: [number, number, number],
    affinityResistance: [number,number,number,number,number,number,number],
    stagger: number[],
    skills: SkillBase[],
  ) {
    this.affiliation = affiliation
    this.character = character
    this.name = name
    this.level = level
    this.hpBase = hp
    this.hp = this.hpMax = hp
    this.defense = this.defenseBase = defense
    this.speedRange = speedRange
    this.speed = randomInteger(...speedRange)
    this.skills = skills

    this.buffs = {}
    this.staggerThreshold = []
    for (const pos of stagger) {
      this.staggerThreshold.push({
        value: pos * hp,
        fucked: false,
      })
    }

    this.attackResistance = {
      Pierce: attackResistance[0],
      Blunt: attackResistance[1],
      Slash: attackResistance[2],
    }

    this.AffinityResistance = {
      Wrath: affinityResistance[0],
      Lust: affinityResistance[1],
      Sloth: affinityResistance[2],
      Gluttony: affinityResistance[3],
      Gloom: affinityResistance[4],
      Pride: affinityResistance[5],
      Envy: affinityResistance[6],
    }
  }

  doDamage(value: number, atkType: AttackType, affinity: Affinity) {
    value *= this.attackResistance[atkType]
    value *= this.AffinityResistance[affinity]

    this.hp -= value
  }
}*/

import {Skill} from "../skill/SkillBase.ts";
import {Affinity, AttackType} from "../constants.ts";
import {ref} from "vue";
import {Storage} from "../Storage.ts";

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
    affinityResistance: Record<Affinity, number>
    stagger: number[]
    skills: Skill.dataType[]
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
      affinityResistance: {
        Wrath: 1,
        Lust: 2,
        Sloth: 2,
        Gluttony: 1,
        Gloom: 0.75,
        Pride: 1,
        Envy: 1,
      },
      stagger: [0.75, 0.4, 0.2],
      skills: [],
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
    affinityResistance: {
      Wrath: ref(1),
      Lust: ref(2),
      Sloth: ref(2),
      Gluttony: ref(1),
      Gloom: ref(0.75),
      Pride: ref(1),
      Envy: ref(1),
    },
    stagger: [
      ref(0.75),
      ref(0.4),
      ref(0.2),
    ],
    skills: ref([] as Skill.dataType[]),

    assign(index: number) {
      // so we have this fuck until there's a more beautiful way to assign it.
      const unit = Storage.unit[index]
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
      Editor.affinityResistance.Wrath.value = unit.affinityResistance.Wrath
      Editor.affinityResistance.Lust.value = unit.affinityResistance.Lust
      Editor.affinityResistance.Sloth.value = unit.affinityResistance.Sloth
      Editor.affinityResistance.Gluttony.value = unit.affinityResistance.Gluttony
      Editor.affinityResistance.Gloom.value = unit.affinityResistance.Gloom
      Editor.affinityResistance.Pride.value = unit.affinityResistance.Pride
      Editor.affinityResistance.Envy.value = unit.affinityResistance.Envy
      Editor.stagger[0].value = unit.stagger[0]
      Editor.stagger[1].value = unit.stagger[1]
      Editor.stagger[2].value = unit.stagger[2]
      Editor.skills.value = unit.skills

    }
  }
}