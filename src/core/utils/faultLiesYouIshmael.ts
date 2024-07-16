import {randomInteger} from "./utils.ts";
import {notify} from "./notify.ts";

/**
 * 都是你的错！以实玛利！*/
export const FaultLiesYouIshmael = {
  play() {
    const index = randomInteger(1, 4)
    const audio = document.getElementById("fault-" + index) as HTMLAudioElement | null
    if (audio) {
      audio.play()
      notify.normal("都是你的错！以实玛利！", audio.duration * 1000)
    } else {
      notify.normal("都是你的错！经理！", 2000)
    }
  },
  FuckYouDante(msg?:string) {
    const audio = document.getElementById("fault-i-1") as HTMLAudioElement
    if (audio) {
      audio.play()
      if (msg) {
        notify.normal(msg, audio.duration * 1000)
      }
    }
  }
}