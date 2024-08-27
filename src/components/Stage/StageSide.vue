<script setup lang="ts">
import {computed, Ref, ref, watch} from "vue";
import IdentityCard from "@/components/Identity/IdentityCard.vue";
import {Identity} from "@/core/identity.ts";
import {StageBackend} from "@/core/stage/stageBackend.ts";
import {IdentityStageUnit} from "@/core/stage/stageUnit.ts";

const ui = StageBackend.ui

const side = ref("A") as Ref<"A" | "E">
const sideA = ref([]) as Ref<number[]>
const sideE = ref([]) as Ref<number[]>

watch([sideA, sideE], ([sAn, sEn]) => {
  StageBackend.setUnits(
      sAn.map(x => Identity.index(x))
          .map(x => new IdentityStageUnit("A", x))
          .concat(
              sEn.map(x => Identity.index(x))
                  .map(x => new IdentityStageUnit("E", x))
          )
  )
}, {deep: true})

function toDragStart(index: string) {
  return function (e: DragEvent) {
    if (e.dataTransfer) e.dataTransfer.setData("stage/index-identity", index)
  }
}

function onDrop(e: DragEvent) {
  if (!e.dataTransfer) return;
  const index = e.dataTransfer.getData("stage/index-identity")
  if (side.value == "A") sideA.value.push(index.num())
  else sideE.value.push(index.num())
}

function remove(id: number) {
  if (side.value == "A") {
    sideA.value = sideA.value.findNRemove(id)
  }
  else {
    sideE.value = sideE.value.findNRemove(id)
  }
  fuck()
}

const display = ref(true)
function fuck() {
  display.value = !display.value
  setTimeout(() => {display.value = !display.value}, 1)
}

const condition = computed(() => sideA.value.length > 0 && sideE.value.length > 0)
</script>

<template>
  <div class="SS-wrapper">
    <div class="SS-up" @dragover.prevent @drop="onDrop">
      <div class="SS-choose">
        <div
            :class="side == 'A' ? 'SS-chosen' : ''" @click="side = 'A'">
          友方
        </div>
        <div :class="side == 'E' ? 'SS-chosen' : ''" @click="side = 'E'">
          敌方
        </div>
      </div>
      <div class="SS-side" v-if="side == 'A' && display" @contextmenu.prevent>
        <div v-for="id in sideA">
          <IdentityCard :identity="Identity.index(id)"
                        @contextmenu.prevent="remove(id)"
          />
        </div>
      </div>
      <div class="SS-side" v-if="side=='E' && display" @contextmenu.prevent>
        <div v-for="id in sideE">
          <IdentityCard @contextmenu.prevent="remove(id)"
                        :identity="Identity.index(id)" />
        </div>
      </div>
      <div class="SS-operate border-list">
        <div>
          将人格卡拖动至左侧。
        </div>
        <div v-if="sideA.length <= 0">
          友方没有人啦！
        </div>
        <div v-if="sideE.length <= 0">
          敌方没有人啦！
        </div>
        <div v-if="condition" @click="ui.switch('chaining')">
          开始战斗
        </div>
      </div>
    </div>
    <div class="SS-storage">
      <IdentityCard @dragstart="e => toDragStart(index)(e)"
                    :identity="id" v-for="[index,id] in Object.entries(Identity.storage)"/>
    </div>
  </div>

</template>

<style scoped>
.SS-wrapper {
  display: grid;
  gap: 10px;
  grid-template-rows: 1fr 2fr;
  margin: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  position: relative;

}

.SS-wrapper > div {
  border: 1px solid #b8dcee;
  width: 100%;
  max-width: 100%;
  min-width: 100%;
}

.SS-up {
  display: flex;
  flex-direction: row;
  row-gap: 15px;
  max-width: 100%;
}

.SS-choose {
  display: grid;
  grid-template-rows: 1fr 1fr;
  height: calc(100% - 8px);
  max-width: 2rem;
  margin: 4px;
}

.SS-choose > div {
  border-collapse: collapse;
  cursor: pointer;
  user-select: none;
  text-align: center;
  writing-mode: vertical-lr;
  border: 2px solid transparent;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.SS-chosen {
  border: 2px solid #7cdcf4 !important;
}

.SS-side {
  overflow-x: auto;
  display: flex;
  width: 80%;
  max-width: 80%;
}

.SS-side > div {
  display: flex;
  flex-direction: row;
  align-items: center;

}

.SS-operate {
  position: absolute;
  right: 10px;
  top: 10px;
  width: calc(20% - 40px - 3rem);
}

.SS-operate > div {
  border-collapse: collapse;
  line-height: 2rem;
  text-align: center;
}

.SS-storage {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: auto;
}

.pointer {
  cursor: pointer;
}

.ban {
  cursor: not-allowed;
}
</style>