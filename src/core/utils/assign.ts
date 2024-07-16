export function assign<T, K extends T>(target: T, source: K) {
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

window.assign = assign