import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {Storage} from "@/core/storage.ts";
import Listener from "@/core/listener.ts";
import {Cathy} from "@/core/title.ts";
import {Sound} from "@/core/sound.ts";

createApp(App).mount('#app')

Storage.load()

document.addEventListener("keydown", Listener)

Cathy.play()
Sound.play()