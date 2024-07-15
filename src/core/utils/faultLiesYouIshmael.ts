import {randomInteger} from "./utils.ts";
import {notify} from "./notify.ts";

/**
 * 都是你的错！以实玛利！*/
export const FaultLiesYouIshmael = {
  audios: 4,
  play() {
    const index = randomInteger(1, this.audios)
    const audio = document.getElementById("fault-" + index) as HTMLAudioElement | null
    if (audio) {
      audio.play()
      notify.normal("都是你的错！以实玛利！", audio.duration * 1000)
    } else {
      notify.normal("都是你的错！经理！", 2000)
    }
  }
}