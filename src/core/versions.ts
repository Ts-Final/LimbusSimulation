function toDate(
  y: number,
  m: number,
  d: number,
  h: number,
  n: number,
  s=0) {
  const date = new Date()
  date.setFullYear(y + 2000)
  date.setMonth(m)
  date.setDate(d)
  date.setHours(h)
  date.setMinutes(n)
  date.setSeconds(s)
  return date
}

export const Versions: {
  name: string,
  date: Date,
  content: string[]
}[] = [
  {
    name: "v1",
    date: toDate(24, 7, 27, 18,9),
    content: [
      "最早的版本发布啦，好耶好耶好耶",
    ]
  },
  {
    name: "v2",
    date: toDate(24,8,5,16,28,0),
    content: [
      "第二个版本上线了。",
      "*新增内容：编辑技能"
    ]
  },
  {
    name: "v3",
    date: toDate(24, 8, 27, 15, 0),
    content: [
      "测试版本v1。如果有问题请加群。",
      "*新增内容：战斗模拟器、音乐盒",
      "调整了ui"
    ]
  }
]