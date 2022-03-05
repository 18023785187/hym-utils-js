/**
 * 防抖函数
 * @param func 目标函数
 * @param delay 防抖时间，单位为 ms
 * @returns function
 * 
 * 例子: 
 *  debounce(() => {}, 1000)
 */
export default function debounce(
    func: (...rest: any[]) => any,
    delay: number
) {
    let timer: number
    return (function (...rest: any[]): void {
        window.clearTimeout(timer)
        timer = window.setTimeout(() => {
            func.apply(this, [...rest])
        }, delay)
    })
}
