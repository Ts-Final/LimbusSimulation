import {cycle, notify} from "@/core/utils.ts";
import {Ref, ref} from "vue";

const all: any[] = []
const currentCh = ref("")
const current:Ref<HTMLAudioElement|undefined> = ref()


function generate2(getter: () => HTMLAudioElement, ch: string) {
  const song = {
    play() {
      getter().play()
        .then(() => notify.normal("正在播放：" + ch, 1000))
        .then(this.setTimer.bind(this))
      currentCh.value = ch
      current.value = getter()
    },
    pause() {
      getter().pause()
      this.clearTimer()
    },
    end() {
      this.pause()
      getter().currentTime = 0
    },
    get duration() {
      return getter().duration
    },
    ch,
    get left() {
      return getter().duration - getter().currentTime
    },
    setTimer() {
      this.timerId = setTimeout(() => Musics.next(), this.left * 1000)
    },
    clearTimer() {
      clearTimeout(this.timerId)
      this.timerId = -1
    },
    timerId: -1
  }
  all.push(song)
  return song
}

const compass = generate2(() => document.getElementById("sound-compass") as HTMLAudioElement,
  "Compass")
const fly = generate2(() => document.getElementById("sound-fly-wings") as HTMLAudioElement,
  "Fly, My wings")
const between = generate2(() => document.getElementById("sound-between-worlds") as HTMLAudioElement,
  "Between two worlds")
const vitamins = generate2(() => document.getElementById("sound-vitamins") as HTMLAudioElement,
  "Vitamins")
const inHell = generate2(() => document.getElementById("sound-in-hell") as HTMLAudioElement,
  "In hell we live, Lament")
const xiao = generate2(() => document.getElementById("sound-xiao") as HTMLAudioElement,
  "Iron Lotus")
const patches = generate2(() => document.getElementById("sound-patches") as HTMLAudioElement,
  "回应！山庄！")
const count = cycle(0, all.length - 1, -1)
export const Musics = {
  compass,
  fly,
  between,
  vitamins,
  inHell,
  xiao,
  patches,
  next() {
    all[count.value]?.end()
    all[count.next()]?.play()
    this.flag = true
  },
  currentCh,
  current,
  pause() {
    all[count.value]?.pause()
    this.flag = false
  },
  resume() {
    all[count.value]?.play()
    this.flag = true
  },
  _flag: false,
  get flag() {
    return this._flag
  },
  set flag(v){
    this._flag = v
    this.refs.flag.value = v
  },
  refs: {
    flag: ref(false)
  }
}