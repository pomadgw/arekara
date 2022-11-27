<script setup lang="ts">
import { ref } from 'vue'
import TimerItem from './components/TimerItem.vue'

const now = ref(Date.now())

setInterval(() => {
  now.value = Date.now()
}, 1000)
</script>

<template>
  <div :key="now">
    <timer-item timer-title="Eating junk food" />
    <timer-item color="red" timer-title="Sleeping" />
  </div>
</template>

<style scoped></style>
