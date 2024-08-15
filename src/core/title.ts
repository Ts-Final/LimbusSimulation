const lines = [
  ["I↓", 721],
  ["must↑ ", 734],
  ["be→ ", 376],
  ["the↓ ", 352],
  ["reason→↑ ", 399 + 391],
  ["why→......", 751],
  ["You ", 426],
  ["have ", 366],
  ["given↑ ", 450],
  ["up↓ ", 375],
  ["your ", 331],
  ["smile↑", 1000],
] as const

export const Cathy = {
  index: 0,
  play() {
    document.title = lines[this.index][0]
    setTimeout(this.play.bind(this), lines[this.index][1])
    const x = document.getElementById("patches-of-violet")
    if (x) x.innerHTML = lines[this.index][0]
    this.index += 1
    if (this.index >= lines.length) this.index = 0
  }
}
