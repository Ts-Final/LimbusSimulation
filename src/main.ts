import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {GameStorage} from "./core/GameStorage.ts";
import {notify} from "./core/utils/notify.ts";
import IMustBeTheReasonWhy from "./core/utils/IMustBeTheReasonWhy.ts";

createApp(App).mount('#app')

declare global {
  interface Window {
    player: any,
    dev: any,
    Decimal: any,

    [key: string]: any
  }
}

window.storage = GameStorage
window.notify = notify

setInterval(GameStorage.save, 10e3)
document.addEventListener("keydown", function (ev) {
  if (ev.code == "KeyS" && ev.ctrlKey) {
    ev.preventDefault()
    GameStorage.save()
  }
})
window.onerror = function () {
  GameStorage.fuck()
}

GameStorage.load()
IMustBeTheReasonWhy.start()