<script setup lang="ts">
  import { ref, onUpdated } from 'vue';
  import { getRandomId } from '@/utils/common'

  const props = defineProps<{
    modelValue?: boolean,
    message?: string,
    hideAuto?: boolean,
    delay?: number,
  }>()
  const emit = defineEmits(['update:modelValue'])
  const randomString = getRandomId()
  const toastName = ref('slide-up')
  const isActive = ref(false)
  const toastDelay = ref()

  onUpdated(() => {
    if (props.modelValue){
      showToast() 
    }
  })
  
  function showToast(){
    toastName.value = 'slide-up'
    isActive.value = true
    emit('update:modelValue', isActive.value)
    toastDelay.value = setTimeout(() => {
      closeToast()
    }, 3000)
  }
  function closeToast(){
    isActive.value = false
    emit('update:modelValue', isActive.value)
    clearTimeout(toastDelay.value)
  }

  defineExpose({
    showToast
  })

</script>
<template>
  <transition
    :name="toastName"
    mode="out-in"
    @leave="toastName = 'slide-down'"
  >
    <div
      v-show="isActive"
      :id="`${randomString}Toast`"
      class="toast"
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      tabindex="0"
    >
      <slot>
        <p>
          {{ props.message }}
        </p>
      </slot>
    </div>
  </transition>
</template>

<style>

</style>
