<template>
  <b-card-group columns>
    <b-card
      v-for="(option, i) in options"
      :key="i"
      :border-variant="isSelected(option) ? 'success' : ''"
      class="option"
      no-body
      @click="select(option)"
    >
      <b-card-img-lazy
        class="bg-dark"
        :src="getImage(option) + '?x-oss-process=style/thumbnail'"
        blank-width="512"
        blank-height="1024"
      />
      <b-card-footer
        v-if="getTitle(option) || isSelected(option)"
        :footer-bg-variant="isSelected(option) ? 'success' : 'light'"
        :footer-text-variant="isSelected(option) ? 'light' : 'dark'"
        class="text-center"
      >
        <template v-if="getTitle(option)">
          {{ getTitle(option) }}
          <template v-if="isSelected(option)">
            <br>
            (&check; 已选择)
          </template>
        </template>
        <template v-else>
          &check; 已选择
        </template>
      </b-card-footer>
    </b-card>
  </b-card-group>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from 'vue-property-decorator'

type Option = string | [string, string]

@Component
export default class SelectImage extends Vue {
  @Prop({
    type: Array,
    default: () => []
  }) readonly options!: Option[]

  @VModel({ type: [String, Array] }) selectValue!: Option

  getImage (value: Option): string {
    return typeof value === 'string' ? value : value[0]
  }

  getTitle (value: Option): string | null {
    return typeof value === 'string' ? null : value[1]
  }

  isSelected (value: Option): boolean {
    return this.getImage(value) === this.getImage(this.selectValue)
  }

  select (value: Option) {
    this.selectValue = value
  }
}
</script>

<style scoped>
  .option {
    cursor: pointer;

    img:not(:last-child) {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
</style>
