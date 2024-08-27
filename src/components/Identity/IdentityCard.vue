<script lang="ts" setup>
import { Identity } from '@/core/identity';
import { Ref } from 'vue';
import {sound} from "@/core/sound.ts";

const props = defineProps<{ identity: Identity, chosen?: Ref<boolean> }>()
const identity = props.identity
const chosen = props.chosen ?? false

const W = identity.rarity * 12 + "px"

</script>

<template>
  <div class="identity-card" draggable="true"
       @mouseenter="sound.char.hover.play"
       :class="chosen ? 'identity-card-chosen' : ''">
    <div class="identity-rarity" />
    <div class="identity-inf">
      <div>
        <img src="../../assets/icons/hp.png" alt="体力">
        {{ Identity.hp(identity) }}
      </div>
      <div>
        <img src="../../assets/icons/def.png" alt="防御">
        {{ identity.defense + identity.level }}
      </div>
      <div>
        速度：{{identity.speed.join("~")}}
      </div>
    </div>
    <div class="identity-name">
      {{ identity.name }}<br>
      {{ identity.character }}
    </div>
    <div class="identity-level">Lv. {{ identity.level }}</div>
    <div class="">
    </div>
  </div>
</template>

<style lang="css" scoped>
.identity-card {
  width: 150px;
  min-width: 150px;
  height: 250px;
  border: rgb(254, 223, 0) 2px solid;
  border-radius: 10px;
  transition: all 0.2s linear;
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 5px;

  user-select: none;
  cursor: pointer;
}

.identity-card:hover {
  box-shadow: rgb(214, 94, 3) 0 0 5px 5px;
}

.identity-card-chosen {
  box-shadow: rgb(214, 94, 3) 0 0 5px 5px;

}

.identity-rarity {
  width: v-bind(W);
  height: 20px;
  background-image: url("../../assets/rarity.png");
  left: 5px;
  position: relative;
}

.identity-level {
  position: absolute;
  right: 5px;
  bottom: 5px;
  text-align: right;
  font-family: "ExcelsiorSans", sans-serif;
  line-height: 1.6rem;
}

.identity-name {
  position: absolute;
  bottom: calc(5px + 2rem);
  text-align: right;
  right: 5px;
}

.identity-popout {
  position: relative;
  border: 2px solid #7cdcf4;
}

.identity-inf {
  margin-top: 5px;
  padding-left: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 90%;
}

img {
  max-height: 30px;
}
</style>