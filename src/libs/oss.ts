import axios from 'axios'
import { DateTime } from 'luxon'
import { v1 as uuid } from 'uuid'

export const ossSave = (file: Blob) => {
  const id = uuid()
  const now = DateTime.now().setZone('UTC+8')
  const date = now.toFormat('yyyy-MM-dd')
  // noinspection JSIgnoredPromiseFromCall
  axios.put(`https://zgk-avatar.oss-cn-beijing.aliyuncs.com/user/${date}/${id}.jpg`, file)
  window._paq.push(['trackEvent', 'Background', 'Upload', id])
}
