import { defineStore } from 'pinia'
import Dexie, { Table } from 'dexie'

export interface Timer {
  id?: number
  title: string
  reset_counter: number
  last_reseted_at: string
  categories: string[]
}

export class Timers extends Dexie {
  // 'timers' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  timers!: Table<Timer>

  constructor() {
    super('ArekaraDB')
    this.version(1).stores({
      timers: '++id,title,reset_counter,last_reseted_at,*categories'
    })
  }
}

export const useDb = defineStore('db', {
  state: () => ({
    db: null as Timers | null
  }),
  getters: {
    timers: (state) => state.db?.timers
  },
  actions: {
    initDb() {
      if (this.db == null) {
        this.db = new Timers()
      }
    }
  }
})
