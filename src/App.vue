<template>
  <b-container
    class="my-3 mt-md-5"
    style="max-width: 55rem"
  >
    <b-row align-h="center">
      <b-col
        cols="12"
        sm="11"
        md="7"
        class="text-center mb-3"
      >
        <div id="image-container">
          <background-image />
          <foreground-image />
        </div>
      </b-col>
      <b-col
        cols="12"
        sm="11"
        md="5"
        class="mb-3"
      >
        <b-row>
          <b-col class="mb-3">
            <b-button
              v-b-modal.select-background-modal
              variant="success"
              block
            >
              更换背景
            </b-button>
          </b-col>
          <b-col class="mb-3">
            <b-button
              v-b-modal.select-foreground-modal
              variant="success"
              block
            >
              更换文字
            </b-button>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <welcome-modal />
    <select-background-modal />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import BackgroundImage from './components/BackgroundImage.vue'
import ForegroundImage from './components/ForegroundImage.vue'
import SelectBackgroundModal from './components/SelectBackgroundModal.vue'
import WelcomeModal from './components/WelcomeModal.vue'

@Component({
  components: {
    BackgroundImage,
    ForegroundImage,
    SelectBackgroundModal,
    WelcomeModal
  }
})
export default class App extends Vue {

}
</script>

<style>
  #image-container {
    position: relative;

    img {
      width: 100%;
      user-select: none;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
