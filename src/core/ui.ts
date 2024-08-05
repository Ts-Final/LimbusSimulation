import {Ref, ref} from "vue";

export const Tabs = ["startUp", "identity", "ego", "skill"] as const
type tabs = typeof Tabs[number]
export const CurrentTab: Ref<tabs> = ref("startUp")

export function TabName(tab: tabs) {
  switch (tab) {
    case "startUp":
      return "首页"
    case "identity":
      return "人格编辑"
    case "ego":
      return "EGO编辑"
    case "skill":
      return "技能卡编辑"
  }
}