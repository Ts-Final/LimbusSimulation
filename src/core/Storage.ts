import {Unit} from "./unit/UnitDataBase.ts";
import {notify} from "./utils/notify.ts";
import {ui} from "./ui.ts";

const LocalStorageKey = "LimbusCompanyFucker"
export namespace Storage {
  export const unit:Unit.dataType[] = [Unit.init()]

  export function save() {
    localStorage.setItem(LocalStorageKey, JSON.stringify(
      {
        unit,
        view: ui.unit.view.value
      }
    ))
    notify.normal("已保存！", 1000)
  }

  export function load() {
    const data = localStorage.getItem(LocalStorageKey)
    if (data) {
      const parsed = JSON.parse(data)
      if (parsed.unit) {
        Storage.unit.pop()
        Storage.unit.push(...parsed.unit)
        Unit.Editor.assign(0)
      }
    }
  }
  export function local() {
    return localStorage.getItem(LocalStorageKey)
  }
  export function fuck() {
    localStorage.removeItem(LocalStorageKey)
    window.location.reload()
  }
}