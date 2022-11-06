export function isFile(obj: any) {
  return typeof obj === 'object' && (obj instanceof File)
}
