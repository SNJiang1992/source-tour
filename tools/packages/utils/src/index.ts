export function isFile(obj: any) {
  return typeof obj === 'object' && (obj instanceof File)
}

export function isObject(target: any) {
  return typeof target === 'object' && target !== null
}

export function getType(target: any) {
  return Object.prototype.toString.call(target).slice(8, -1)
}
