import {Ref, ref} from "vue";
import {init} from "./extensions.ts"

export const notify = (function () {
  const notifyElement = document.createElement('div')
  notifyElement.classList.add("notify-box")
  const enterAnimation = "notify-a-enter"
  const leaveAnimation = "notify-a-leave"

  function showNotify(message: string, duration: number, elClass = 'notify-normal') {
    const container = document.getElementById('notify-container')
    if (!container) {
      throw new Error("Notify Container not found")
    }

    const element = notifyElement.cloneNode() as HTMLDivElement
    element.innerHTML = message
    element.classList.add(elClass)
    container.appendChild(element)

    let entered = false
    let leaved = false
    let isLeaving = false

    function enter() {
      element.classList.add(enterAnimation)
    }

    function stopEnter() {
      if (entered) {
        return
      }
      entered = true
      element.classList.remove(enterAnimation)
    }

    function leave() {
      if (isLeaving) {
        return
      }
      element.classList.add(leaveAnimation)
      isLeaving = true
    }

    function stopLeave() {
      if (leaved) {
        return
      }
      element.classList.remove(leaveAnimation)
      leaved = true
      element.remove()
    }

    enter()
    setTimeout(stopEnter, 300)
    setTimeout(leave, 300 + duration)
    setTimeout(stopLeave, 600 + duration)

  }

  return {
    normal: (text: string, duration: number) => showNotify(text, duration, "notify-normal"),
    error: (text: string, duration: number) => showNotify(text, duration, "notify-error"),
    success: (text: string, duration: number) => showNotify(text, duration, "notify-success")
  }
})()


type objToRef<obj> = {
  [key in keyof obj]: obj[key] extends object ? objToRef<obj[key]> : Ref<obj[key]>
}
type editorType<obj> = {
  [key in keyof obj]:
  obj[key] extends object ? editorType<obj[key]> : Ref<obj[key]>
} & { assign(data: obj): void }

export function toEditor<dataType>(init: dataType): editorType<dataType> {
  const callbacks: ((data: dataType) => void)[] = []

  // @ts-expect-error As defining the value it should be empty anyhow.
  const Editor: objToRef<dataType> & { assign(init: dataType): void } = {
    assign(data: dataType) {
      callbacks.forEach(v => v(data))
    }
  }
  for (const key in init) {
    if (typeof init[key] !== 'object') {
      const reference = ref(init[key])
      // @ts-expect-error
      Editor[key] = reference
      callbacks.push((data) => {
        reference.value = data[key]
      })
    } else {
      // @ts-expect-error
      Editor[key] = toEditor(init[key])
      callbacks.push((data) => {
        // @ts-expect-error
        Editor[key].assign(data[key])
      })
    }
  }
  // @ts-expect-error Fuck Why does that fuck
  return Editor
}

export function isNumberLike(str: string) {
  return str.match(/^[0-9]+(\.[0-9]+)?$/g)?.length == 1
}

export function assign<T>(target: T, source: T) {
  if (typeof target !== "object" || typeof source !== "object") {
    return target
  }
  if (!source) throw new Error()

  for (const key in target) {
    if (target[key] instanceof Array) {
      target[key] = source[key]
    } else if (typeof target[key] === "object") {
      assign(target[key], source[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}

export const sorter = {
  BigToSmall(a: number, b: number) {
    return b - a
  },
  SmallToBig(a: number, b: number) {
    return a - b
  }
}

export function range(end: number) {
  const arr = []
  for (let i = 0; i < end; i++) {
    arr.push(i)
  }
  return arr
}

export function resToClass(val: number) {
  if (val <= 0) {
    return "res-immune"
  } else if (val <= 0.5) {
    return "res-ineff"
  } else if (val < 1) {
    return "res-endure"
  } else if (val == 1) {
    return "res-normal"
  } else if (val < 2) {
    return "res-weak"
  } else {
    return "res-fatal"
  }
}

export function resToWord(val: number) {
  if (val < 0) {
    return "吸收"
  } else if (val == 0) {
    return "免疫"
  } else if (val <= 0.5) {
    return "抵抗"
  } else if (val < 1) {
    return "忍耐"
  } else if (val == 1) {
    return "普通"
  } else if (val < 2) {
    return "脆弱"
  } else {
    return "致命"
  }
}

init()