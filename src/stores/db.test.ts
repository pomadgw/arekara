import 'fake-indexeddb/auto'

import { beforeEach, describe, expect, it } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import * as exports from './db'

describe('database', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  describe('> actions', () => {
    it('should initialize the database', () => {
      const db = exports.useDb()
      db.initDb()

      expect(db.timers).not.toBeUndefined()
      expect(Object.keys(db.timers?.schema.idxByName ?? {})).toEqual([
        'title',
        'reset_counter',
        'last_reseted_at',
        'categories'
      ])
    })
  })
})
