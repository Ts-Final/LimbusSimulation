import {Unit} from "./unit/UnitBase.ts";
import {notify} from "./utils/notify.ts";
import {ui} from "./ui.ts";
import {assign} from "./utils/assign.ts";
import {Skill} from "./skill/SkillBase.ts";
import {EGO} from "./ego/EGOBase.ts";

const LocalStorageKey = "LimbusCompanyFucker"

export const GameStorage = {
  unit: [Unit.init()],
  save() {
    localStorage.setItem(LocalStorageKey, JSON.stringify(
      {
        unit: GameStorage.unit,
        view: ui.unit.view.value
      }
    ))
    notify.normal("已保存！", 1000)
  },
  load() {
    const data = localStorage.getItem(LocalStorageKey)
    if (data) {
      const parsed = JSON.parse(data)
      if (parsed.unit) {
        /*Storage.unit.pop()
        Storage.unit.push(...parsed.unit)
        Unit.Editor.assign(0)*/
        this.unit = []
        for (const unitData of parsed.unit) {
          const unit = Unit.init()
          this.unit.push(assign(unit, unitData))
        }
      }
    }
    Unit.Editor.assign(GameStorage.unit[0])
    Skill.Editor.assign(GameStorage.unit[0].skills[0])
    EGO.Editor.assign(GameStorage.unit[0].EGO[0])
  },
  local() {
    return localStorage.getItem(LocalStorageKey)
  },
  fuck() {
    localStorage.removeItem(LocalStorageKey)
    window.location.reload()
  }

}