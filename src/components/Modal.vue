<script setup lang="ts">
  import { ref, inject, onUpdated, reactive } from 'vue'
  import { getRandomId } from '@/utils/common'

  interface ModalInterface {
    modal?: HTMLDivElement,
    target?: HTMLButtonElement[],
  }
  interface Props {
    modelValue: boolean,
    hideHeader?: boolean,
    hideFooter?: boolean
  }
  const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    hideHeader: false,
    hideFooter: false
  })
  const emit = defineEmits([
  'update:modelValue',
  'close',
  'open',
  'ok'
  ])
  const randomString = getRandomId()
  const modalContent = ref<HTMLDivElement | undefined>()
  const modalTarget = inject<HTMLButtonElement[] | undefined>('modal-target')

  const modalInfo = reactive<ModalInterface>({
    modal: undefined,
    target: undefined,
  })

  onUpdated(() => {
    if (props.modelValue){
      modalOpen()
    }
  })
  function modalOpen(){
    emit('open')
    emit('update:modelValue', true)
    modalInfo.modal = modalContent.value
    modalInfo.target = modalTarget

    modalInfo.modal?.focus()
    document.body.classList.add('modal-open')
  }
  function modalClose(){
    emit('close')
    emit('update:modelValue', false)
    
    document.body.classList.remove('modal-open')
    // modal + modal 일때 닫아도 .modal-open 넣기
    if (document.getElementsByClassName('modal').length > 1) {
      document.body.classList.add('modal-open')
    }
    targetFocus()
  }
  function modalOk(){
    emit('ok')
    emit('update:modelValue', false)
  }
  function targetFocus(){
    if (modalInfo.target !== undefined) {
      modalInfo.target.forEach((item, i, array) => {
        const lastItem = array[array.length - 1]
        lastItem.focus()
        if (document.activeElement === lastItem){
          array.splice(array.length - 1)
        }
      })
    }
  }
  
</script>
<template>
  <div v-if="modelValue">
    <Teleport to="body">
      <div
        class="modal"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`${randomString}Title`"
        :aria-describedby="`${randomString}Desc`"
      >
        <div class="modal-dialog">
          <div
            ref="modalContent"
            class="modal-content"
            tabindex="0"
          >
            <div
              v-if="!hideHeader"
              class="modal-header"
            >
              <h4
                :id="`${randomString}Title`"
                class="modal-title"
              >
                <slot name="modal-header">
                  Modal title
                </slot>
              </h4>
              <button
                type="button"
                class="btn btn-close"
                @click="modalClose"
              >
                <i
                  class="icon icon-close"
                  aria-label="팝업 닫기"
                />
              </button>
            </div>
            <div
              :id="`${randomString}Desc`"
              class="modal-body"
            >
              <slot name="modal-body">
                Woo-hoo, you're reading this text in a modal!
              </slot>
            </div>
            <div
              v-if="!hideFooter"
              class="modal-footer"
            >
              <div class="btn-area">
                <slot
                  name="modal-footer"
                  :close="modalClose"
                  :ok="modalOk"
                >
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="modalClose"
                  >
                    <span>Close</span>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="modalOk"
                  >
                    <span>Save changes</span>
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal-dim"
        @click.stop="modalClose"
      />
    </Teleport>
  </div>
</template>

<style>
</style>
