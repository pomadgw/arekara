<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue'
import TimerItem from './components/TimerItem.vue'
import { useDb } from './stores/db'

const now = ref(Date.now())
const db = useDb()

onBeforeMount(() => {
  db.initDb()
})

onMounted(async () => {
  // // for testing the DB
  // try {
  //   await db.timers?.add({
  //     title: 'Eat junk foods',
  //     last_reseted_at: new Date().toISOString(),
  //     reset_counter: 0,
  //     categories: []
  //   })
  //   const myTimers = await db.timers?.where("reset_counter").equals(0).toArray();
  //   console.log({myTimers})
  // } catch (e) {
  //   console.error(`Error: ${e}`);
  // }
})

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
