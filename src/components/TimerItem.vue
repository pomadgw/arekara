<template>
  <v-card :elevation="1" class="mb-4">
    <template v-slot:title>
      <section class="tw-flex tw-justify-between tw-items-center">
        {{ timer?.title }}

        <timer-chip :color="color" :timer="timer" :key="counter" />
      </section>
    </template>
  </v-card>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { Timer } from '@/db'
import { getCounterInstance } from '@/services/global-counter'
import TimerChip from './TimerChip.vue'

defineProps({
  color: {
    type: String,
    default: 'blue'
  },
  timer: {
    type: Object as PropType<Timer>,
    require: true
  }
})

const counter = getCounterInstance()
</script>
