<script setup lang="ts">
import uuAccordion  from '@/components/Accordion.vue'
import uuAccordionItem  from '@/components/AccordionItem.vue'

</script>
<template>
  <section class="section">
    <h3>Accordion Default</h3>
    <!-- Accordion -->
    <uu-accordion>
      <uu-accordion-item active>
        <template #accordion-header>
          타이틀1
        </template>
        <template #accordion-body>
          내용1
        </template>
      </uu-accordion-item>
      <uu-accordion-item>
        <template #accordion-header>
          타이틀2
        </template>
        <template #accordion-body>
          내용2
        </template>
      </uu-accordion-item>
      <uu-accordion-item disabled>
        <template #accordion-header>
          타이틀3
        </template>
        <template #accordion-body>
          내용3
        </template>
      </uu-accordion-item>
    </uu-accordion>
    <!-- // Accordion -->
  </section>
  <section class="section">
    <h3>Accordion Nav</h3>
    <!-- Accordion -->
    <uu-accordion nav>
      <uu-accordion-item active>
        <template #accordion-header>
          타이틀1
        </template>
        <template #accordion-body>
          내용1
        </template>
      </uu-accordion-item>
      <uu-accordion-item>
        <template #accordion-header>
          타이틀2
        </template>
        <template #accordion-body>
          내용2
        </template>
      </uu-accordion-item>
      <uu-accordion-item>
        <template #accordion-header>
          타이틀3
        </template>
        <template #accordion-body>
          내용3
        </template>
      </uu-accordion-item>
    </uu-accordion>
    <!-- // Accordion -->
  </section>
  <section class="section">
    <h3>Accordion Only</h3>
    <!-- Accordion -->
    <uu-accordion only>
      <uu-accordion-item active>
        <template #accordion-header>
          타이틀1
        </template>
        <template #accordion-body>
          내용1
        </template>
      </uu-accordion-item>
      <uu-accordion-item>
        <template #accordion-header>
          타이틀2
        </template>
        <template #accordion-body>
          내용2
        </template>
      </uu-accordion-item>
      <uu-accordion-item>
        <template #accordion-header>
          타이틀3
        </template>
        <template #accordion-body>
          내용3
        </template>
      </uu-accordion-item>
    </uu-accordion>
    <!-- // Accordion -->
  </section>
</template>
<style>
</style>
