<script setup lang="ts">
import { ref, inject, watch, onBeforeMount } from 'vue'
import type { TabInterface } from './Tabs.vue'

  const tabs = inject<TabInterface>('tabs-array')
  const randomString = tabs !== undefined? tabs.id : null
  const index = ref<number>(0)
  const isActive = ref(false)

  watch(
    () => tabs?.selected,
    () => {
      isActive.value = index.value === tabs?.selected
    }
  )
  
  onBeforeMount(() => {
    if (tabs !== undefined){
      index.value = tabs.count
      tabs.count++
    }
  })

</script>
<template>
  <div
    v-show="isActive"
    :id="`${randomString}tab`"
    class="tab-content-panel"
    :class="isActive? 'is-active':''"
    role="tabpanel"
    :aria-labelledby="`${randomString}tabs`"
    :tabindex="isActive? '0':'-1'"
  >
    <div class="tab-panel-inner">
      <slot />
    </div>
  </div>
</template>

<style>

</style>
