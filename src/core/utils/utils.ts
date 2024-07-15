/**
 * Random choose a number from [min, max]
 * */
export function randomInteger(min:number, max:number) {
  const length = max - min + 1
  return Math.floor(Math.random() * length + min)
}