export interface Timer {
  id?: number
  title: string
  color: string
  reset_counter: number
  last_reseted_at: string
  categories: string[]
  reset_history: string[]
}
