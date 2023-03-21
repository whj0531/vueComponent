<script setup lang="ts">
  import { ref } from 'vue'

  const menus = ref([
    { title: 'Accordion', href: '/accordion', isActive: false },
    { title: 'Tab', href: '/tab', isActive: false },
    { title: 'Modal', href: '/modal', isActive: false },
    { title: 'Form', href: '/form', isActive: false },
    { title: 'Tooltip', href: '/tooltip', isActive: false },
    { title: 'Toast', href: '/toast', isActive: false },
  ])

  function menusAction(index: number){
    menus.value.forEach((item, i) => {
      i === index ? item.isActive = true : item.isActive = false
    })
  }
</script>

<template>
  <header class="header">
    <h1 class="title">
      <button
        type="button"
        aria-label="Home으로 이동"
        @click="$router.push('./')"
      >
        Vue
      </button>
    </h1>
    <nav>
      <router-link
        v-for="(item, index) in menus"
        :key="index"
        :to="item.href"
        class="btn btn-nav"
        :class="{'is-active':item.isActive}"
        :aria-label="`${item.title} 페이지 이동`"
        @click="menusAction(index)"
      >
        {{ item.title }}
      </router-link>
    </nav>
  </header>
</template>

<style>
</style>