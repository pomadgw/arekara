import Dexie, { Table } from 'dexie'
import { Timer } from '@/db'

export class ArekaraIndexedDB extends Dexie {
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

let db: ArekaraIndexedDB | undefined

export function getDatabaseInstance(): ArekaraIndexedDB {
  if (db == null) {
    db = new ArekaraIndexedDB()
  }

  return db
}
