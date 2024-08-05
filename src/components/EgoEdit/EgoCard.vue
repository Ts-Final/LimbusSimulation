<script lang="ts" setup>
import {Ego} from "@/core/ego.ts";
import {Ref} from "vue";
import RiskImg from "@/components/small/riskImg.vue";
import {Affinity, RiskLevel} from "@/core/constants.ts";
import {resToClass} from "@/core/utils.ts";
import AffinityImg from "@/components/small/affinityImg.vue";

const props = defineProps<{ ego: Ego, chosen?: Ref<boolean>, riskLevel?:RiskLevel }>()
const ego = props.ego
const chosen = props.chosen ?? false
const riskLevel = props.riskLevel ?? ego.RiskLevel
</script>

<template>
  <div :class="`${ego.affinity} ${chosen ? 'ego-card-chosen' : ''}`"
       class="ego-card">
    <div>
      <RiskImg :risk-level="riskLevel" style="height: 30px;"/>
    </div>
    <div>{{ ego.name }}</div>
    <div class="ego-card-sp/power">
      <div>
        <img alt="理智消耗：" src="../../assets/icons/sp.png">
        <span>{{ ego.awakening.sp }}</span>
        <span v-if="ego.corrosion.has">/{{ ego.corrosion.sp }}</span>
      </div>
      <div style="display:flex;flex-direction: column">
        <div>
          {{ ego.awakening.basePower }}{{ ego.awakening.coinPower.toSigned() }}
          &times;{{ ego.awakening.coin }}
        </div>
        <div v-if="ego.corrosion.has">
          {{ ego.corrosion.basePower }}{{ ego.corrosion.coinPower.toSigned() }}
          &times;{{ ego.corrosion.coin }}
        </div>
        <div v-else>无侵蚀</div>
      </div>
    </div>
    <div class="ego-card-popout">
      抗性&资源
      <div class="ego-popout-affinity">
        <div v-for="a in Affinity">
          <AffinityImg :affinity="a" style="width: 1rem;"/>
          <div :class="resToClass(ego.resistance[a])">
            &times;{{ ego.resistance[a] }}
          </div>
          <div>{{ ego.resource[a] }}</div>
        </div>
      </div>
    </div>

  </div>

</template>

<style scoped>
.ego-card {
  width: 200px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: #b8dcee 2px solid;
  transition: all 0.2s linear;
}


.ego-card-sp\/power {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  width: 100%;
}

.ego-card-popout {
  position: absolute;
  box-shadow: none;
  user-select: none;
  pointer-events: none;
  transition: all 0.1s linear;
  opacity: 0;
  transform: translateX(calc(-100% - 10px));
  background-image: var(--bgi);
  flex-direction: column;
  text-align: center;
  border: 2px solid #b8dcee;
}

.ego-card:hover .ego-card-popout {
  display: flex;
  box-shadow: #b8dcee -2px -2px 2px, #000000 3px 3px 2px 2px;
  user-select: none;
  pointer-events: none;
  opacity: 1;


}

.ego-popout-affinity {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}
.ego-card-chosen {
  border-color: #f7f12c;
box-shadow: #bbb516 0 0 4px 2px;
}
</style>