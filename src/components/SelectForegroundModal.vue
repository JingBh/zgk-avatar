<template>
  <b-modal
    id="select-foreground-modal"
    title="请选择文字"
    ok-only
    ok-title="选择此文字"
    @ok="save"
  >
    <select-image v-model="image" :options="images" />
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { getForegrounds } from '../libs/images'
import SelectImage from './common/SelectImage.vue'

@Component({
  components: {
    SelectImage
  }
})
export default class SelectForegroundModal extends Vue {
  images = getForegrounds()

  image = this.$accessor.foregroundInfo

  save () {
    this.$accessor.setForeground(this.image)
    this.$bvModal.hide('select-foreground-modal')
  }
}
</script>
