import {StageUnit} from "@/core/stage/stageUnit.ts";

export interface clashStat {
  value: number
  results: (boolean|undefined)[]
  last: boolean
  coin_lost: number
  fn(): clashStat
  unit: StageUnit
  skill: number
}

export interface skillStat {
  value:number
  results: (boolean|undefined)[]
  current: number
  max: number
  end: boolean
  total: number
  fn(): skillStat
  unit: StageUnit
  allTarget: StageUnit[]
  skill: number
}