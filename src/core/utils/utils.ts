/**
 * Random choose a number from [min, max]
 * */
export function randomInteger(min: number, max: number) {
  const length = max - min + 1
  return Math.floor(Math.random() * length + min)
}

export function range(end: number) {
  const arr = []
  for (let i = 0; i < end; i++) {
    arr.push(i)
  }
  return arr
}

export function isNumberLike(str: string) {
  return str.match(/^[0-9]+\.?[0-9]+$/)?.length == 1
}