/**
 * 将时间转换为自定义格式的字符串并返回
 * @param date Date
 * @param fmt "yyyy-MM-dd hh:mm:ss" y: 年；M：月；d：日；h：时；m：分；s：秒；
 * @returns string
 * 
 * 例子: 
 *  formatDate(new Date(), "yyyy-MM-dd hh:mm:ss") // 2022-3-5 00:00:00
 */
export default function formatDate(date: Date, fmt: string): string {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}

function padLeftZero(str: string) {
    return ("00" + str).substr(str.length)
}
