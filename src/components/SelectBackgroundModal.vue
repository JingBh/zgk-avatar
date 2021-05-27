<template>
  <b-modal
    id="select-background-modal"
    title="请选择或上传背景图"
    size="lg"
    no-stacking
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
    <b-collapse
      id="select-background-presets"
      v-model="presetsShown"
    >
      <p class="text-muted">
        点击即可选择
      </p>
      <div style="overflow-y: scroll; max-height: 45vh">
        <select-image
          v-model="image"
          :options="images"
        />
      </div>
    </b-collapse>
    <hr>
    <!--<h4>自定义背景图</h4>
    <b-form-file
      v-model="customBgFile"
      accept="image/*"
      browse-text="浏览"
      placeholder="请选择图片..."
      drop-placeholder="拖动图片到这里..."
      @input="onCustomBg"
    />-->

    <template #modal-footer="{ ok }">
      <b-button
        v-if="image"
        variant="primary"
        @click="next"
      >
        使用此图片
      </b-button>
      <b-button
        v-b-modal.select-foreground-modal
        variant="info"
      >
        跳过
      </b-button>
      <b-button
        variant="secondary"
        @click="ok()"
      >
        关闭
      </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { getBackgrounds } from '../libs/images'
import SelectImage from './common/SelectImage.vue'

@Component({
  components: {
    SelectImage
  }
})
export default class SelectBackgroundModal extends Vue {
  images: string[] = getBackgrounds()

  image: string = ''

  presetsShown = false

  next () {

  }
}
</script>
