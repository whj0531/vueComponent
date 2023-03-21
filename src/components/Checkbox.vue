<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { getRandomId } from '@/utils/common'

  const props = defineProps<{
    modelValue?: boolean | (string | number)[],
    value: string | number,
    label?: string,
    name?: string,
    hideLabel?: boolean,
    disabled?: boolean,
  }>()
  const emit = defineEmits(['update:modelValue', 'change'])
  const randomString = getRandomId()
  const trueValue = ref(true)
  const falseValue = ref(false)

  const isChecked = computed({
    get(){
      
      if (props.modelValue instanceof Array) {
        return props.modelValue.includes(props.value)
      }
      return props.modelValue === trueValue.value
    },
    set(newValue){
      return newValue
    }
  })

  function updateInput (e: Event){
    const isChecked = (e.target as HTMLInputElement).checked
    if (props.modelValue instanceof Array){
      const newValue = [...props.modelValue]
      if (isChecked) {
        newValue.push(props.value)
      }else {
        newValue.splice(newValue.indexOf(props.value), 1)
      }
      emit('update:modelValue', newValue, isChecked)
      emit('change', newValue, isChecked)
    } else {
      
      emit('update:modelValue', isChecked ? trueValue.value : falseValue.value)
      emit('change', isChecked ? trueValue.value : falseValue.value)
    }
  }
  
  

</script>

<template>
  <div class="form-checkbox-group">
    <input
      :id="`${randomString}chk`"
      v-model="isChecked"
      class="form-checkbox"
      type="checkbox"
      :name="props.name"
      :disabled="disabled"
      @change="updateInput($event)"
    >
    <label
      :for="`${randomString}chk`"
      class="form-checkbox-label"
    >
      <slot>{{ props.label }}</slot>
    </label>
  </div>
</template>

<style>
</style>
