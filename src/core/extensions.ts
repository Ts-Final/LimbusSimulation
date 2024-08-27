declare global {
  interface Number {
    toSigned(): string;

    gte(val: number): boolean

    gt(val: number): boolean

    minus(val: number): number

    clamp(min: number, max: number): number

    valid<T>(or:T): number|T
  }

  interface String {
    /**
     * Returns Number(value)
     */
    num(): number

    or<T>(or:T): string|T
  }
  interface Array<T> {
    findNRemove(val:T) :T[],
    fill<K>(val:K): K[],
    clear(): void
  }

  interface Window {
    dev: any
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
Number.prototype.valid = function (this:number,other){
  return isFinite(this) ? other : this
}

String.prototype.num = function () {
  return Number(this)
}

Array.prototype.findNRemove = function (value) {
  const index = this.indexOf(value)
  if (index == -1) throw new Error("Value is not in the array")
  this.splice(index, 1)
  return this
}
Array.prototype.clear = function () {
  while (this.length > 0) {
    this.pop()
  }
}

export function init() {
  // console.log("init extensions")
}