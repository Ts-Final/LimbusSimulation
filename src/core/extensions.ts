declare global {
  interface Number {
    toSigned(): string;

    gte(val: number): boolean

    gt(val: number): boolean

    minus(val: number): number

    clamp(min: number, max: number): number
  }

  interface String {
    num(): number
  }
}
Number.prototype.toSigned = function () {
  return this.valueOf() < 0 ? `${this}` : "+" + this.toString()
}
Number.prototype.gte = function (val: number) {
  return this.valueOf() >= val
}
Number.prototype.gt = function (val: number) {
  return this.valueOf() > val
}
Number.prototype.minus = function (val: number) {
  return this.valueOf() - val
}
Number.prototype.clamp = function (min,max) {
  // why should i define Number as number
  return Math.min(Math.max(min,this as number), max)
}

String.prototype.num = function () {
  return Number(this)
}

export function init() {
  // console.log("init extensions")
}