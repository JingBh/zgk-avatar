<template>
  <b-container class="my-5">
    <h2 class="mb-4">
      嗯？你现在来干嘛？
    </h2>
    <p>正如其名，中高考加油头像生成器只会在高考前开始开放，并在中考结束后数天内关闭。</p>
    <hr class="my-4">
    <h4 class="mb-4">
      有什么想对作者说的吗？
    </h4>
    <b-row class="mb-4" no-gutters>
      <b-col cols="auto">
        <b-avatar src="https://cdn.jsdelivr.net/gh/JingBh/website/assets/images/avatar.png" size="52" />
      </b-col>
      <b-col class="pl-3">
        <h5 class="mb-1">
          JingBh
        </h5>
        <span class="text-muted">&larr; 这个 B 决定留下他的联系方式了！</span>
      </b-col>
    </b-row>
    <p>微信搜索 JingBh_ 或 Telegram 找到 <a style="color: inherit" href="https://t.me/JingBh" target="_blank">@JingBh</a> 即可</p>
    <hr class="my-4">
    <h4 class="mb-4">
      或者...你是来看清华附中高清美图的？
    </h4>
    <p>那就很抱歉了。大量图片访问会产生不小的流量费，这也是我在非中高考期间关闭网站的原因之一。这些图片都是 THSTV 提供给我的，很感谢他们。如果你想看，也许可以找他们要？</p>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
}
</script>

<style>
  .container {
    max-width: 40rem;
  }
</style>
