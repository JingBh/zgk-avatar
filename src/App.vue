<template>
  <b-container class="my-3 mt-md-5">
    <b-row align-h="center">
      <b-col cols="12" sm="11" md="7" class="text-center mb-3">
        <div id="image-container">
          <background-image />
          <foreground-image />
        </div>
      </b-col>
      <b-col cols="12" sm="11" md="5" class="mb-3">
        <b-row>
          <b-col class="mb-3">
            <b-button v-b-modal.select-background-modal variant="success" block>
              更换背景
            </b-button>
          </b-col>
          <b-col class="mb-3">
            <b-button v-b-modal.select-foreground-modal variant="success" block>
              更换文字
            </b-button>
          </b-col>
        </b-row>
        <settings class="mb-3" />
        <b-button variant="primary" size="lg" block @click="download">
          下载图片
        </b-button>
      </b-col>
    </b-row>
    <welcome-modal />
    <select-background-modal />
    <select-foreground-modal />
    <b-modal
      id="wechat-download"
      title="下载图片"
      ok-only
      ok-title="关闭"
      @hidden="downloadingImage = ''"
    >
      <p>检测到你可能在微信中使用该网页，而微信中无法进行一键下载。<strong>请长按下面的图片保存。</strong></p>
      <b-img fluid :src="downloadingImage" />
    </b-modal>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { saveAs } from 'file-saver'

import { isWechat } from './libs/browsers'
import BackgroundImage from './components/BackgroundImage.vue'
import ForegroundImage from './components/ForegroundImage.vue'
import SelectBackgroundModal from './components/SelectBackgroundModal.vue'
import SelectForegroundModal from './components/SelectForegroundModal.vue'
import Settings from './components/Settings.vue'
import WelcomeModal from './components/WelcomeModal.vue'

@Component({
  components: {
    BackgroundImage,
    ForegroundImage,
    SelectBackgroundModal,
    SelectForegroundModal,
    Settings,
    WelcomeModal
  }
})
export default class App extends Vue {
  downloadingImage = ''

  async download () {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 1024
    const ctx = canvas.getContext('2d')!

    await new Promise<void>((resolve) => {
      const background = new Image()
      background.crossOrigin = 'anonymous'
      background.onload = () => {
        ctx.drawImage(background, 0, 0, 1024, 1024)
        resolve()
      }
      background.src = this.$accessor.background
    })

    await new Promise<void>((resolve) => {
      const foreground = new Image()
      foreground.crossOrigin = 'anonymous'
      foreground.onload = () => {
        const foregroundSize = 1024 * this.$accessor.foregroundSize / 100
        const foregroundMargin = (1024 - foregroundSize) / 2
        ctx.drawImage(foreground, foregroundMargin, foregroundMargin, foregroundSize, foregroundSize)
        resolve()
      }
      foreground.src = this.$accessor.foreground
    })

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      if (isWechat()) {
        this.downloadingImage = url
        this.$bvModal.show('wechat-download')
      } else {
        saveAs(url, '头像.jpg')
        URL.revokeObjectURL(blob)
      }
      window._paq.push(['trackEvent', 'Download', 'Download'])
    }, 'image/jpeg')
  }
}
</script>

<style>
  .container {
    max-width: 55rem;
  }

  #image-container {
    position: relative;

    img {
      width: 100%;
      user-select: none;
      top: 0;
      left: 0;
    }
  }
</style>
