import { isFile } from '@hehe/utils'

export class AudioPlayer {
  private file: File
  constructor(file) {
    if (!isFile(file)) {
      console.error('需要文件类型')
      return
    }
    this.file = file
  }
}

