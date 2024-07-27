import {Ref, ref} from "vue";

export const Tabs = ["startUp", "unit", "ego"] as const
type tabs = typeof Tabs[number]
export const CurrentTab: Ref<tabs> = ref("startUp")

export function TabName(tab: tabs) {
  switch (tab) {
    case "startUp":
      return "首页"
    case "unit":
      return "人格编辑"
    case "ego":
      return "EGO编辑"
  }
}