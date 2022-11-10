import { describe, expect, it } from 'vitest'
import { effect, ref } from '../src'

describe('effect', () => {
  it('should work', () => {
    const a = ref(0)
    let b
    effect(() => {
      b = a.value
    })
    expect(a.value).toBe(0)
    expect(b).toBe(0)
    a.value++
    expect(a.value).toBe(1)
    expect(b).toBe(1)
  })
})
