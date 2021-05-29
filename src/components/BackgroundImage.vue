<template>
  <img
    id="background"
    class="rounded"
    :src="$accessor.background"
    :style="styles"
  >
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class BackgroundImage extends Vue {
  get blur (): number {
    return this.$accessor.backgroundBlur
  }

  get styles (): Record<string, string> {
    return {
      filter: `blur(${this.blur}px)`
    }
  }
}
</script>

<style scoped>
  img {
    position: relative;
    z-index: 1;
  }
</style>
