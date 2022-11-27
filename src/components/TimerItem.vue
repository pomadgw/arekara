<template>
  <v-card :elevation="1" class="mb-4">
    <template v-slot:title>
      <section class="tw-flex tw-justify-between tw-items-center">
        {{ timerTitle }}

        <v-chip :color="color">{{ timeSinceTimerSet }}</v-chip>
      </section>
    </template>
  </v-card>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import differenceInSeconds from 'date-fns/differenceInSeconds'

const props = defineProps({
  color: {
    type: String,
    default: 'blue'
  },
  timerTitle: {
    type: String,
    default: ''
  },
  isoTimerSince: {
    type: String,
    default: '2022-11-27T00:00:00Z'
  }
})

const padInTwoZeros = (s: string) => s.padStart(2, '0')

const time = computed(() => new Date(props.isoTimerSince))
const timeSinceTimerSet = computed(() => {
  const distance = differenceInSeconds(Date.now(), time.value)

  const seconds = distance % 60
  const minutes = Math.floor(distance / 60) % 60
  const hours = Math.floor(distance / 3600) % 60

  return `${padInTwoZeros(hours.toString())}:${padInTwoZeros(
    minutes.toString()
  )}:${padInTwoZeros(seconds.toString())}`
})
</script>
