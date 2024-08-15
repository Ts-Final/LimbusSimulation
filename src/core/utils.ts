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


/*type objToRef<obj> = {
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
}*/

export function isNumberLike(str: string) {
  return str.match(/^[0-9]+(\.[0-9]+)?$/g)?.length == 1
}

export function assign<T, K>(target: T, source: K): T & K {
  if (typeof target !== "object" || typeof source !== "object") {
    throw new Error()
  }
  if (!source || !target) throw new Error()

  for (const key in source) {
    const key1 = key as unknown as keyof T
    if (target[key1] instanceof Array) {
      // @ts-expect-error
      target[key1] = source[key as keyof K]
    } else if (typeof target[key1] === "object") {
      assign(target[key1], source[key])
    } else {
      // @ts-expect-error
      target[key1] = source[key]
    }
  }
  // @ts-expect-error
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

export function deepmerge<T, K>(v1: T, v2: K): T & K {
  const x = {}
  const x1 = assign(v1, x)
  return assign(x1, v2)
}

// Randomly arrange an array.
// see https://zh.javascript.info/task/shuffle
export function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 从 0 到 i 的随机索引

    // 交换元素 array[i] 和 array[j]
    // 我们使用“解构分配（destructuring assignment）”语法来实现它
    // 你将在后面的章节中找到有关该语法的更多详细信息
    // 可以写成：
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Random choose a number from [min, max]
 * */
export function randomInteger(min: number, max: number) {
  const length = max - min + 1
  return Math.floor(Math.random() * length + min)
}


init()