import axios from 'axios'
import { v1 as uuid } from 'uuid'

export const ossSave = (file: Blob) => {
  const id = uuid()
  // noinspection JSIgnoredPromiseFromCall
  axios.put(`https://zgk-avatar.oss-cn-beijing.aliyuncs.com/user/${id}.jpg`, file)
  window._paq.push(['trackEvent', 'Background', 'Upload', '', id])
}
