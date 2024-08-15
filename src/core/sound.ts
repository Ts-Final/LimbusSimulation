import {ref} from "vue";
import {notify} from "@/core/utils.ts";

const current = ref("")
const all: any[] = []


function generate2(getter: () => HTMLAudioElement, ch: string) {
  const x = {
    play() {
      getter()?.play()
        .then(() => notify.normal("正在播放：" + ch, 1000))
      current.value = ch
    },
    pause() {
      getter()?.pause()
      getter().currentTime = 0
    },
    get duration() {
      return getter().duration
    },
    ch
  }
  all.push(x)
  return x
}

export const Sound = {
  compass: generate2(() => document.getElementById("sound-compass") as HTMLAudioElement, "Compass"),
  fly: generate2(() => document.getElementById("sound-fly-wings") as HTMLAudioElement, "Fly, My wings"),
  between: generate2(() => document.getElementById("sound-between-worlds") as HTMLAudioElement, "两世之间"),
  vitamins: generate2(() => document.getElementById("sound-vitamins") as HTMLAudioElement, "Vitamins"),
  inHell: generate2(() => document.getElementById("sound-in-hell") as HTMLAudioElement, "In hell we live"),
  xiao: generate2(() => document.getElementById("sound-xiao") as HTMLAudioElement, "I am fire"),
  patches: generate2(() => document.getElementById("sound-patches") as HTMLAudioElement, "斑驳之紫"),
  current,
  play() {
    all.find(x => x.ch == current.value)?.pause()
    all.filter(x => x.ch != current.value).pop().play()
  }
}