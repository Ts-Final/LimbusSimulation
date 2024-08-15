import { RiskLevel } from "@/core/constants.ts";
import { ref, watch } from "vue";
import { assign, isNumberLike, sorter } from "@/core/utils.ts";

export interface Identity {
  character: string
  name: string
  rarity: number
  hp: {
    base: number
    modify: number
  }
  defense: number
  speed: [number, number]
  resistance: {
    pierce: number
    slash: number
    blunt: number
  }
  ego: Record<RiskLevel, number | undefined>
  skill: [number, number][]
  stagger: string
  level: number
  tags: string[]

}

const storage: Identity[] = [template()]
const viewing = ref(0)
const watcher = function (value: number) {
  assign(Editor.value, storage[value])
}
watch(viewing, watcher)

const current = () => storage[viewing.value]

function template(): Identity {
  return {
    character: "TerminalFlow",
    name: `羽化A.R.K.="雪芸"`,
    hp: {
      base: 68,
      modify: 2.3
    },
    rarity: 4,
    defense: -3,
    speed: [4, 7],
    resistance: {
      pierce: 0.5,
      blunt: 2,
      slash: 1,
    },
    stagger: "0.75 0.4 0.2",
    skill: [[0, 0]],
    ego: {
      ZAYIN: 0,
      TETH: undefined,
      HE: undefined,
      WAW: undefined,
      ALEPH: undefined,
      TARK: undefined,
    },
    level: 45,
    tags: []
  }
}

const Editor = ref(template())

const stagger = ref("")

function updateStagger(value: Identity) {
  if (value.stagger != "") {
    stagger.value = value.stagger.split(" ")
      .map(parseFloat)
      .map(v => v * hp.value)
      .map(Math.round)
      .sort(sorter.BigToSmall)
      .join(" ")
  } else {
    stagger.value = "没有混乱阈值"
  }
}

const hp = ref(0)

function updateHp(value: Identity) {
  hp.value = Math.floor(value.hp.base + value.hp.modify * value.level)
}

function fix(data: Identity) {
  const i = assign(template(), data)
  i.stagger = i.stagger
    .split(" ")
    .filter(isNumberLike)
    .map(parseFloat)
    .sort(sorter.BigToSmall)
    .join(" ")

  i.ego.ZAYIN = i.ego.ZAYIN ?? 0
  // @ts-expect-error idk why sometimes here will be a null there.
  i.skill = i.skill.filter(x => !x.includes(null))
}

watch(Editor, (value) => {
  // eslint-disable-next-line no-debugger
  fix(value)
  assign(current(), value)

  updateHp(value)
  updateStagger(value)

}, { deep: true, immediate: true })

function load() {
  assign(Editor.value, current())
}

function index(idx: number) {
  return storage[idx]
}

function add() {
  storage.push(template())
}

function del(index: number) {
  if (Identity.storage.length == 1) {
    alert("至少要保留一个单位。")
    return;
  }
  if (!confirm("删掉吗？")) return

  storage.splice(index, 1)
  watcher(0)
}

function copy(data: number | Identity) {
  if (typeof data == "number") {
    storage.push(assign(template(), storage[data]))
  } else {
    storage.push(assign(template(), data))
  }
}

export const Identity = {
  storage,
  viewing,
  current,
  template,
  fix,
  editor: Editor,
  Editor,
  refs: {
    stagger,
    hp,
  },
  load,
  index,
  del,
  add,
  hp(identity: Identity) {
    return Math.floor(identity.hp.base + identity.hp.modify * identity.level)
  },
  stagger(identity: Identity) {
    return identity.stagger.split(" ")
      .filter(isNumberLike)
      .map(parseFloat)
      .map(v => v * Identity.hp(identity))
      .map(Math.round)
      .sort(sorter.BigToSmall)
      .join(" ")
  },
  copy
}