import { includes, padStart } from 'lodash'

const baseDir = '//zgk-avatar.oss-cn-beijing.aliyuncs.com/images'

export const getBackgrounds = (): string[] => {
  const images: string[] = []
  const pngs = ['02-new', '14-new']

  for (let i = 1; i <= 33; i++) {
    const imageNumber = padStart(i.toString(), 2, '0')
    const imageName = `${imageNumber}-new`
    const imageExt = includes(pngs, imageName) ? 'png' : 'jpg'
    const image = `${baseDir}/bg/${imageName}.${imageExt}`
    images.push(image)
  }

  return images
}

export const getDefaultBackground = (): string => {
  return `${baseDir}/bg/default.jpg`
}

export const getForegrounds = (): [string, string][] => {
  const images: [string, string][] = []
  const imageGaokao: [string, string] = [`${baseDir}/fg/gaokao.png`, '高考加油']
  const imageZhongkao: [string, string] = [`${baseDir}/fg/zhongkao.png`, '中考加油']

  const timeNow = new Date()
  const timeGaokao = new Date()
  timeGaokao.setMonth(5, 10)
  timeGaokao.setHours(17)
  if (timeNow > timeGaokao) {
    // Is after Gaokao
    images.push(imageZhongkao, imageGaokao)
  } else {
    // Is before Gaokao
    images.push(imageGaokao, imageZhongkao)
  }

  return images
}

export const getDefaultForeground = (): [string, string] => {
  return getForegrounds()[0]
}
