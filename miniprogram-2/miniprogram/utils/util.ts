export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}
let apiUrl = '';
if (wx.getSystemInfoSync().platform === 'devtools') {
  // 开发环境
  apiUrl = 'http://49.232.152.51/translateImg';
} else {
  // 生产环境
  apiUrl = 'http://49.232.152.51';
}
export  {apiUrl}