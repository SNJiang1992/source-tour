import { isFile } from '@hehe/utils'
import { describe, expect, it } from 'vitest'

describe('test file', () => {
  it('test files', () => {
    expect(isFile('aaa')).toBe(false)
  })
})
