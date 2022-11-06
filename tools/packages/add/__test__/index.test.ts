import { describe, expect, it } from 'vitest'
import { add } from '../src'

describe('test main program', () => {
  it('add number', () => {
    expect(add(1, 2)).toBe(3)
  })
})

