<!--suppress HtmlDeprecatedAttribute -->
<script lang="ts" setup>
import {Unit} from "../../core/unit/UnitBase.ts";
import AffinityImg from "../small/affinityImg.vue";
import AtkTypeImg from "../small/atkTypeImg.vue";
import RiskImg from "../small/riskImg.vue";
import {RiskLevel} from "../../core/constants.ts";
import {computed} from "vue";

const unit = Unit.current
const rarityWidth = computed(() => unit.value.rarity * 12 + "px")
</script>

<template>
  <div class="UG-wrapper">
    <div class="UG-character">{{ unit.character }}</div>
    <div class="UG-name">{{ unit.name }}</div>
    <div class="UG-rarity-wrapper">
      <div class="UG-rarity"></div>
    </div>
    <table cellspacing="0" style="margin: 4px;">
      <tr>
        <td colspan="7">
          数值一览（45级）
        </td>
      </tr>
      <tr>
        <td>
          <img alt="体力" src="../../assets/icons/hp.png" style="width: 30px;">
        </td>
        <td>{{ Unit.HP }}</td>
        <td>
          <img alt="防御" src="../../assets/icons/def.png" style="width: 30px;"/>
        </td>
        <td>{{ unit.defense + 45 }}</td>
        <td colspan="2">混乱阈值</td>
        <td>速度</td>
      </tr>
      <tr>
        <td>基础值</td>
        <td>{{ unit.hpBase }}</td>
        <td>基础值</td>
        <td>人格等级</td>
        <td>系数</td>
        <td>
          {{ unit.stagger }}
        </td>
        <td rowspan="2">
          {{ unit.speedRange.join("~") }}
        </td>
      </tr>
      <tr>
        <td>变动值</td>
        <td>{{ unit.hpModifier }}</td>
        <td>变动值</td>
        <td>{{ unit.defense }}</td>
        <td>阈值</td>
        <td>
          {{ Unit.staggerThreshold(unit) }}
        </td>
      </tr>
    </table>
    <table cellspacing="0" style="width: 60%; align-self: center">
      <tr>
        <td colspan="3">攻击抗性</td>
      </tr>
      <tr>
        <td>
          <img alt="斩击" src="../../assets/icons/slash.png" style="width: 30px;">
        </td>
        <td>
          <img alt="穿刺" src="../../assets/icons/pierce.png" style="width: 30px;">
        </td>
        <td>
          <img alt="打击" src="../../assets/icons/blunt.png" style="width: 30px;">
        </td>
      </tr>
      <tr>
        <td>x{{ unit.attackResistance.slash }}</td>
        <td>x{{ unit.attackResistance.pierce }}</td>
        <td>x{{ unit.attackResistance.blunt }}</td>
      </tr>
    </table>
    <table cellspacing="0" class="UG-egos">
      <tr v-for="[rl,ego] in Object.entries(Unit.egos(unit))">
        <td>
          <RiskImg :risk-level="rl as RiskLevel" style="height: 20px;"/>
        </td>
        <td>
          <AffinityImg :affinity="ego.affinity" style="height: 20px;width: 20px;"/>
          <AtkTypeImg :atk-type="ego.ATKType" style="width: 30px;"/>
          {{ ego.name }}
        </td>
        <template v-if="ego.corrosion.has">
          <td>
            {{ ego.awakening.basePower }}{{ ego.awakening.coinPower.toSigned() }}&times;{{ ego.awakening.coin }}
          </td>
          <td>
            {{ ego.corrosion.basePower }}{{ ego.corrosion.coinPower.toSigned() }}&times;{{ ego.corrosion.ATKWeight }}
          </td>
        </template>
        <template v-else>
          <td colspan="2">
            {{ ego.awakening.basePower }}{{ ego.awakening.coinPower.toSigned() }}&times;{{ ego.awakening.coin }}
          </td>
        </template>
        <td>
          攻击容量：{{ ego.awakening.ATKWeight }}
        </td>
      </tr>
    </table>

    <table cellspacing="0" style="margin:20px 5px 5px 5px;">
      <tr v-for="skill in unit.skills">
        <td>
          <AffinityImg :affinity="skill.affinity" style="width: 1.1rem;"/>
          {{ skill.name }}
        </td>
        <td>
          <AtkTypeImg :atk-type="skill.ATKType" style="width: 30px;"/>
        </td>
        <td>
          {{ skill.BasePower }}+{{ skill.coinPower }}&times;{{ skill.coins }}
        </td>
        <td>攻击容量：{{ skill.ATKWeight }}</td>
        <td>x{{ skill.count }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.UG-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.UG-character {
  left: 30px;
  font-size: 2rem;
  font-family: "Mikodacs", sans-serif;
  color: #b8dcee66;
  font-weight: bold;
  user-select: none;
  position: relative;
}

.UG-name {
  position: relative;
  right: 10%;
  color: #b8dcee;
  text-align: right;

  font-family: "Mikodacs", sans-serif;
  font-size: 1.5rem;
}

.UG-egos {
  margin: 20px 5px 5px 5px;
}

.UG-rarity-wrapper {
  height: 20px;
  position: relative;
  display: flex;
}

.UG-rarity {
  width: v-bind(rarityWidth);
  background-image: url("../../assets/rarity.png");
  height: 20px;
  position: absolute;
  right: 10%;
}
</style>