<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
import { getRandomId } from '@/utils/common'

const props = defineProps<{
  modelValue?: string | number,
  value?: string | number,
  type?: string,
  label: string,
  hideLabel?: boolean,
  disabled?: boolean,
  readonly?: boolean,
  placeholder?: string,
  error?: boolean,
  errorMessage?: string,
  min?: number,
  max?: number,
  minLength?: number,
  maxLength?: number,
  autocomplete?: boolean,
  autofocus?: boolean,
  required?: boolean,
  pattern?: string
}>()

const emit = defineEmits(['update:modelValue', 'update:error', 'input', 'update', 'change', 'blur'])

const randomString = getRandomId()
const isInput = ref<string | number | undefined>(props.modelValue)
const clear = ref(false)
const inputEl = ref<HTMLInputElement>()

const error = ref(props.error)
watch(props, () => { 
  isInput.value = props.modelValue
  error.value = props.error
})

function onInput(){
  emit('update:modelValue', isInput.value)
  emit('input', isInput.value)

  isInput.value !== ''? clear.value = true : clear.value = false
  if (props.maxLength !== undefined) {
    maxLengthCheck()
  }
}
function updateInput(){
  emit('update:modelValue', isInput.value)
  emit('update', isInput.value)
}
function changeInput(){
  emit('update:modelValue', isInput.value)
  emit('change', isInput.value)
}
function blurInput(e: Event){
  clear.value = false
  emit('update:modelValue', isInput.value)
  emit('blur', isInput.value)

  if (props.pattern !== undefined){
    patternCheck(e)
  }
}
function onClear(){
  isInput.value = ''
  clear.value = false
  inputEl.value?.focus()
  emit('update:modelValue', isInput.value)
}
function maxLengthCheck(){
  if (inputEl.value !== undefined) {
    const target = inputEl.value
    if (target.value?.length > target.maxLength){
      isInput.value = target.value.slice(0, target.maxLength)
      
      emit('update:modelValue', isInput.value)
      emit('input', isInput.value)
    }
  }
}
function patternCheck(e: Event){
  const pattern = new RegExp(`${props.pattern}`)
  const target = e.target as HTMLInputElement
  if (props.pattern !== undefined){
    if (!pattern.test(target.value) && target.value !== ''){
      emit('update:error', true)
    }else {
      emit('update:error', false)
    }
  }
}

</script>
<template>
  <div class="form-input-group">
    <label
      :for="`${randomString}Input`"
      class="form-input-label"
      :class="{'sr-only':props.hideLabel}"
    >
      {{ props.label }}
    </label>
    <div class="form-inner-group">
      <input
        :id="`${randomString}Input`"
        ref="inputEl"
        v-model="isInput"
        :type="props.type"
        class="form-input"
        :class="{'is-error':props.error}"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :aria-describedby="props.error? `${randomString}Input-error`:''"
        :aria-invalid="error"
        :min="props.min"
        :max="props.max"
        :minlength="props.minLength"
        :maxlength="props.maxLength"
        :autocomplete="props.autocomplete? 'on':'off'"
        :autofocus="props.autofocus"
        :required="props.required"
        :pattern="props.pattern"
        @input="onInput"
        @update="updateInput"
        @change="changeInput"
        @blur="blurInput($event)"
        @keyup.enter="blurInput($event)"
      >
      <button
        v-show="clear"
        type="button"
        class="btn btn-close"
        aria-label="지우기"
        @mousedown="onClear"
        @touchstart="onClear"
      >
        <span class="icon icon-close" />
      </button>
    </div>
    <div
      v-if="error"
      :id="`${randomString}Input-error`"
      class="form-input-valid"
      :class="{'is-show':error || props.error}"
      aria-live="assertive"
    >
      {{ props.errorMessage }}
    </div>
  </div>
</template>