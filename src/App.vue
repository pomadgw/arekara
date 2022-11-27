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
const drawer = ref(false)
</script>

<template>
  <v-app>
    <v-app-bar :elevation="3">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Arekara</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">a</v-navigation-drawer>
    <v-main>
      <v-container>
        <div :key="now">
          <timer-item timer-title="Eating junk food" />
          <timer-item color="red" timer-title="Sleeping" />
        </div>

        <v-btn
          icon="mdi-plus"
          color="primary"
          style="position: fixed; bottom: 36px; right: 36px"
        ></v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
