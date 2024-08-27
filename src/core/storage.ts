import {Identity} from "@/core/identity.ts";
import {notify} from "@/core/utils.ts";
import {EGO} from "@/core/ego.ts";
import {Skill} from "@/core/skill.ts";
import {assign} from "@/core/assign.ts";

const key = "LimbusCompanySimulator";

export const Storage = {
  save() {
    const data = JSON.stringify(this.content())
    localStorage.setItem(key, data)
    notify.normal("已保存！", 1000)
    return data
  },
  content() {
    return {
      identity: Identity.storage,
      ego: EGO.storage,
      skill: Skill.storage
    }
  },
  start() {
    setInterval(this.save.bind(Storage), 10e3)
  },
  load() {
    const str = localStorage.getItem(key)
    if (str) {
      const storage = JSON.parse(str)

      this._from(storage)
    }
    this.start()
    Identity.load()
  },
  _from(data:any) {
    if (data.identity) {
      Identity.storage.splice(0, Identity.storage.length)
      for (const id of data.identity) {
        Identity.storage.push(assign(Identity.template(), id))
      }
    }
    if (data.ego) {
      EGO.storage.splice(0, EGO.storage.length)
      for (const ego of data.ego) {
        EGO.storage.push(assign(EGO.template(), ego))
      }
    }
    if (data.skill) {
      Skill.storage.splice(0, Skill.storage.length)
      for (const skill of data.skill)
        Skill.storage.push(assign(Skill.template(), skill))
    }
  },
  fuck() {
    localStorage.removeItem(key)
    this.refresh()
  },
  refresh() {
    window.location.reload()

  },
  export() {
    new Clipboard().writeText(window.btoa(JSON.stringify(this.content())))
      .then(() => notify.normal("存档已复制到剪切板！",1000))
      .catch(() => notify.error("复制内容到剪切板时出错。", 1000))
  },
  loadFromExport(ex:string) {
    const storage = JSON.parse(window.atob(ex))
    this._from(storage)
    this.save()
  }
}