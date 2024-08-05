export const Affinity = [
  // 暴怒
  "wrath",
  // 色欲
  "lust",
  // 怠惰
  "sloth",
  // 暴食
  "gluttony",
  // 忧郁
  "gloom",
  // 傲慢
  "pride",
  // 嫉妒
  "envy",
] as const
export type Affinity = typeof Affinity[number]

export const AttackTypes = [
  // 穿刺
  "pierce",
  // 打击
  "blunt",
  // 斩击
  "slash",
] as const
export type AttackType = typeof AttackTypes[number]

export const RiskLevel = [
  "ZAYIN","TETH", "HE", "WAW", "ALEPH", "TARK"
] as const
export type RiskLevel = typeof RiskLevel[number]
export function parseRiskLevel(rl:RiskLevel) {
  if (rl == "TARK") return "T.ARK."
  return rl
}