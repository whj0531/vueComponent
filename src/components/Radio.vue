<script setup lang="ts">
  import { computed } from 'vue'
  import { getRandomId } from '@/utils/common'

  const props = defineProps<{
    modelValue?: string | number,
    value: string | number,
    label?: string,
    name?: string,
    hideLabel?: boolean,
    disabled?: boolean,
  }>()
  const emit = defineEmits(['update:modelValue', 'change'])
  const randomString = getRandomId()
  const isChecked = computed({
    get(){
      return props.modelValue === props.value
    },
    set(newValue){
      return newValue
    }
  })
  function updateInput (e: Event) {
    if (typeof props.value === 'number') {
      emit('update:modelValue', props.value)
      emit('change', props.value)
    } else {
      emit('update:modelValue', (e.target as HTMLInputElement).value)
      emit('change', (e.target as HTMLInputElement).value)
    }
  }

</script>
<template>
  <div class="form-radio-group">
    <input
      :id="`${randomString}radio`"
      class="form-radio"
      type="radio"
      :name="props.name"
      :value="props.value"
      :checked="isChecked"
      :disabled="disabled"
      @change="updateInput($event)"
    >
    <label
      :for="`${randomString}radio`"
      class="form-radio-label"
    >
      <slot>{{ props.label }}</slot>
    </label>
  </div>
</template>