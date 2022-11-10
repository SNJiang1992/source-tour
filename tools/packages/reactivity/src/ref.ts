import { track, trigger } from './effect'

export function ref(obj) {
  return new RefImpl(obj)
}

class RefImpl {
  _value: any
  isRef: boolean
  constructor(obj) {
    this.isRef = true
    this._value = obj
  }

  get value() {
    track(this, 'get', '_value')
    return this._value
  }

  set value(newValue) {
    if (newValue !== this._value)
      this._value = newValue
    trigger(this, 'set', '_value')
  }
}
