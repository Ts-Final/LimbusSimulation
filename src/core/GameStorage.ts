import {EGO} from "./ego/EGOBase.ts";
import {Unit} from "./unit/UnitBase.ts";
import {notify} from "./utils/notify.ts";
import {assign} from "./utils/assign.ts";
import {Skill} from "./skill/SkillBase.ts";

const LocalStorageKey = "LimbusCompanyFucker"

export const GameStorage = {
  unit: Unit.storage,
  ego: EGO.storage,
  save() {
    localStorage.setItem(LocalStorageKey, JSON.stringify(
      {
        unit: GameStorage.unit,
        egos: GameStorage.ego,
      }
    ))
    notify.normal("已保存！", 1000)
  },
  load() {
    const data = localStorage.getItem(LocalStorageKey)
    if (data) {
      const parsed = JSON.parse(data)
      if (parsed.unit) {
        this.unit.splice(0, 10)
        for (const unitData of parsed.unit) {
          const unit = Unit.init()
          this.unit.push(assign(unit, unitData))
        }
      }
      if (parsed.egos) {
        this.ego.splice(0, 10)
        for (const egoData of parsed.egos) {
          const ego = EGO.init()
          this.ego.push(assign(ego, egoData))
        }
      }
    }
    Unit.Editor.assign(GameStorage.unit[0])
    Skill.Editor.assign(GameStorage.unit[0].skills[0])
    EGO.Editor.assign(GameStorage.ego[0])
  },
  local() {
    return localStorage.getItem(LocalStorageKey)
  },
  fuck() {
    localStorage.removeItem(LocalStorageKey)
    window.location.reload()
  }

}