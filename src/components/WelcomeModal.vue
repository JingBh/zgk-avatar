<template functional>
  <b-modal id="welcome-modal" visible title="欢迎使用" no-stacking>
    <p>听到广播里的钢琴曲和高考相关守则，看到往昔熙熙攘攘的楼道逐渐变得空无一人，想到高三的各位我可能以后不会再看到了，我这才意识到高考就在眼前了。虽然去参加高考的不是我，但我却有些莫名的紧张——说不清为什么，可能是我马上也要升入高三了吧。高考加油！我们永远在你们身后支持着你们。</p>
    <p class="text-right">
      —— 2021 年 6 月 4 日有感
    </p>
    <hr>
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
