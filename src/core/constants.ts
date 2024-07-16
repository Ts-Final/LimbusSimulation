export type callable<T = any> = () => T

// 无差别攻击
export const Indiscriminate = "Indiscriminate"
export const SkillEvent = [
  // 战斗开始
  'CombatStart',
  // 使用时
  'OnUse',
  // 正面命中时
  "HeadsHit",
  // 反面命中时
  "TailsHit",
  // 命中时
  "OnHit",
  // 击杀时
  "OnKill",
  // 攻击前
  "BeforeAttack",
  // 攻击后
  "AfterAttack",
  // 拼点胜利
  "ClashWin",
  // 拼点失败
  "ClashLose",
  // 闪避时
  "OnEvade",
  // 投掷时（为了流血设计的）
  "OnTossing",

] as const
export type SkillEvent = typeof SkillEvent[number]

export const Affinities = [
  // 暴怒
  "Wrath",
  // 色欲
  "Lust",
  // 怠惰
  "Sloth",
  // 暴食
  "Gluttony",
  // 忧郁
  "Gloom",
  // 傲慢
  "Pride",
  // 嫉妒
  "Envy",
] as const
export type Affinity = typeof Affinities[number]

export const AttackTypes = [
  // 穿刺
  "Pierce",
  // 打击
  "Blunt",
  // 斩击
  "Slash",
] as const
export type AttackType = typeof AttackTypes[number]

export const StaggerLevel = [
  "Stagger",
  "Stagger+",
  "Stagger++"
]
export type StaggerLevel = typeof StaggerLevel[number]

export const WinRate = [
  // 绝对劣势
  "Hopeless",
  // 劣势
  "Struggling",
  // 均衡
  "Neutral",
  // 优势
  "Favoured",
  // 绝对优势
  "Dominating",
  // 单方面攻击
  "Unopposed",
  // 偏转
  "Offset",
  // 单方面防御
  "Defense",
]
export type WinRate = typeof WinRate[number]

export const RiskLevel = [
  "ZAYIN","TETH", "HE", "WAW", "ALEPH", "TARK"
] as const
export type RiskLevel = typeof RiskLevel[number]