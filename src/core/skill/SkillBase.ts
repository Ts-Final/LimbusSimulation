import {Affinity} from "../constants.ts";

/*

export class SkillBase {
  ATKLevel: (lv: number) => number
  ATKWeight: number
  coins: number
  coinPower: number
  // coinAffects: [SkillEvent, UnitTargetFunction][]
  // skillAffects: [SkillEvent, UnitTargetFunction][]
  BasePower: number
  affinity: Affinity

  constructor(
    ATKLevel: (lv: number) => number,
    affinity: Affinity,
    coins: number,
    coinPower: number,
    BasePower: number,
    // coinAffects: [SkillEvent, UnitTargetFunction][],
    // skillAffects: [SkillEvent, UnitTargetFunction][],
    ATKWeight = 1,
  ) {
    this.ATKLevel = ATKLevel
    this.affinity = affinity
    this.coins = coins
    this.coinPower = coinPower
    this.BasePower = BasePower
    this.ATKWeight = ATKWeight
    // this.coinAffects = coinAffects
    // this.skillAffects = skillAffects
  }

  toSkill(unit: Unit) {
    return new Skill(
      this.ATKLevel(unit.level),
      this.affinity,
      this.coins,
      this.coinPower,
      this.BasePower,
      // this.coinAffects,
      // this.skillAffects,
      this.ATKWeight,
    )
  }
}

export class Skill {
  ATKLevel: number
  ATKWeight: number
  coins: number
  coinPower: number
  // coinAffects: [SkillEvent, UnitTargetFunction][]
  // skillAffects: [SkillEvent, UnitTargetFunction][]
  BasePower: number
  affinity: Affinity

  constructor(
    ATKLevel: number,
    affinity: Affinity,
    coins: number,
    coinPower: number,
    BasePower: number,
    // coinAffects: [SkillEvent, UnitTargetFunction][],
    // skillAffects: [SkillEvent, UnitTargetFunction][],
    ATKWeight = 1,
  ) {
    this.ATKLevel = ATKLevel
    this.affinity = affinity
    this.coins = coins
    this.coinPower = coinPower
    this.BasePower = BasePower
    this.ATKWeight = ATKWeight
    // this.coinAffects = coinAffects
    // this.skillAffects = skillAffects
  }
}*/

export namespace Skill {
  export interface dataType {
    ATKLevel: number
    ATKWeight: number
    coins: number
    coinPower: number
    BasePower: number
    affinity: Affinity
  }

  /*function init(): Skill.dataType {
    return {
      ATKLevel: 3,
      ATKWeight: 1,
      coins: 4,
      coinPower: 3,
      BasePower: 4,
      affinity: "Wrath",
    }
  }*/
}