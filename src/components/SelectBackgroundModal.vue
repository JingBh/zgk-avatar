<template>
  <b-modal
    id="select-background-modal"
    title="请选择或上传背景图"
    size="lg"
    @hidden="clear"
  >
    <h4>
      预置背景图
      <b-button
        variant="link"
        size="sm"
        :class="presetsShown ? null : 'collapsed'"
        aria-controls="select-background-presets"
        :aria-expanded="presetsShown ? 'true' : 'false'"
        @click="presetsShown = !presetsShown"
      >
        &#9660; 展开
      </b-button>
    </h4>
    <b-collapse id="select-background-presets" v-model="presetsShown">
      <p class="text-muted">
        点击即可选择
      </p>
      <div style="overflow-y: scroll; max-height: 45vh">
        <select-image
          v-model="image"
          :options="images"
          @input="onSelectImage"
        />
      </div>
    </b-collapse>
    <hr>
    <h4>自定义背景图</h4>
    <b-form-file
      v-model="customImageFile"
      accept="image/*"
      browse-text="浏览"
      placeholder="请选择图片..."
      drop-placeholder="拖动图片到这里..."
      @input="onCustomImage"
    />

    <template #modal-footer="{ ok, cancel }">
      <b-button v-if="image" v-b-modal.crop-modal variant="primary">
        使用此图片
      </b-button>
      <b-button v-b-modal.select-foreground-modal variant="info" @click="cancel">
        跳过
      </b-button>
      <b-button variant="secondary" @click="ok">
        关闭
      </b-button>
    </template>

    <b-modal
      id="crop-modal"
      title="裁剪图片"
      size="lg"
      no-close-on-backdrop
      @hidden="cropClear"
    >
      <p>头像当然需要是正方形的...</p>
      <div class="text-center">
        <img
          ref="cropper"
          class="img-fluid"
          :src="processedImage"
          style="max-height: 70vh"
          @load="cropLoad"
        >
      </div>

      <template #modal-footer="{ cancel }">
        <b-button variant="secondary" @click="cancel">
          取消
        </b-button>
        <b-button variant="primary" @click="cropFinish">
          完成
        </b-button>
      </template>
    </b-modal>
  </b-modal>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'
import Cropper from 'cropperjs'

import { getBackgrounds } from '../libs/images'
import { ossSave } from '../libs/oss'
import SelectImage from './common/SelectImage.vue'

@Component({
  components: {
    SelectImage
  }
})
export default class SelectBackgroundModal extends Vue {
  images = getBackgrounds()

  image = ''

  get processedImage () {
    return this.isCustomImage ? this.image : (this.image + '?x-oss-process=style/zoom')
  }

  customImageFile: File | null = null

  isCustomImage = false

  presetsShown = false

  cropper: Cropper | null = null

  @Ref('cropper') readonly cropperElement!: HTMLImageElement

  onSelectImage () {
    this.clearImage(true, false)
  }

  onCustomImage (file: File | null) {
    this.clearImage(false, true)
    if (file) {
      this.presetsShown = false
      this.image = URL.createObjectURL(file)
      this.isCustomImage = true
    }
  }

  cropLoad () {
    // const isSquare = Math.abs(this.cropperElement.width - this.cropperElement.height) < 2
    const onReady = () => {
      this.cropperElement.removeEventListener('ready', onReady)
      this.cropper!.reset()
      // if (isSquare) {
      //   this.cropFinish()
      // }
    }
    this.cropperElement.addEventListener('ready', onReady)
    this.cropper = new Cropper(this.cropperElement, {
      aspectRatio: 1,
      autoCrop: true,
      autoCropArea: 1,
      viewMode: 1,
      dragMode: 'none',
      rotatable: false,
      scalable: false,
      zoomable: false,
      movable: false
    })
  }

  cropFinish () {
    const canvas = this.cropper!.getCroppedCanvas({
      maxWidth: 1024,
      maxHeight: 1024
    })

    if (this.isCustomImage) {
      canvas.toBlob((blob: Blob) => {
        ossSave(blob)
      }, 'image/jpeg')
    }

    const newImage = canvas.toDataURL('image/jpeg')
    this.save(newImage)
  }

  cropClear () {
    this.cropper?.destroy()
    this.cropper = null
  }

  save (newImage: string) {
    this.$accessor.setBackground(newImage)
    this.$bvModal.hide('select-background-modal')
    this.$bvModal.show('select-foreground-modal')
  }

  clearImage (clearFile = false, clearImage = false) {
    if (this.isCustomImage) {
      URL.revokeObjectURL(this.image)
      this.isCustomImage = false
    }
    if (clearFile) {
      this.customImageFile = null
    }
    if (clearImage) {
      this.image = ''
    }
  }

  clear () {
    this.cropClear()
    this.clearImage(true, true)
    this.presetsShown = false
  }
}
</script>
