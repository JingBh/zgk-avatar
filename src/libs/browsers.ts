import { includes } from 'lodash'

export const isWechat = (): boolean => {
  const ua = (navigator?.userAgent || '').toLowerCase()
  return includes(ua, 'micromessenger')
}
