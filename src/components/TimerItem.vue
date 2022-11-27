<template>
  <section class="flex justify-between items-center px-4 py-2 border-b">
    <div :class="colorClass" class="text-gray-200 px-2 py-1 rounded">
      {{ timeSinceTimerSet }}
    </div>
    <div>{{ timerTitle }}</div>
  </section>
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

// To support Tailwind JIT, we need to explictly
// declare the classes so that when it reads this
// file, it knows that we need these classes.
const colorClass = computed(() => {
  switch (props.color) {
    case 'blue':
      return 'bg-blue-400'
    case 'red':
      return 'bg-red-400'
    default:
      return 'bg-blue-400'
  }
})
</script>
