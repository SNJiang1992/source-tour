import { getType, isObject } from '@hehe/utils'
import { track, trigger } from './effect'

const enum TargetType {
  INVALID = 0,
  COMMON = 1,
  COLLECTION = 2,
}

export const COL_KEY = Symbol('collection')

function TargetTypeMap(type: string) {
  switch (type) {
    case 'Object':
    case 'Array':
      return TargetType.COMMON
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return TargetType.COLLECTION
    default:
      return TargetType.INVALID
  }
}

const baseHandler = {
  get(target, key, receiver) {
    track(target, 'get', key)
    const result = Reflect.get(target, key, receiver)
    return isObject(result) ? reactive(result) : result
  },
  set(target, key, newValue, receiver) {
    const ret = Reflect.set(target, key, newValue, receiver)
    trigger(target, 'set', key)
    return ret
  },
  deleteProperty(target, key) {
    Reflect.deleteProperty(target, key)
    trigger(target, 'delete', key)
    return true
  },
}

const collectionActions = {
  add(key) {
    const target = this.__reactive_raw
    const ret = target.add(key)
    trigger(target, 'collection-add', COL_KEY)
    return ret
  },
  delete(key) {
    const target = this.__reactive_raw
    const ret = target.delete(key)
    trigger(target, 'collection-delete', COL_KEY)
    return ret
  },
  has() {},
}

const collectionHandler = {
  get(target, key) {
    if (key === '__reactive_raw')
      return target
    if (key === 'size') {
      track(target, 'collection-size', COL_KEY)
      return Reflect.get(target, key)
    }

    return collectionActions[key]
  },
  set() {},
}

export function reactive(original) {
  const type = TargetTypeMap(getType(original))
  let handler: any = baseHandler
  if (type === TargetType.COLLECTION)
    handler = collectionHandler

  return new Proxy(original, handler)
}
