import { Ref, ref } from 'vue'

const counter: Ref<number> = ref(-1)

export function getCounterInstance(): Ref<number> {
  if (counter.value === -1) {
    counter.value = 0
    setInterval(() => {
      counter.value += 1
    }, 1000)
  }

  return counter
}
