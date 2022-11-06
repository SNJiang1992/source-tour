import { describe, expect, it } from 'vitest'
import { isFile } from '../src'

describe('all util works', () => {
  it('ifFile', () => {
    expect(isFile('aaa')).toBe(false)
    expect(isFile(111)).toBe(false)
    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
    })
    expect(isFile({})).toBe(false)
    expect(isFile(file)).toBe(true)
  })
})
