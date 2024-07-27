<script lang="ts" setup>
import {Skill} from "../../core/skill/SkillBase.ts";
import {ref} from "vue";
import {EGO} from "../../core/ego/EGOBase.ts";
import {Affinities, Affinity, RiskLevel} from "../../core/constants.ts";
import RiskImg from "../small/riskImg.vue";
import AffinityImg from "../small/affinityImg.vue";
import {resToClass} from "../../core/utils/utils.ts";
import {Unit} from "../../core/unit/UnitBase.ts";
import {notify} from "../../core/utils/notify.ts";

function deleteEgo(index: number) {
  if (EGO.storage.length == 1) {
    alert("最后一个EGO啦！（经理侵蚀了）")
    return;
  }
  if (!confirm("删掉吗？")) return

  for (const unit of Unit.storage) {
    for (const rl of RiskLevel) {
      if (unit.EGO[rl] == index && rl=="ZAYIN") {
        notify.error(unit.name + "已将此EGO装备为ZAYIN，请先将该单位的Z级EGO换掉。",1000)
        return
      } else if (unit.EGO[rl] == index) {
        unit.EGO[rl] = undefined
      } else if (unit.EGO[rl]?.gt(index)) {
        // here the unit.EGO[rl] must be a number. Fuck the type-check again and again.
        unit.EGO[rl] = unit.EGO[rl]?.minus(1)
      }
    }
  }
  EGO.viewing.value = -1
  EGO.Editor.assign(EGO.current.value)
  Skill.Editor.assign(Skill.current.value)
  EGO.storage.splice(index, 1)
  EGO.viewing.value = 0
  fuck()
}

const display = ref(true)

function fuck() {
  display.value = false
  setTimeout(() => display.value = true, 10)

}

function resistance(data: EGO.dataType) {
  const r: Partial<Record<Affinity, number>> = {}
  for (const affinity of Affinities) {
    if (data.resistance[affinity] != 1) {
      r[affinity] = data.resistance[affinity]
    }
  }
  return r
}
function newEgo() {
  EGO.storage.push(EGO.init())
  fuck()
}
</script>

<template>
  <div v-if="display" class="EL-wrapper">
    <div v-for="[index,data] in Object.entries(EGO.storage)">
      <div class="EL-name/rl">
        {{ data.name }}
        <br>
        <risk-img :risk-level="data.RiskLevel" style="height: 20px;"/>
      </div>
      <div style="padding-left: 5px;">
        <div v-for="[affinity, count] in Object.entries(resistance(data))"
             style="display: flex;flex-direction: row;width: 80px;">
          <AffinityImg :affinity="affinity as Affinity" style="width: 20px;"/>
          <span :class="resToClass(count)" style="vertical-align:center;">&times;{{ count }}</span>
        </div>
      </div>
      <div class="EL-sp">
        <img alt="理智消耗：" src="../../assets/icons/sp.png">
        <span>{{ data.awakening.sp }}</span>
        <span v-if="data.corrosion.has">/{{ data.corrosion.sp }}</span>
      </div>
      <div class="EL-power">
        觉醒：{{ data.awakening.basePower }}{{ data.awakening.coinPower.toSigned() }}&times;{{ data.awakening.coin }}
        <template v-if="data.corrosion.has">
          <br>
          侵蚀：{{ data.corrosion.basePower }}{{ data.corrosion.coinPower.toSigned() }}&times;{{ data.corrosion.coin }}
        </template>
      </div>
      <div class="EL-source">
        {{ data.source }}
      </div>
      <div class="EL-button" style="width: 90px;"
           @click="EGO.viewing.value = Number(index)">
        编辑
      </div>
      <div class="flex-center EL-delete" @click="deleteEgo(Number(index))"
           style="flex-grow: 1">
        删除

      </div>
    </div>
    <div style="width: 100%;height: 4rem;display: flex">
      <div class="EL-button" style="width: 8rem;" @click="newEgo">新增</div>
      <div class="flex-center"
           style="flex-grow: 1;text-align:center;flex-direction: column">
        空的。
        <br>
        <span title="真是空的。"
              class="black-out">也是空的。</span>
      </div>
    </div>
  </div>


</template>

<!--suppress SpellCheckingInspection -->
<style scoped>
* :not(span) {
  user-select: none;
}
.EL-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: min-content;
  border-bottom: 1px solid grey;
}

.EL-wrapper > div {
  display: flex;
  flex-direction: row;
  border-left: 1px solid grey;
}

.EL-wrapper > div > div {
  border-top: 1px solid grey;
  border-right: 1px solid grey;
}

.EL-name\/rl {
  display: flex;
  width: 8rem;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.EL-sp {
  width: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.EL-button {
  cursor: pointer;
  user-select: none;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.EL-power {
  width: 150px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.EL-source {
  width: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  text-wrap: wrap;
}

.EL-delete {
  cursor: pointer;
  user-select: none;
  color: red;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>