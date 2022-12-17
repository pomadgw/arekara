<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TimerItem from './components/TimerItem.vue'
import { useDb } from './stores/db'
import { Timer } from './db'

const now = ref(Date.now())
const db = useDb()
const drawer = ref(false)
const showAddDialog = ref(false)

const newTitle = ref('')
const timers = ref<Timer[]>([])

function deleteDatabase() {
  const req = indexedDB.deleteDatabase('ArekaraDB')

  return new Promise((resolve, reject) => {
    req.onsuccess = (ev) => resolve(ev)
    req.onerror = (ev) => reject(ev)
  })
}

onMounted(async () => {
  // for testing the DB
  if (new URLSearchParams(window.location.search).get('resetdb') === 'true') {
    await deleteDatabase()
  }

  try {
    await loadTimers()
  } catch (e) {
    console.error(`Error: ${e}`)
  }
})

const loadTimers = async () => {
  const myTimers = await db.timers.toArray()
  timers.value = myTimers
}

const openCreateNewTimerDialog = () => {
  newTitle.value = ''
  showAddDialog.value = true
}

const saveNewTimer = async () => {
  try {
    await db.timers.add({
      title: newTitle.value,
      last_reseted_at: new Date().toISOString(),
      reset_counter: 0,
      categories: [],
      reset_history: [],
      color: 'blue'
    })
    await loadTimers()
  } catch (e) {
    console.error(`Error: ${e}`)
  } finally {
    showAddDialog.value = false
  }
}
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

    <!-- <v-navigation-drawer v-model="drawer">a</v-navigation-drawer> -->
    <v-main>
      <v-container>
        <div :key="now">
          <timer-item v-for="timer in timers" :key="timer.id" :timer="timer" />
        </div>

        <v-dialog
          v-model="showAddDialog"
          fullscreen
          :scrim="false"
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              icon="mdi-plus"
              color="primary"
              style="position: fixed; bottom: 36px; right: 36px"
              v-bind="props"
              @click="openCreateNewTimerDialog"
            ></v-btn>
          </template>

          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="showAddDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Add new timer</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn variant="text" @click="saveNewTimer"> Start </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <!-- <v-list
          lines="two"
          subheader
        >
          <v-list-subheader>User Controls</v-list-subheader>
          <v-list-item title="Content filtering" subtitle="Set the content filtering level to restrict apps that can be downloaded"></v-list-item>
          <v-list-item title="Password" subtitle="Require password for purchase or use password to restrict purchase"></v-list-item>
        </v-list>
        <v-divider></v-divider> -->
            <v-list subheader>
              <!-- <v-list-subheader>General</v-list-subheader> -->
              <v-list-item>
                <v-text-field v-model="newTitle" label="Title"></v-text-field>
              </v-list-item>
            </v-list>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
