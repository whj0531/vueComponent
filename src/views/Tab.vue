<script setup lang="ts">
import uuTabs  from '@/components/Tabs.vue'
import uuTab  from '@/components/Tab.vue'

const tabs : string[] = ['Tab1', 'Tab2', 'Tab3']

</script>
<template>
  <section class="section">
    <h3>Tab</h3>
    <uu-tabs :tabs="tabs">
      <uu-tab>
        탭 내용1
      </uu-tab>
      <uu-tab>
        탭 내용2
      </uu-tab>
      <uu-tab active>
        탭 내용3
      </uu-tab>
    </uu-tabs>
  </section>
</template>

<style>
</style>
