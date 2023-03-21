<script setup lang="ts">
// import { } from 'vue'
  export interface AllCheckboxInterface {
    count: number,
    value: number | string | (number | string)[] | null,
    checked: boolean
  }
  export interface VNodeTypeInterface {
    children: object[]
  }
  const props = defineProps<{
    legend: string,
    hideLegend?: boolean,
    allCheckbox?: boolean,
  }>()

</script>
<template>
  <fieldset>
    <legend :class="{'sr-only':props.hideLegend}">
      {{ props.legend }}
    </legend>
    <slot />
  </fieldset>
</template>