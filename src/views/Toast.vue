<script setup lang="ts">
import { ref } from 'vue'
import uuToast from '@/components/Toast.vue'

const toast01 = ref<InstanceType<typeof uuToast> | null>(null)
const toast02 = ref<InstanceType<typeof uuToast> | null>(null)
const message = 'Toast Message 입니다.'

function openToast (toast: InstanceType<typeof uuToast> | null) {
  toast?.showToast()
}

</script>
<template>
  <section class="section">
    <h3>Toast</h3>
    <button
      type="button"
      class="btn btn-primary"
      @click="openToast(toast01)"
    >
      Show Toast
    </button>
    <button
      type="button"
      class="btn btn-primary"
      @click="openToast(toast02)"
    >
      Show Toast2
    </button>
    <uu-toast
      ref="toast01"
      :message="message"
    />
    <uu-toast
      ref="toast02"
    >
      <p>Toast Message222 입니다.</p>
    </uu-toast>
  </section>
</template>

<style>
</style>
