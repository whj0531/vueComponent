<script setup lang="ts">
  import { reactive, nextTick } from 'vue'
  import { getRandomId } from '@/utils/common'

  interface tooltipInterface {
    active: boolean,
    target?: HTMLButtonElement,
    content?: HTMLDivElement,
    left: number | string,
    right: number | string,
    top: number | string,
    vertical: string,
    horizontal: string,
  }
  const props = defineProps<{
    hideClose?: boolean,
    title?: string,
    content?: string,
    position?: string
  }>()
  const randomString = getRandomId()
  

  const state = reactive<tooltipInterface>({
    active: false,
    target: undefined,
    content: undefined,
    left: 0,
    right: 'auto',
    top: 0,
    horizontal: 'left',
    vertical: 'bottom'
  })

  function tooltipOpen(e: Event){
    state.active = true
    nextTick(() => {
      state.target = e.target as HTMLButtonElement
      state.content = state.target.nextElementSibling as HTMLDivElement
      positions()
    })
  }
  function tooltipClose(){
    state.active = false
    state.target !== undefined ? state.target.focus() : null
  }
  function positions(){
    const target = state.target as HTMLButtonElement
    const content = state.content as HTMLDivElement

    const pos = {
      windowSize: window.innerWidth,
      left: target.offsetLeft,
      right: target.getBoundingClientRect().right,
      center: target.clientWidth * 0.5,
      top: target.offsetTop + target.clientHeight + 15,
    }
    
    const posLeft = () => {
      state.horizontal = 'left'
      state.left = `${pos.left + pos.center - 30}px`
      state.right = 'auto'
    }
    const posRight = () => {
      state.horizontal = 'right'
      state.right = `${pos.windowSize - pos.right + pos.center - 30}px`
      state.left = 'auto'
    }
    const posCenter = () => {
      state.horizontal = 'center'
      state.left = `${pos.left - (content.clientWidth * 0.5) + pos.center}px`
      state.right = 'auto'
    }
    const posTop = () => {
      state.vertical = 'top'
      state.top = `${target.offsetTop - content.clientHeight - 15}px`
    }
    const posBottom = () => {
      state.vertical = 'bottom'
      state.top = `${pos.top}px`
    }

    // 가로
    if (pos.left < pos.windowSize * 0.33){
      posLeft()
    }else if (pos.left > pos.windowSize * 0.66){
      posRight()
    }else {
      posCenter()
    }

    // 세로
    if (content.clientHeight + pos.top > window.innerHeight){
      posTop()
    }else {
      posBottom()
    }

    if (props.position === 'left'){
      posLeft()
    }else if (props.position === 'right'){
      posRight()
    }else if (props.position === 'center'){
      posCenter()
    }else if (props.position === 'top'){
      posTop()
    }else if (props.position === 'bottom'){
      posBottom()
    }
  }
  
</script>

<template>
  <button
    type="button"
    class="btn"
    :aria-describedby="`${randomString}Tooltip`"
    @click="tooltipOpen($event)"
  >
    <slot name="target">
      <span class="btn btn-tooltip">?</span>
    </slot>
  </button>
  <transition name="tooltip">
    <div
      v-if="state.active"
      :id="`${randomString}Tooltip`"
      ref="tooltipContent"
      class="tooltip"
      :class="[`tooltip-${state.vertical}`, `tooltip-${state.horizontal}`]"
      :style="`left: ${state.left}; right: ${state.right}; top: ${state.top};`"
      role="tooltip"
      :aria-hidden="!state.active"
    >
      <div
        class="tooltip-content"
        tabindex="0"
      >
        <button
          v-if="!props.hideClose"
          type="button"
          class="btn btn-tooltip-close"
          aria-label="close"
          @click="tooltipClose"
        >
          <span class="icon icon-close" />
        </button>
        <slot name="title">
          <strong>{{ props.title }}</strong>
        </slot>
        <slot>
          <p>{{ props.content }}</p>
        </slot>
      </div>
    </div>
  </transition>
  <div
    v-if="state.active"
    class="tooltip-dim"
    @click.stop="tooltipClose"
  />
</template>

<style>

</style>
