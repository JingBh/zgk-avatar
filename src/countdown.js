import { DateTime } from 'luxon'

const gaokaoTime = DateTime.fromISO('2022-06-07T08:00:00+08:00')

const daysElement = document.getElementById('days')

let interval

function updateCountdown () {
  const days = Math.ceil(gaokaoTime.diffNow('days').days)
  daysElement.innerText = days.toString()
}

export default function () {
  if (interval) window.clearInterval(interval)
  interval = window.setInterval(updateCountdown, 1000)
  updateCountdown()
}
