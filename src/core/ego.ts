import { Affinity, AttackType, RiskLevel } from "@/core/constants.ts";
import { ref, watch } from "vue";
import { notify } from "@/core/utils.ts";
import { Identity } from "@/core/identity.ts";
import {assign} from "@/core/assign.ts";

export interface Ego {
  name: string
  source: string
  affinity: Affinity
  resistance: Record<Affinity, number>
  resource: Record<Affinity, number>
  ATKType: AttackType
  RiskLevel: RiskLevel

  awakening: {
    sp: number
    ATKLevel: number
    ATKWeight: number
    coin: number
    coinPower: number
    basePower: number
  }
  corrosion: {
    has: boolean
    sp: number
    ATKLevel: number
    ATKWeight: number
    coin: number
    coinPower: number
    basePower: number
  }
}

const storage: Ego[] = [template()]
const viewing = ref(0)
const watcher = function (value: number) {
  assign(Editor.value, storage[value])
}
watch(viewing, watcher)
const current = () => storage[viewing.value] ?? storage[0]

function template(): Ego {
  return {
    name: "捕鲸叉",
    source: "以实玛利",
    affinity: "gloom",
    RiskLevel: "ZAYIN",
    resistance: {
      wrath: 1,
      lust: 2,
      sloth: 2,
      gluttony: 1,
      gloom: 0.75,
      pride: 1,
      envy: 1,
    },
    resource: {
      wrath: 2,
      lust: 0,
      sloth: 0,
      gluttony: 0,
      gloom: 2,
      pride: 0,
      envy: 0,
    },
    ATKType: "blunt",
    awakening: {
      coin: 1,
      coinPower: 4,
      basePower: 19,
      sp: 10,

      ATKLevel: -4,
      ATKWeight: 1,
    },
    corrosion: {
      sp: 35,
      has: false,
      coin: 1,
      coinPower: -10,
      basePower: 35,
      ATKLevel: 0,
      ATKWeight: 7,
    }
  }
}

const Editor = ref(template())

watch(Editor, value => {
  assign(current(), value)
}, { deep: true })

function add() {
  storage.push(template())

}

function del(index: number) {
  // step: confirm
  if (EGO.storage.length == 1) {
    alert("最后一个EGO啦！（经理侵蚀了）")
    return;
  }
  if (!confirm("删掉吗？")) return

  // step: check for may-be-re-used
  for (const unit of Identity.storage) {
    for (const rl of RiskLevel) {
      if (unit.ego[rl] == index && rl == "ZAYIN") {
        notify.error(unit.character + "-" + unit.name + "已将此EGO装备为ZAYIN，请先将该单位的Z级EGO换掉。", 1000)
        return;
      } else if (unit.ego[rl] == index) {
        unit.ego[rl] = undefined
      } else if (unit.ego[rl]?.gt(index)) {
        unit.ego[rl] = unit.ego[rl]?.minus(1)
      }
    }
  }

  storage.splice(index, 1)
  watcher(0)

}

function index(idx: number) {
  return storage[idx]
}

function copy(idx: number | Ego) {
  if (typeof idx == "number") {
    storage.push(assign(template(), index(idx)))
  }
  else {
    storage.push(assign(template(), idx))
  }
}

export const EGO = {
  storage,
  viewing,
  current,
  Editor,
  add,
  del,
  index,
  template,
  copy
}