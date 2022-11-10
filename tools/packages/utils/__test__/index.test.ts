import { describe, expect, it } from 'vitest'
import { getType, isFile, isObject } from '../src'

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
  it('isObject', () => {
    expect(isObject([])).toBe(true)
    expect(isObject('aaa')).toBe(false)
    expect(isObject(null)).toBe(false)
    expect(isObject(undefined)).toBe(false)
  })
  it('getType', () => {
    expect(getType([])).toBe('Array')
    expect(getType('aaa')).toBe('String')
    expect(getType(new Map())).toBe('Map')
    expect(getType(new Set())).toBe('Set')
  })
})
