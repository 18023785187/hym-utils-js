/**
 * 打印当前时间
 */
import {
    formatDate
} from 'utils'

// 打印风格1的时间
const currentTime1 = formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")
console.log(currentTime1)
// 打印风格2的时间
const currentTime2 = formatDate(new Date(), "yyyy/MM/dd hh:mm:ss")
console.log(currentTime2)
// 打印只有年月日的时间
const currentTime3 = formatDate(new Date(), "yyyy/MM/dd")
console.log(currentTime3)
