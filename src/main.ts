import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {GameStorage} from "./core/GameStorage.ts";
import {notify} from "./core/utils/notify.ts";
import {ui} from "./core/ui.ts";
import unit = ui.unit;

createApp(App).mount('#app')

declare global {
  interface Window {
    player: any,
    dev: any,
    Decimal: any,
    [key: string]:any
  }
}

window.storage = GameStorage
window.notify = notify
window.unit = unit

setInterval(GameStorage.save, 10e3)
document.addEventListener("keydown", function (ev) {
  if (ev.code == "KeyS" && ev.ctrlKey) {
    ev.preventDefault()
    GameStorage.save()
  }
})
window.onerror = function() {
  GameStorage.fuck()
}

GameStorage.load()
ui.display.value = true
ui.refresh()