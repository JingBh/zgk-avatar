<template>
  <b-card>
    <template #header>
      <h5 class="mb-0">
        参数设置
      </h5>
    </template>
    <b-form-group label="文字大小" label-for="input-foreground-size">
      <b-form-input
        id="input-foreground-size"
        v-model="foregroundSize"
        type="range"
        min="50"
        max="80"
        step="1"
        @input="setForegroundSizeThrottled"
      />
    </b-form-group>
    <!--<b-form-checkbox
      v-model="invertForeground"
      switch
      @change="setForegroundColor"
    >
      黑色文字
    </b-form-checkbox>-->
  </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { debounce } from 'lodash'

@Component
export default class Settings extends Vue {
  foregroundSize = this.$accessor.foregroundSize

  setForegroundSize () {
    this.$accessor.setForegroundSize(Number(this.foregroundSize))
  }

  setForegroundSizeThrottled = debounce(this.setForegroundSize, 500)

  /* invertForeground = false

  setForegroundColor () {
    const foregroundColor = this.invertForeground ? 'black' : 'white'
    this.$accessor.setForegroundColor(foregroundColor)
  } */
}
</script>
