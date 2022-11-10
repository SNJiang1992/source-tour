const targetMap = new WeakMap() // Obj=>{}
let activeEffect
const effectStack: any[] = []

export function effect(fn: Function) {
  activeEffect = fn
  effectStack.push(activeEffect)
  fn()
  effectStack.pop()
  activeEffect = effectStack[effectStack.length - 1]
}

export function track(target, type, key) {
  if (!(targetMap.has(target)))
    targetMap.set(target, new Map())
  const currentKeyMap = targetMap.get(target)
  if (!(currentKeyMap.has(key)))
    currentKeyMap.set(key, new Set())
  const deps = currentKeyMap.get(key)
  if (activeEffect)
    deps.add(activeEffect)
}

export function trigger(target, type, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap)
    return
  const deps = depsMap.get(key)
  deps.forEach((dep) => {
    dep()
  })
}
