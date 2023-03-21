<script setup lang="ts">
  import { provide, reactive } from 'vue'
  export interface AccordionInterface {
    count: number,
    active: null | number,
    only: boolean,
    nav: boolean
  }
  const props = defineProps<{
    only?: boolean,
    nav?: boolean,
  }>()
  const accordion = reactive<AccordionInterface>({
    count: 0,
    active: null,
    only: props.only,
    nav: props.nav
  })
  provide<AccordionInterface>('accordion', accordion)

</script>
<template>
  <div
    class="accordion"
    :class="props.nav? 'is-nav':''"
    role="tablist"
  >
    <slot />
  </div>
</template>

<style>
</style>
