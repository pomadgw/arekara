<template>
  <v-chip :color="color">{{ timeSinceTimerSet }}</v-chip>
</template>
<script setup lang="ts">
import { Timer } from '@/db'
import differenceInSeconds from 'date-fns/differenceInSeconds'
import { PropType, computed } from 'vue'

const props = defineProps({
  color: {
    type: String,
    default: 'blue'
  },
  timer: {
    type: Object as PropType<Timer>,
    require: true
  }
})

const padInTwoZeros = (s: string) => s.padStart(2, '0')

const time = computed(() => new Date(props.timer!.last_reseted_at))
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
