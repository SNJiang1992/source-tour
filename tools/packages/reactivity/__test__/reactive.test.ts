import { describe, expect, it } from 'vitest'
import { reactive } from '../src'

describe('reactive', () => {
  it('reactive works', () => {
    const original = { foo: 1 }
    const observed = reactive(original)
    expect(observed).not.toBe(original)
  })
  it('why reflect', () => {
    const o = {
      _name: 'xxx',
      get name() {
        return this._name
      },
    }
    const r = reactive(o)
    const t: any = {
      __proto__: r,
      _name: 'yyy',
    }
    // proxy不加receiver不行 receiver可以正确的指向this
    expect(t.name).toBe('yyy')
  })
})
