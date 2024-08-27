import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {Storage} from "@/core/storage.ts";
import Listener from "@/core/listener.ts";
import {Cathy} from "@/core/title.ts";
import {Directive_Draggable, Directive_Drop} from "@/core/utils.ts";

const app = createApp(App)
app.directive("draggable", Directive_Draggable)
app.directive("drop", Directive_Drop)
app.mount('#app')

Storage.load()

document.addEventListener("keydown", Listener)

Cathy.play()

window.dev = {}
