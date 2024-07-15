import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {Storage} from "./core/Storage.ts";
import {notify} from "./core/utils/notify.ts";
import {ui} from "./core/ui.ts";

createApp(App).mount('#app')

declare global {
  interface Window {
    player: any,
    dev: any,
    Decimal: any,
    [key: string]:any
  }
}

window.storage = Storage
window.notify = notify

setInterval(Storage.save, 10e3)
document.addEventListener("keydown", function (ev) {
  if (ev.code == "KeyS" && ev.ctrlKey) {
    ev.preventDefault()
    Storage.save()
  }
})

Storage.load()
ui.display.value = true