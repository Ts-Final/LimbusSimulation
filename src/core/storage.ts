import {Identity} from "@/core/identity.ts";
import {assign, notify} from "@/core/utils.ts";
import {EGO} from "@/core/ego.ts";
import {Skill} from "@/core/skill.ts";

const key = "LimbusCompanySimulator";

export const Storage = {
  save() {
    localStorage.setItem(key, JSON.stringify({
      identity: Identity.storage,
      ego: EGO.storage,
      skill: Skill.storage
    }))
    notify.normal("已保存！", 1000)
  },
  start() {
    setInterval(this.save, 10e3)
  },
  load() {
    this.start()
    const str = localStorage.getItem(key)
    if (str) {
      const storage = JSON.parse(str)

      if (storage.identity) {
        Identity.storage.splice(0, Identity.storage.length)
        for (const id of storage.identity) {
          Identity.storage.push(assign(Identity.template(), id))
        }
      }
      if (storage.ego) {
        EGO.storage.splice(0, EGO.storage.length)
        for (const ego of storage.ego) {
          EGO.storage.push(assign(EGO.template(), ego))
        }
      }
      if (storage.skill) {
        Skill.storage.splice(0, Skill.storage.length)
        for (const skill of storage.skill)
          Skill.storage.push(assign(Skill.template(), skill))
      }
    }
    Identity.load()
  },
  fuck() {
    localStorage.removeItem(key)
    window.location.reload()
  }
}