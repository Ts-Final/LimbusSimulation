import {computed, Ref, ref, watch} from "vue";
import {GameStorage} from "./GameStorage.ts";
import {Skill} from "./skill/SkillBase.ts";

export namespace ui {
  export const display = ref(false)

  export function refresh() {
    display.value = false
    setTimeout(() => {
      display.value = true
    }, 10)
  }

  export namespace unit {
    export const view = ref(0)
    export const current = computed(() => GameStorage.unit[view.value])
  }

  export const editing = ref("skill") as Ref<"EGO" | "skill">

  export namespace ego {
    export const view = ref(0)
    export const current =
      computed(() => unit.current.value.EGO[view.value])
  }
  export namespace skill {
    export const view = ref(0)
    export const current =
      computed(() => unit.current.value.skills[view.value])
    watch(view, val => {
      Skill.Editor.assign(unit.current.value.skills[val])
    })
  }

}