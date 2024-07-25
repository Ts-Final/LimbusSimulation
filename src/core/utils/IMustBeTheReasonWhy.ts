const IMustBeTheReasonWhy = [
  "I↓",
  "must↑",
  "be→",
  "the↓",
  "reason→↑ ",
  "why→.",
  "..You",
  "have",
  "given↑",
  "up↓",
  "your→",
  "smile↑"
]
export default {
  index: 0,
  max: IMustBeTheReasonWhy.length - 1,
  start() {
    document.title = IMustBeTheReasonWhy[this.index]
    setInterval(this.next.bind(this), 300)
  },
  next() {
    if (this.index < this.max) {
      this.index++
    } else {
      this.index = 0
    }
    document.title = IMustBeTheReasonWhy[this.index]
  }
}