<script setup lang="ts">
import {Musics} from "@/core/musics.ts";
import {computed} from "vue";

const {currentCh, current} = Musics
const {flag} = Musics.refs
const ani = computed(() => flag.value ? "S-rotate" : '')
</script>

<template>
  <div class="sound-tab">
    <div>

      <div class="S-now-playing">
        <div>
          音乐盒
        </div>
        <img src="../../assets/Snagharpoon.png" alt="" class="S-img" :class="ani">
        <div v-if="currentCh">
          {{ currentCh }}
        </div>
        <div v-else>
          无
        </div>
        <div v-if="current">
          时长：{{ current.duration.toFixed() }}s
        </div>
        <div class="S-operator" v-if="current">
          <div @click="Musics.next()">
            下一首
            <br>
            &gtcir;
          </div>
          <div v-if="flag" @click="Musics.pause()">
            暂停
            <br>
            &par;
          </div>
          <div v-else @click="Musics.resume()">
            继续
            <br>
            &triangleright;
          </div>
        </div>
        <div class="S-operator" v-else>
          <div @click="Musics.next()">
            播放
          </div>
        </div>
      </div>
      <div class="S-list">
        <div class="S-title">
          播放列表：
        </div>
        <div>
          Compass
        </div>
        <div>
          Fly, My Wings
        </div>
        <div>
          Between Two Worlds
        </div>
        <div>
          Vitamins
        </div>
        <div>
          In Hell We live, Lament
        </div>
        <div>
          Iron Lotus
        </div>
        <div>
          Through Patches of violet
        </div>
        <div class="black-out">
          都是Mili
          <br>
          有些是我很喜欢的，所以放进来了
        </div>
      </div>

    </div>
  </div>

</template>

<style scoped>
.sound-tab {
  left: 10vw;
  width: 90vw;
  position: relative;
  height: 100%;
  top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.sound-tab > div {
  margin: 20px;
  gap: 15px;
  position: relative;
}

.sound-tab > div > div {
  margin: 20px 15px;
}

.S-now-playing {
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 10px;
  border: 2px solid #7cdcf4;
  text-align: center;
}
.S-rotate {
  animation: a-S-rotate linear infinite forwards 10s;
}
@keyframes a-S-rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform:rotate(360deg);
  }
}

.S-img {
  max-width: 250px;
  align-self: center;
  margin-top: 15px;
  border: #b8dcee 2px solid;
  border-radius: 50%;
}

.S-now-playing > div {
  margin-top: 10px;
}

.S-operator {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
}

.S-operator > div {
  cursor: pointer;
  user-select: none;
  border: 1px solid #b8dcee;
  min-width: 10rem;
  line-height: 1.5rem;
}

.S-list {
  display: flex;
  flex-direction: column;
  line-height: 1.6rem;
  border: 2px solid #7cdcf4;
  padding-top: 3rem;
  text-align: center;
  padding-bottom: 2rem;
}

.S-title {
  position: absolute;
  top: 5px;
  width: 100%;
  text-align: center;
}

div {
  position: relative;
}
</style>