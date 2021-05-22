<template>
  <b-container class="my-3 mt-md-5">
    <b-row>
      <b-col md="6" lg="8" class="text-center mb-3">
        <b-overlay :show="loading" spinner-variant="primary">
          <canvas id="canvas" width="1024" height="1024">
            <strong>你的浏览器不支持 canvas，本应用将无法运行。</strong>
          </canvas>
          <div class="d-none">
            <img id="bg" :src="bgSrc" alt="背景图" @load="redraw" @error="fail">
            <img id="fg" :src="fgSrc" alt="前景图" @load="redraw" @error="fail">
          </div>
        </b-overlay>
      </b-col>
      <b-col>
        <b-row>
          <b-col class="mb-3">
            <b-button v-b-modal.bg-select variant="success" block>
              更换背景
            </b-button>
          </b-col>
          <b-col class="mb-3">
            <b-button v-b-modal.fg-select variant="success" block>
              更换文字
            </b-button>
          </b-col>
        </b-row>
        <b-card v-if="supportsCtxFilter" class="mb-3">
          <template #header>
            <h5 class="mb-0">
              参数设置
            </h5>
          </template>
          <b-form-group label="背景模糊" label-for="input-bg-blur">
            <b-form-input
              id="input-bg-blur"
              v-model="bgBlur"
              type="range"
              min="0"
              max="100"
              step="1"
              @change="redraw"
            />
          </b-form-group>
          <b-form-checkbox v-model="darkFg" switch @change="redraw">
            黑色文字
          </b-form-checkbox>
        </b-card>
        <b-link
          v-if="downloadUrl"
          class="btn btn-primary btn-lg btn-block"
          download="头像.jpg"
          :href="downloadUrl"
          @click="download"
        >
          下载图片
        </b-link>
      </b-col>
    </b-row>

    <b-modal id="intro" title="欢迎使用" no-stacking>
      <p>这个小工具是去年由 G19 级某个菜鸡制作，如果有 C17 级的同学们可能比较熟悉。今年，这个小工具重新上线，祝各位 G18 级的学长学姐们高考加油，考上理想的大学；祝各位 C18 级的学弟学妹们中考加油，在清华附中再战三年！ (ง •_•)ง</p>
      <p>请点击右下方的按钮开始使用。</p>
      <p class="small text-muted mb-0"><del>才不是我懒得更新，所以把去年的代码原封不动搬上来了呢</del></p>

      <template #modal-footer>
        <div class="mr-auto">
          <b-link class="btn btn-sm btn-link" href="https://www.jingbh.top/" target="_blank">
            关于作者
          </b-link>
          <b-link class="btn btn-sm btn-link" href="https://github.com/JingBh/zgk-avatar/issues/new" target="_blank">
            反馈问题
          </b-link>
        </div>
        <b-button v-b-modal.bg-select variant="primary">
          开始选择图片
        </b-button>
      </template>
    </b-modal>

    <b-modal id="bg-select" title="请选择或上传背景图" size="lg">
      <h4>
        预置背景图
        <b-button
          variant="link"
          size="sm"
          :class="bgPreShow ? null : 'collapsed'"
          aria-controls="bg-pre"
          :aria-expanded="bgPreShow ? 'true' : 'false'"
          @click="bgPreShow = !bgPreShow"
        >
          &#9660; 展开
        </b-button>
      </h4>
      <b-collapse id="bg-pre" v-model="bgPreShow">
        <p class="text-muted">
          点击即可选择
        </p>
        <div style="overflow-y:scroll;max-height:20rem;">
          <b-card-group columns>
            <b-card
              v-for="(bgImage, i) in bgImages"
              :key="'bg-pre-' + i"
              class="image-select"
              :class="bgImage === bgSelect ? 'border-success' : null"
              no-body
              @click="onSelectBg(bgImage)"
            >
              <b-card-img-lazy
                :src="bgImage + '?x-oss-process=style/thumbnail'"
                :alt="'预置背景图 ' + i"
                blank-width="512"
                blank-height="1024"
              />
            </b-card>
          </b-card-group>
        </div>
      </b-collapse>
      <hr>
      <h4>自定义背景图</h4>
      <b-form-file
        v-model="customBgFile"
        accept="image/*"
        browse-text="浏览"
        placeholder="请选择图片..."
        drop-placeholder="拖动图片到这里..."
        @input="onCustomBg"
      />

      <template #modal-footer="{ ok }">
        <b-button v-if="customBgFile || bgSelect" variant="primary" @click="bgNext">
          使用此图片
        </b-button>
        <b-button variant="info" @click="bgSkip">
          跳过
        </b-button>
        <b-button variant="secondary" @click="ok()">
          关闭
        </b-button>
      </template>
    </b-modal>

    <b-modal
      id="resizer-modal"
      title="裁剪图片"
      size="lg"
      no-close-on-backdrop
      @shown="resizeNext"
    >
      <p>头像当然需要是正方形的...</p>
      <div>
        <img id="resizer" class="img-fluid" :src="croppingImage" alt="裁剪图片">
      </div>

      <template #modal-footer="{ cancel }">
        <b-button variant="secondary" @click="cancel">
          取消
        </b-button>
        <b-button variant="primary" @click="resizeFinish">
          完成
        </b-button>
      </template>
    </b-modal>

    <b-modal id="fg-select" title="请选择文字" ok-only ok-title="选择此文字">
      <b-card-group columns>
        <b-card
          v-for="(fgImage, i) in fgImages"
          :key="'fg-pre-' + i"
          class="image-select"
          :class="fgImage[0] === fgSrc ? 'border-success' : null"
          no-body
          bg-variant="dark"
          @click="select('fg', fgImage[0])"
        >
          <b-card-img-lazy :src="fgImage[0]" :alt="fgImage[1]" />
          <b-card-footer footer-bg-variant="light" class="text-center">
            {{ fgImage[1] }}
          </b-card-footer>
        </b-card>
      </b-card-group>
    </b-modal>

    <b-modal id="wechat-download" title="下载图片" ok-only ok-title="关闭">
      <p>检测到你可能在微信中使用该网页，而微信中无法使用一键下载。<strong>请长按下面的图片保存。</strong></p>
      <b-img fluid :src="downloadUrl" alt="图片" />
    </b-modal>
  </b-container>
</template>

<script>
import Cropper from 'cropperjs'
import { debounce } from 'lodash'
import { detect } from 'detect-browser'

export default {
  data () {
    return {
      bgImages: [
        '/assets/images/bg/01-new.jpg',
        '/assets/images/bg/02-new.png',
        '/assets/images/bg/03-new.jpg',
        '/assets/images/bg/04-new.jpg',
        '/assets/images/bg/05-new.jpg',
        '/assets/images/bg/06-new.jpg',
        '/assets/images/bg/07-new.jpg',
        '/assets/images/bg/08-new.jpg',
        '/assets/images/bg/09-new.jpg',
        '/assets/images/bg/10-new.jpg',
        '/assets/images/bg/11-new.jpg',
        '/assets/images/bg/12-new.jpg',
        '/assets/images/bg/13-new.jpg',
        '/assets/images/bg/14-new.png',
        '/assets/images/bg/15-new.jpg',
        '/assets/images/bg/16-new.jpg',
        '/assets/images/bg/17-new.jpg',
        '/assets/images/bg/18-new.jpg',
        '/assets/images/bg/19-new.jpg',
        '/assets/images/bg/20-new.jpg',
        '/assets/images/bg/21-new.jpg',
        '/assets/images/bg/22-new.jpg',
        '/assets/images/bg/23-new.jpg',
        '/assets/images/bg/24-new.jpg',
        '/assets/images/bg/25-new.jpg',
        '/assets/images/bg/26-new.jpg',
        '/assets/images/bg/27-new.jpg',
        '/assets/images/bg/28-new.jpg',
        '/assets/images/bg/29-new.jpg',
        '/assets/images/bg/30-new.jpg',
        '/assets/images/bg/31-new.jpg',
        '/assets/images/bg/32-new.jpg',
        '/assets/images/bg/33-new.jpg',
        '/assets/images/bg/01-old.jpg',
        '/assets/images/bg/02-old.jpg',
        '/assets/images/bg/03-old.jpg',
        '/assets/images/bg/04-old.jpg',
        '/assets/images/bg/05-old.jpg',
        '/assets/images/bg/06-old.jpg',
        '/assets/images/bg/07-old.jpg',
        '/assets/images/bg/08-old.jpg',
        '/assets/images/bg/09-old.jpg',
        '/assets/images/bg/10-old.jpg',
        '/assets/images/bg/11-old.jpg',
        '/assets/images/bg/12-old.jpg',
        '/assets/images/bg/13-old.jpg'
      ],
      fgImages: [
        ['/assets/images/fg/gaokao.png', '高考加油'],
        ['/assets/images/fg/zhongkao.png', '中考加油']
      ],
      bgPreShow: false,
      bgSrc: '/assets/images/bg/default.jpg',
      fgSrc: '/assets/images/fg/gaokao.png',
      cropper: null,
      croppingImage: '',
      croppingCallback: null,
      loading: true,
      customBgFile: null,
      bgSelect: '',
      downloadUrl: '',
      darkFg: false,
      bgBlur: 0,
      supportsCtxFilter: false
    }
  },
  mounted () {
    if (location) {
      if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        location.replace(`https:${location.href.substring(location.protocol.length)}`)
      }
    }
    this.$bvModal.show('intro')
    if (localStorage) {
      try {
        this.bgSrc = localStorage.getItem('bgSrc') || '/assets/images/bg/default.jpg'
        this.fgSrc = localStorage.getItem('fgSrc') || '/assets/images/fg/gaokao.png'
        this.bgBlur = Number(localStorage.getItem('bgBlur')) || 0
        this.darkFg = localStorage.getItem('darkFg') === 'true' || false
      } catch (e) {
        console.error(e)
        localStorage.removeItem('bgSrc')
        localStorage.removeItem('fgSrc')
      }
    }
    const browserInfo = detect()
    if (browserInfo.name !== 'ie' && browserInfo.name !== 'safari') {
      this.supportsCtxFilter = true
    }
  },
  created () {
    this.redraw = debounce(this.redraw, 100)
  },
  methods: {
    redraw () {
      try {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#eeeeee'
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        if (this.bgBlur) { ctx.filter = `blur(${this.bgBlur}px)` }
        const bgImage = document.getElementById('bg')
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height)
        ctx.filter = 'blur(0px)'
        if (this.darkFg) { ctx.filter = 'invert(100%)' }
        const fgImage = document.getElementById('fg')
        const fgPadding = canvas.width / 8
        ctx.drawImage(fgImage, fgPadding, fgPadding, canvas.width - fgPadding * 2, canvas.height - fgPadding * 2)
        ctx.filter = 'invert(0)'
        this.downloadUrl = canvas.toDataURL('image/jpeg')
        if (localStorage) {
          localStorage.setItem('bgBlur', this.bgBlur)
          localStorage.setItem('darkFg', this.darkFg)
        }
      } catch (e) {
        console.error(e)
        this.fail()
      }
      this.loading = false
    },
    fail () {
      localStorage.removeItem('bgSrc')
      localStorage.removeItem('fgSrc')
      this.loading = false
      alert('图片加载失败，请重试。')
    },
    resize (url, callback) {
      this.croppingImage = url
      if (this.cropper) { this.cropper.destroy() }
      this.$bvModal.show('resizer-modal')
      this.croppingCallback = callback
    },
    resizeNext () {
      const ele = document.getElementById('resizer')
      this.cropper = new Cropper(ele, {
        aspectRatio: 1,
        autoCrop: true,
        autoCropArea: 1,
        dragMode: 'none',
        rotatable: false,
        scalable: false,
        zoomable: false,
        movable: false
      })
      this.cropper.reset()
    },
    resizeFinish () {
      (async () => {
        this.loading = true
        const ctx = this.cropper.getCroppedCanvas()
        this.$bvModal.hide('resizer-modal')
        const url = ctx.toDataURL('image/jpeg', 80)
        this.croppingCallback(url)
        this.loading = false
      })()
    },
    select (type, url) {
      this.loading = true
      switch (type) {
        case 'bg':
          this.resize(url, (newUrl) => {
            this.loading = true
            this.bgSrc = newUrl
            this.saveUrl()
            this.loading = false
            this.$bvModal.show('fg-select')
          })
          break
        case 'fg':
          this.fgSrc = url
          this.saveUrl()
          break
      }
      this.loading = false
    },
    saveUrl () {
      try {
        localStorage.setItem('bgSrc', this.bgSrc)
        localStorage.setItem('fgSrc', this.fgSrc)
        this.$bvToast.toast('已自动保存修改。', {
          title: '提示',
          autoHideDelay: 1000
        })
      } catch (e) {
        console.error(e)
        localStorage.removeItem('bgSrc')
        localStorage.removeItem('fgSrc')
      }
    },
    bgNext () {
      if (this.customBgFile || this.bgSelect) {
        this.loading = true
        const url = this.customBgFile
          ? URL.createObjectURL(this.customBgFile)
          : this.bgSelect
        this.bgSelect = ''
        this.customBgFile = null
        this.$bvModal.hide('bg-select')
        this.select('bg', url)
      }
    },
    bgSkip () {
      this.$bvModal.hide('bg-select')
      this.$bvModal.show('fg-select')
    },
    onSelectBg (url) {
      if (url) {
        this.bgSelect = url
        this.customBgFile = null
      }
    },
    onCustomBg (file) {
      if (file) {
        this.bgSelect = ''
        this.bgPreShow = false
      }
    },
    download () {
      if (navigator && navigator.userAgent) {
        const ua = navigator.userAgent.toLowerCase()
        if (ua.includes('micromessenger')) {
          this.$bvModal.show('wechat-download')
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .image-select {
    cursor: pointer;

    .border-success {
      border-width: 5px;
    }
  }

  #canvas {
    width: 100%;
    max-width: 2048px;
    border-radius: 0.25rem;
  }
</style>
