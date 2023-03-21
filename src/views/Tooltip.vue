<script setup lang="ts">
import uuTooltip  from '@/components/Tooltip.vue'
</script>
<template>
  <section class="section">
    <h3>Tooltip</h3>
    <div>
      <uu-tooltip>
        <p>Tooltip Text...</p>
      </uu-tooltip>
    </div>
    <br>
    <div>
      <uu-tooltip>
        <template #target>
          텍스트 툴팁
        </template>
        <p>Tooltip Text...</p>
      </uu-tooltip>
    </div>
    <br>
    <div>
      강제로오른쪽 강제로오른쪽
      <uu-tooltip position="right">
        <template #title>
          타이틀
        </template>
        <div>
          Tooltip 내용 <br>
          Tooltip 내용 <br>
          Tooltip 내용 <br>
          Tooltip 내용 <br>
          Tooltip 내용 <br>
          Tooltip 내용 <br>
          Tooltip 내용 <br>
        </div>
      </uu-tooltip>
    </div>
    <br>
    <div>
      중간중간중간중간중간중간중간중간
      <uu-tooltip
        title="타이틀"
        content="Tooltip 내용 Tooltip 내용 Tooltip 내용 Tooltip 내용Tooltip 내용 Tooltip 내용 Tooltip 내용 Tooltip 내용Tooltip 내용 Tooltip 내용 Tooltip 내용 Tooltip 내용Tooltip 내용 Tooltip 내용 Tooltip 내용 Tooltip 내용Tooltip 내용 Tooltip 내용 Tooltip 내용 Tooltip 내용Tooltip 내용 Tooltip 내용 Tooltip 내용 Tooltip 내용Tooltip 내용 Tooltip 내용 Tooltip 내용 Tooltip 내용"
      />
    </div>
    <div>
      오른쪽오른쪽오른쪽오른쪽오른쪽오른쪽오른쪽오른쪽
      <uu-tooltip
        title="타이틀"
        content="Tooltip 내용 Tooltip 내용 Tooltip 내용 Tooltip 내용"
      />
    </div>
  </section>
</template>

<style>
</style>
