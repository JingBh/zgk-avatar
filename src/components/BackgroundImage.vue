<template>
  <img class="rounded" :src="$accessor.background" :style="blurStyles">
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class BackgroundImage extends Vue {
  get blur (): number {
    return this.$accessor.backgroundBlur
  }

  get blurStyles (): Record<string, string> {
    return {
      filter: `blur(${this.blur}px)`
    }
  }
}
</script>

<style scoped>
  img {
    z-index: 1;
  }
</style>
