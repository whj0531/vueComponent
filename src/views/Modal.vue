<script setup lang="ts">
import { ref, provide } from 'vue'
import uuModal  from '@/components/Modal.vue'

const modal01 = ref(false)
const modal02 = ref(false)

// target
const modalTarget = ref<EventTarget[]>([])
function provideTarget(e: MouseEvent){
  e.target? modalTarget.value.push(e.target) : null
}
provide('modal-target', modalTarget.value)

</script>
<template>
  <section class="section">
    <h3>Modal</h3>
    <button
      type="button"
      class="btn btn-primary"
      @click="provideTarget($event), modal01 = !modal01"
    >
      <span>Modal Open!</span>
    </button>
    <uu-modal v-model="modal01">
      <template #modal-header>
        Modal Header
      </template>
      <template #modal-body>
        <button
          type="button"
          class="btn btn-primary"
          @click="provideTarget($event), modal02 = !modal02"
        >
          <span>Modal Open2!</span>
        </button>
      </template>
      <template #modal-footer="btnActions">
        <button
          type="button"
          class="btn btn-secondary"
          @click="btnActions.close"
        >
          취소
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="btnActions.ok"
        >
          확인
        </button>
      </template>
    </uu-modal>
    <uu-modal v-model="modal02">
      <template #modal-header>
        Modal Header
      </template>
      <template #modal-body>
        Modal Body
      </template>
      <template #modal-footer="btnActions">
        <button
          type="button"
          class="btn btn-secondary"
          @click="btnActions.close"
        >
          취소
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="btnActions.ok"
        >
          확인
        </button>
      </template>
    </uu-modal>
  </section>
</template>

<style>
</style>
