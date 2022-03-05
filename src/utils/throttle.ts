/**
 * 节流函数
 * @param func 目标函数
 * @param delay 节流时间，单位为 ms
 * @returns function
 * 
 * 例子: 
 *  throttle(() => {}, 1000)
 */

export default function throttle<T>(
    func: (...rest: any[]) => T,
    delay: number
) {
    let flag: boolean = true
    return (function (...rest: any[]): T | undefined {
        if (flag) {
            flag = false
            window.setTimeout(() => {
                flag = true
            }, delay)
            return func.apply(this, [...rest])
        } else {
            return undefined
        }
    })
}
