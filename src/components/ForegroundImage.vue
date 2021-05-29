<template>
  <img :src="image" :style="sizeStyles">
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

  get sizeStyles (): Record<string, string> {
    const marginSize = (100 - this.size) / 2
    return {
      width: `${this.size}%`,
      margin: `${marginSize}%`
    }
  }
}
</script>

<style scoped>
  img {
    z-index: 2;
  }
</style>
