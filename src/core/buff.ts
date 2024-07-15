/*
import {Unit} from "./unit/UnitDataBase.ts";
import {SkillEvent} from "./constants.ts";

function toBuff<name extends string, des extends string>(
  name: name,
  des: des,
  inflict: (unit: Unit, potency: number, count?: number) => void,
  event: SkillEvent,
  trigger:(unit:Unit) => void
) {
  return {
    name: name,
    des: des,
    inflict,
    event,
    trigger
  }
}

export const Buffs = [
  /!*{
    name: "bleed",
    des: "",
    inflict(unit:Unit,potency:number, count=1){
      if (!unit.buffs.bleed) {
        unit.buffs.bleed = [potency, count]
      } else {
        unit.buffs.bleed[0] += potency
        unit.buffs.bleed[1] += count
      }
    },
    event: "OnTossing"
  }*!/
  toBuff("bleed", "wtf",
    function (unit: Unit, potency: number, count = 1) {
      if (!unit.buffs.bleed) {
        unit.buffs.bleed = [potency, count]
      } else {
        unit.buffs.bleed[0] += potency
        unit.buffs.bleed[1] += count
      }
    },
    "OnTossing",
    function (unit: Unit) {
      if (unit.buffs.bleed) {
        unit.hp -= unit.buffs.bleed[0]
        unit.buffs.bleed[1] -= 1
        if (unit.buffs.bleed[1] <= 0) {
          delete unit.buffs.bleed
        }
      }
    }
  )
] as const

export type Buff = typeof Buffs[number]["name"]
export const Buff = {

}*/
