import { describe, expect, it, vi } from 'vitest'
import { effect, reactive } from '../src'

describe('effect', () => {
  it('effect works', () => {
    const original = { foo: 1 }
    const observed = reactive(original)
    let dummy
    effect(() => dummy = observed.foo)
    expect(dummy).toBe(1)
    observed.foo++
    expect(dummy).toBe(2)
  })
  it('reactive nested', () => {
    const o = { name: 'aaa', info: { age: 12 } }
    const p = reactive(o)
    let dummy
    effect(() => dummy = p.info.age)
    expect(dummy).toBe(12)
    p.info.age++
    expect(dummy).toBe(13)
  })
  it('effect nested', () => {
    const data = { foo: 1, bar: 2 }
    const obj = reactive(data)
    let tmp1, tmp2
    const fn1 = vi.fn(() => {})
    const fn2 = vi.fn(() => {})
    effect(() => {
      fn1()
      effect(() => {
        fn2()
        tmp2 = obj.bar
      })
      tmp1 = obj.foo
    })
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(1)
    expect(tmp1).toBe(1)
    expect(tmp2).toBe(2)
    obj.bar = 3
    expect(fn1).toBeCalledTimes(1)
    expect(fn2).toBeCalledTimes(2)
  })

  it('delete', () => {
    const original = { foo: 1 }
    const observed = reactive(original)
    let dummy
    effect(() => dummy = observed.foo)
    expect(dummy).toBe(1)
    delete observed.foo
    expect(dummy).toBeUndefined()
  })

  it('Set/Map类型', () => {
    const proxySet = reactive(new Set([1]))
    let size
    effect(() => size = proxySet.size)
    expect(size).toBe(1)
    proxySet.add(2)
    expect(size).toBe(2)
    proxySet.delete(1)
    expect(size).toBe(1)
  })
})
