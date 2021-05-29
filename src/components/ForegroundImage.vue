<template>
  <img
    id="foreground"
    :src="image"
    :style="styles"
  >
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ForegroundImage extends Vue {
  get image (): string {
    return this.$accessor.foreground
  }

  get size (): number {
    return this.$accessor.foregroundSize
  }

  get color (): string {
    return this.$accessor.foregroundColor
  }

  get styles (): Record<string, string> {
    const marginSize = (100 - this.size) / 2
    return {
      width: `${this.size}%`,
      margin: `${marginSize}%`,
      filter: this.color === 'white' ? '' : 'invert(1)'
    }
  }
}
</script>

<style scoped>
  img {
    transition: 0.5s;
    transition-property: width, height, margin, filter;
    z-index: 2;
  }
</style>
