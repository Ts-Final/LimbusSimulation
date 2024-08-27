// @ts-nocheck

export function assign<T, K>(target: T, source: K): T & K {
  if (typeof target !== "object" || typeof source !== "object") throw new Error()

  if (!source || !target) throw new Error()

  for (const key in source) {
    const key1 = key as unknown as keyof T
    if (typeof target[key1] != typeof source[key]) continue
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
  return target
}