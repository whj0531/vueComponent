<script setup lang="ts">
  import { reactive, provide, onBeforeMount, onMounted, useSlots } from 'vue'
  import { getRandomId } from '@/utils/common'

  export interface TabInterface {
    id: string,
    array: Array<VNodeTypeInterface>,
    count: number,
    selected: number,
    active: boolean[]
  }
  export interface VNodeTypeInterface {
    type: {
      name: string
    }
  }
  const props = defineProps<{
    tabs: Array<String>
  }>()
  const slots = useSlots()
  const randomString = getRandomId()
  const state = reactive<TabInterface>({
    id: randomString,
    array: [],
    count: 0,
    selected: 0,
    active: []
  })

  provide('tabs-array', state)

  onBeforeMount(() => {
    if (slots.default) {
      Array.from(slots.default()).filter((item) => {
        state.active.push(item.props !== null)
      })
      state.array = Array.from(slots.default() as Array<VNodeTypeInterface>).filter((child) => child.type.name === 'Tab')
      return state.array
    }
  })
  onMounted(() => {
    state.active.forEach((item, index) => {
      item? selectedTab(index) : null
    })
  })

  function selectedTab(i: number){
    state.selected = i
  }

  function keyRight(e: KeyboardEvent){
    const target = e.currentTarget as HTMLButtonElement
    const nextEl = target.nextElementSibling as HTMLButtonElement
    if (nextEl !== null){
      nextEl.focus()
      nextEl.click()
    }
  }
  function keyLeft(e: KeyboardEvent){
    const target = e.currentTarget as HTMLButtonElement
    const prevEl = target.previousElementSibling as HTMLButtonElement
    if (prevEl !== null){
      prevEl.focus()
      prevEl.click()
    }
  }
</script>

<template>
  <div class="tab">
    <!-- Tab links -->
    <div
      class="tab-link"
      role="tablist"
    >
      <button
        v-for="(item, index) in props.tabs"
        :id="`${randomString+index}tabs`"
        :key="index"
        type="button"
        class="tab-link-btn"
        :class="state.selected === index? 'is-active':''"
        role="tab"
        :aria-controls="`${randomString+index}tab`"
        :aria-selected="state.selected === index"
        :tabindex="state.selected === index? '0':'-1'"
        @click="selectedTab(index)"
        @keyup.right="keyRight($event)"
        @keyup.left="keyLeft($event)"
      >
        {{ item }}
      </button>
    </div>
    <!-- Tab content -->
    <div class="tab-content">
      <slot />
    </div>
  </div>
</template>

<style>

</style>
