import { defineStore } from 'pinia'
import { getDatabaseInstance } from '@/services/dexie'

export const useDb = defineStore('db', {
  state: () => ({
    db: getDatabaseInstance()
  }),
  getters: {
    timers: (state) => state.db.timers
  }
})
