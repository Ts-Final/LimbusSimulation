import {ref} from "vue";

export namespace ui {
  export const display = ref(false)
  export function refresh() {
    display.value = false
    setTimeout(() => {
      display.value = true
    }, 1)
  }
  export const unit = {
    view: ref(0),

  }

}