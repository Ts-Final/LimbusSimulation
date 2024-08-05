<script lang="ts" setup>
import {Identity} from "@/core/identity.ts";
import {computed} from "vue";

const identity = Identity.current()
const rarityWidth = computed(() => identity.rarity * 12 + "px")
</script>

<template>
  <div class="UG-wrapper">
    <div class="UG-character">{{ identity.character }}</div>
    <div class="UG-name">{{ identity.name }}</div>
    <div class="UG-rarity-wrapper">
      <div class="UG-rarity"></div>
    </div>
    <table style="margin: 4px;" class="border-table">
      <tr>
        <td colspan="7">
          数值一览（45级）
        </td>
      </tr>
      <tr>
        <td>
          <img alt="体力" src="../../assets/icons/hp.png" style="width: 30px;">
        </td>
        <td>{{ Identity.hp(identity) }}</td>
        <td>
          <img alt="防御" src="../../assets/icons/def.png" style="width: 30px;"/>
        </td>
        <td>{{ identity.defense + 45 }}</td>
        <td colspan="2">混乱阈值</td>
        <td>速度</td>
      </tr>
      <tr>
        <td>基础值</td>
        <td>{{ identity.hp.base }}</td>
        <td>基础值</td>
        <td>人格等级</td>
        <td>系数</td>
        <td>
          {{ identity.stagger }}
        </td>
        <td rowspan="2">
          {{ identity.speed.join("~") }}
        </td>
      </tr>
      <tr>
        <td>变动值</td>
        <td>{{ identity.hp.modify }}</td>
        <td>变动值</td>
        <td>{{ identity.defense }}</td>
        <td>阈值</td>
        <td>
          {{ Identity.stagger(identity)}}
        </td>
      </tr>
    </table>
    <table style="width: 60%; align-self: center;margin-top: 15px;" class="border-table">
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
        <td>x{{ identity.resistance.slash }}</td>
        <td>x{{ identity.resistance.pierce }}</td>
        <td>x{{ identity.resistance.blunt }}</td>
      </tr>
    </table>
<!--    <table cellspacing="0" class="UG-egos">-->
<!--      <tr v-for="[rl,ego] in Object.entries(Identity.egos(identity))">-->
<!--        <td>-->
<!--          <RiskImg :risk-level="rl as RiskLevel" style="height: 20px;"/>-->
<!--        </td>-->
<!--        <td>-->
<!--          <AffinityImg :affinity="ego.affinity" style="height: 20px;width: 20px;"/>-->
<!--          <AtkTypeImg :atk-type="ego.ATKType" style="width: 30px;"/>-->
<!--          {{ ego.name }}-->
<!--        </td>-->
<!--        <template v-if="ego.corrosion.has">-->
<!--          <td>-->
<!--            {{ ego.awakening.basePower }}{{ ego.awakening.coinPower.toSigned() }}&times;{{ ego.awakening.coin }}-->
<!--          </td>-->
<!--          <td>-->
<!--            {{ ego.corrosion.basePower }}{{ ego.corrosion.coinPower.toSigned() }}&times;{{ ego.corrosion.ATKWeight }}-->
<!--          </td>-->
<!--        </template>-->
<!--        <template v-else>-->
<!--          <td colspan="2">-->
<!--            {{ ego.awakening.basePower }}{{ ego.awakening.coinPower.toSigned() }}&times;{{ ego.awakening.coin }}-->
<!--          </td>-->
<!--        </template>-->
<!--        <td>-->
<!--          攻击容量：{{ ego.awakening.ATKWeight }}-->
<!--        </td>-->
<!--      </tr>-->
<!--    </table>-->

<!--    <table style="margin:20px 5px 5px 5px;">-->
<!--      <tr v-for="skill in identity.skills">-->
<!--        <td>-->
<!--          <AffinityImg :affinity="skill.affinity" style="width: 1.1rem;"/>-->
<!--          {{ skill.name }}-->
<!--        </td>-->
<!--        <td>-->
<!--          <AtkTypeImg :atk-type="skill.ATKType" style="width: 30px;"/>-->
<!--        </td>-->
<!--        <td>-->
<!--          {{ skill.BasePower }}+{{ skill.coinPower }}&times;{{ skill.coins }}-->
<!--        </td>-->
<!--        <td>攻击容量：{{ skill.ATKWeight }}</td>-->
<!--        <td>x{{ skill.count }}</td>-->
<!--      </tr>-->
<!--    </table>-->
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