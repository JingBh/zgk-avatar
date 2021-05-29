<template>
  <b-modal id="welcome-modal" v-model="visible" title="欢迎使用" no-stacking>
    <p>这个小工具是去年由 G19 级某个菜鸡制作，如果有 C17 级的同学们可能比较熟悉。今年，这个小工具重新上线，祝各位 G18 级的学长学姐们高考加油，考上理想的大学；祝各位 C18 级的学弟学妹们中考加油，在清华附中再战三年！ (ง •_•)ง</p>
    <p>请点击右下方的按钮开始使用。</p>

    <template #modal-footer>
      <div class="mr-auto">
        <b-link
          class="btn btn-sm btn-link"
          href="https://www.jingbh.top/"
          target="_blank"
        >
          关于作者
        </b-link>
        <b-link
          class="btn btn-sm btn-link"
          href="https://github.com/JingBh/zgk-avatar/issues/new"
          target="_blank"
        >
          反馈问题
        </b-link>
      </div>
      <b-button v-b-modal.select-background-modal variant="primary">
        开始选择图片
      </b-button>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class WelcomeModal extends Vue {
  visible = true
}
</script>
