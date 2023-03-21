<script setup lang="ts">
  import { computed, inject, onMounted, reactive } from 'vue'
  import { getRandomId } from '@/utils/common'
  import type { AccordionInterface } from './Accordion.vue'

  const props = defineProps<{
    active?: boolean,
    disabled?: boolean,
  }>()
  const randomString = getRandomId()
  const parent = inject<AccordionInterface>('accordion', {
    count: 0,
    active: null,
    only: false,
    nav: false
  })
  const state = reactive({
    index: parent.count++,
    multiVisible: false,
    only: parent.only,
    nav: parent.nav
  })
  const visible = computed(() => {
    return state.index === parent.active
  })
  const activeStatus = computed(() => {
    if (state.only) {
      return visible.value // false
    } else {
      return state.multiVisible // true
    }
  })
  onMounted(() => {
    if (props.active) {
      parent.active = state.index
      if (!state.only) {
        state.multiVisible = true
      }
    }
  })

  const open = () => {
    if (state.only) {
      if (visible.value) {
        parent.active = null
      } else {
        parent.active = state.index
      }
    } else {
      state.multiVisible = !state.multiVisible
    }
  }
  const startTransition = (el: HTMLElement) => {
    el.style.height = el.scrollHeight + 'px'
  }
  const endTransition = (el: HTMLElement) => {
    el.style.height = ''
  }

</script>
<template>
  <div
    class="accordion-item"
    :class="activeStatus? 'is-active':''"
  >
    <div
      class="accordion-header"
      :class="state.nav? 'is-nav':''"
    >
      <template v-if="state.nav">
        <span class="accordion-title">
          <slot name="accordion-header">제목</slot>
        </span>
      </template>
      <button
        :id="randomString + 'acc'"
        class="accordion-btn"
        type="button"
        :disabled="disabled"
        :aria-expanded="activeStatus"
        :aria-controls="randomString + 'panel'"
        @click="open"
      >
        <span
          v-if="!state.nav"
          class="accordion-title"
        ><slot name="accordion-header">제목</slot></span>
        <span
          class="icon icon-arrow"
          :aria-label="activeStatus? '열림':'닫힘'"
        />
      </button>
    </div>
    <transition
      name="accordion-body"
      mode="out-in"
      @enter="startTransition"
      @after-enter="endTransition"
      @before-leave="startTransition"
      @after-leave="endTransition"
    >
      <div
        v-show="activeStatus"
        :id="randomString + 'panel'"
        class="accordion-body"
        role="region"
        :aria-labelledby="randomString + 'acc'"
      >
        <div class="accordion-content">
          <slot name="accordion-body" />
        </div>
      </div>
    </transition>
  </div>
</template>

<style>

</style>
