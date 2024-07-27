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

declare global {
  interface Number {
    toSigned(): string;

    gte(val: number): boolean
    gt(val:number):boolean
    minus(val: number): number
  }
}
Number.prototype.toSigned = function () {
  return this.valueOf() < 0 ? `${this}` : "+" + this.toString()
}
Number.prototype.gte = function (val: number) {
  return this.valueOf() >= val
}
Number.prototype.gt = function (val:number) {
  return this.valueOf() > val
}
Number.prototype.minus = function (val: number) {
  return this.valueOf() - val
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