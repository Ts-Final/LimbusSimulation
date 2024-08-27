import {Affinity, AttackType} from "@/core/constants.ts";
import {ref, watch} from "vue";
import {Identity} from "@/core/identity.ts";
import {assign} from "@/core/assign.ts";

export interface Skill {
  name: string
  ATKType: AttackType
  ATKLevel: number
  ATKWeight: number
  coin: number
  coinPower: number
  basePower: number
  affinity: Affinity
}

const storage = [template()]
const viewing = ref(0)
const watcher = function (value: number) {
  assign(Editor.value, storage[value])
}
watch(viewing, watcher)

const current = () => storage[viewing.value]

function template(): Skill {
  return {
    name: "执着鱼叉",
    ATKType: "pierce",
    ATKLevel: 3,
    ATKWeight: 1,
    coin: 4,
    coinPower: 3,
    basePower: 4,
    affinity: "wrath",
  }
}

const Editor = ref(template())

function index(idx: number) {
  return storage[idx]
}

watch(Editor, value => {
  assign(current(), value)
}, {deep:true})

function add() {
  storage.push(template())
}

function del(idx: number) {
  if (storage.length == 1) {
    alert("最后一个技能了。")
    return;
  }
  if (!confirm("真的要删掉" + index(idx).name + "吗？")) return

  for (const identity of Identity.storage) {
    // i: the index of skill in identity.skill
    // si: skill's index
    for (const [i,[si,]] of Object.entries(identity.skill)) {
      if (Number(i) == idx) identity.skill.splice(Number(i), 1)
      if (si > idx) identity.skill[Number(i)][0] = Number(si) - 1
    }
  }


  storage.splice(idx, 1)
  watcher(0)
}
function copy(data: number | Skill) {
  if (typeof data == "number") {
    storage.push(assign(template(), storage[data]))
  } else {
    storage.push(assign(template(), data))
  }
}

export const Skill = {
  storage,
  viewing,
  current,
  index,
  Editor,
  add,
  del,
  template,
  copy,
}