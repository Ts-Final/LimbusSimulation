<script lang="ts" setup>
import {ref} from "vue";

const QA = defineModel<boolean>()

const general = ref(false)
const WTF = ref(false)
const ideals = ref(false)
const credits = ref(false)
</script>

<template>
  <teleport to="body">
    <div v-if="QA" class="SQA-wrapper">
      <div class="SQA-container">
        <div class="SQA-close flex-center" @click="QA = false">
          &times;
        </div>
        <div class="SQA-header">
          一些Q&A
        </div>
        <div class="SQA-content">
          <div :class="general ? 'chosen' :''" class="SQA-titles" @click="general = !general">
            基础使用
          </div>
          <div v-if="general" class="SQA-qas">
            <div class="question">
              有一些基础操作指引吗：
              <span class="black-out" title="是的，就是如此">（说实话我不知道这个标题是用来干什么的）</span>
            </div>
            <div class="answer">
              首先：你能点开这个QA并看到这句话我已经很庆幸了，
              <span class="black-out">（至少你·不·赛·盲。）</span>
              <br>
              简单为你介绍一下现在已经写好的功能：<br>
              首先可以自定义一些角色的各种乱七八糟的数值。<br>
              在人格编辑中，除了“人格列表”和“总览”这两个用来总结性地查看的页面，剩下3个页面能看的见的基本都可以编辑。<br>
              在编辑混乱阈值的时候，请使用空格来分割每一个混乱阈值。<br>
              由于Vue的一些限制（和我不会的东西。），混乱阈值的预览可能会慢半拍。（但是我暂时还没办法。）<br>
              E.G.O呢，同样和上面类似，除了“EGO列表”和“总览”，剩下基本都可以编辑。<br>
              对于技能、EGO，暂时还不能编辑小作文，因为未来有做一些别的东西的打算。<br>
              就这么多，请慢用~
            </div>
          </div>
          <div :class="WTF ? 'chosen' : ''" class="SQA-titles" @click="WTF = !WTF">
            怎么有些奇怪的地方？
          </div>
          <div v-if="WTF" class="SQA-qas">
            <div class="question">
              为什么会有一个以实玛利/捕鲸叉EGO在这里？
            </div>
            <div class="answer">
              别管。<br>
              其实事实上因为我是玛厨。就这样）<br>
              <div class="black-out">
                讲讲我和以实玛利的故事吧。<br>
                在大概24年2月的时候，我被群友推荐去玩宝宝巴士。然后那时候正好是船玛的池子。<br>
                很幸运的是，20抽就出了。当时听到玛玛登场语音的时候非常震撼。那时我并没有了解宝宝巴士的多少剧情，因为我不是很在乎这个游戏（指打舟。），所以一种莫名其妙的敬畏感（不是白夜那种）就油然而生了。那时我每次打关都会带着玛玛（毕竟我剩下3灯就只有一个剑契辛了我能怎么办），这也是我第一个III，IV的人格。<br>
                虽然吧，每次打的时候都能确切地感受到船玛真的吵的爆炸，但是后面听习惯就没什么了，甚至有一种我也在船上然后要打亚哈（划掉）的感觉。你游最强播报员。<br>
                但是很可惜是我第三赛季没怎么打，不然应该拿一个播报员回来的。哎。（注：我不充钱）<br>
                并且那种鱼叉的坚实感和发号施令的紧迫感，仿佛也能把血点沸（？），总之就是特别可以和玛玛共情吧。<br>
                在后面看了一些关于玛玛的资料之后，也觉得这种经历确实很帅吧。在船上当水手，遇到一个这样《号召力》《感染力》的船长，向大海，从巨鲸之口逃生，这种险象环生的经历不仅听着刺激，并且对于玛玛自己而言更是一种厚实的底气——毕竟那样的大风大浪都经历过了。她很坚强，在罪人之中也是属于很稳重的（点名小堂，小松鼠！.jpg，很可爱但是很*不*稳重），而我也希望在后面的章节里面能有更多我们玛玛的戏份（或者瓦夜给一个EGO::失乐园也不是不行）。
              </div>
              <span class="black-out">

              </span>
            </div>
            <div class="question">
              网站标题是怎么个事？
            </div>
            <div class="answer">
              你说的对，但是
              <a id="patches-of-violet"
                 href="https://www.bilibili.com/video/BV11D421A7rW/?share_source=copy_web&vd_source=b7c63d70d643917f47d5a7bbbc570655&t=67">I</a>
              <br>
              点击以聆听。（乐）
            </div>
            <div class="question">
              EGO为什么什么都可以装？还有T.ARK.是什么？
            </div>
            <div class="answer">
              对于EGO，计划是不为其设置一个特别的危险等级（只是默认的而已），在装备时考虑到有些时候会重复使用EGO（其实是有人和我说别锁着等级），所以没有改。<br>
              仍然，必须装备Z级的EGO，这个不能犯天条。<br>
              T.ARK.是我的一个自作游戏（当然现在没时间做现在恐怕也不会怎么做了）中的设定，是Terminal: Artificial Resistance
              of Karma的缩写。<br>
              同时，人格的默认名字（羽化ARK="雪芸"）同样是这个设定出来的东西，雪芸是故事里极（重要？）的人物（可能类似于Angela在你游的地位吧），然后同时我一般用作笔名。<br>
              请不要纠结这个ARK相关的东西，在战斗中我不会让这个东西上场的（看情况吧，有意见再说。）
            </div>
          </div>
          <div :class="ideals ? 'chosen' :''" class="SQA-titles" @click="ideals = !ideals">
            下一步打算？
          </div>
          <div v-if="ideals" class="SQA-qas">
            <div class="question">
              现阶段的工作计划？
            </div>
            <div class="answer">
              首先呢，下一个版本出来之后，会出一个简单的模拟器。<br>
              在该版本的模拟器中，就是看直伤了（维导：喜欢我60+40x5吗），会做一些简单的拼点机制。<br>
              然后，EGO侵蚀！！！！侵蚀！！！！过载！！！！
            </div>
            <div class="question">
              较远大的计划？
            </div>
            <div class="answer">
              赶快添加技能总体小作文区和每枚硬币的小作文区。<br>
              我会朝着这个方向努力，并且希望做到：<br>
              如果只是文本编辑器，那是容易的，但是如果是统一人格编辑器（带战斗模拟），甚至带编程化自定义buff效果的，那是很难的工程<br>
              所以我尽力，也希望某时这玩意能成功。哈哈！
            </div>
          </div>
          <div :class="credits ? 'chosen' : ''" class="SQA-titles" @click="credits = !credits">
            感谢名单
          </div>
          <div v-if="credits" class="SQA-qas">
            <div class="answer">
              还没想好。
            </div>
          </div>
          <div v-if="credits && false" class="SQA-qas">
            <div class="answer">
              感谢sxy62146214/cyxw，两位在我游玩宝宝巴士期间提供了支持和建议（就是他们俩+几位群友带我入的坑）
            </div>
            <div class="answer">
              感谢Riverflow/Sicdera，两位在我在水群的时候提供了很大的欢乐。同时希望Sic的巴士生涯顺利（
            </div>
            <div class="answer">
              感谢Terminal Society的每一位员工。你们是最棒的，实现最后的崩裂，感谢你们的一路坚持和付出！
            </div>
            <div class="answer">
              感谢我的全家。哈哈）
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.SQA-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000088;
}

.SQA-container {
  position: absolute;
  left: 20%;
  top: 15%;
  width: 60%;
  height: 70%;
  border: 2px #7cdcf4 solid;
  background-image: linear-gradient(60deg, #0d1418 0%, #11161b 100%);
  animation: a-SQA-container 1.2s ease-in-out normal;
}

@keyframes a-SQA-container {
  0% {
    transform: translateY(-100vh);
  }
  25% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(0);
  }
}

.SQA-close {
  position: absolute;
  top: 5px;
  right: 5px;
  border: 2px solid #7cdcf4;
  background-color: #11161b;
  width: 1rem;
  height: 1rem;
  cursor: pointer;
  user-select: none;
  font-size: 1.2rem;
  font-weight: bold;
  transition: all 0.1s linear;
  z-index: 999;
}

.SQA-close:hover {
  border: 2px solid #7cdcf4;
  background-color: #7cdcf4;
  color: #11161b;
}

.SQA-header {
  position: relative;
  top: 5px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.SQA-content {
  position: relative;
  height: calc(100% - 2rem - 10px);
  overflow-y: scroll;
  margin: 5px;
  text-align: left;
  font-size: 1rem;
  font-weight: bold;
  color: #7cdcf4;
  padding-left: 5px;
}

::-webkit-scrollbar {
  width: 10px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #7cdcf4;
  border-radius: 5px;
}

.SQA-titles {
  font-size: 1.2rem;
  line-height: 1.4rem;
  cursor: pointer;
  user-select: none;
  width: max-content;

}

.SQA-titles::after {
  content: "▼";
}

.chosen.SQA-titles::after {
  content: "▲";
}

.SQA-qas {
  border-left: 1px solid #7cdcf4;
  margin-left: 5px;
  margin-top: 5px;
  padding-left: 5px;
  font-weight: normal;
  transition: all 0.2s linear;

}

.question::before {
  content: "Q：";
  width: 24px;
  display: inline-block;
  position: absolute;
  left: 0;
}

.answer {
  color: #b8dcee;
  padding-left: 24px;
}

.question {
  color: #b8dcee;
  padding-left: 24px;
}

.answer::before {
  content: "A：";
  width: 24px;
  display: inline-block;
  position: absolute;
  left: 0;
}

a {
  color: #b8dcee;
}

div {
  position: relative;
}

* {
  line-height: 1.4rem;
}
</style>