import Dexie, { Table } from 'dexie'
import { Timer } from '@/db'

export class ArekaraIndexedDB extends Dexie {
  // 'timers' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  timers!: Table<Timer>

  constructor() {
    super('ArekaraDB')
    this.version(1).stores({
      timers:
        '++id,title,reset_counter,last_reseted_at,color,*reset_history,*categories'
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

export async function getTimers(): Promise<Timer[]> {
  const db = getDatabaseInstance()

  return await db.timers.toArray()
}

export async function getTimer(key: number): Promise<Timer | undefined> {
  const db = getDatabaseInstance()

  return await db.timers.get(key)
}

export async function createTimer(data: Timer): Promise<Timer> {
  const index = await getDatabaseInstance().timers.add(data)

  const result = await getDatabaseInstance().timers.get(index)

  if (result == null) {
    throw new Error('The data was somehow not inserted!')
  }

  return result
}

export async function resetTimer(key: number): Promise<Timer | undefined> {
  const data = await getTimer(key)

  if (data != null) {
    const lastReseted = data.last_reseted_at
    data.reset_history.push(lastReseted)
    data.reset_counter += 1
    data.last_reseted_at = new Date().toISOString()

    const numbeOfUpdatedData = await getDatabaseInstance().timers.update(
      key,
      data
    )

    if (numbeOfUpdatedData === 0) {
      throw new Error(`Data with key ${key} is not updated`)
    }

    return data
  }
}
