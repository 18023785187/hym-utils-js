/**
 * 为按钮绑定节流函数
 */
import { throttle } from 'utils'

/**
 * 测试节流和this指向, 返回undefined是正确的，箭头函数无法绑定this指向
 */
document.getElementById('btn')!.onclick = throttle(() => {
    console.log(this)
}, 2000)

/**
 * 测试返回值, 顺序：666 undefined 888 undefined, 
 * 因为节流期间触发返回的是undefined
 */
const func = throttle((log: number) => log, 1000)
console.log(func(666))
console.log(func(777))
setTimeout(() => {
    console.log(func(888))
    console.log(func(999))
}, 1000)

/**
 * 返回结果为obj，和预期一致
 */
const obj: any = {
    tag: 'tag'
}
const objFunc = (function () { console.log(this) }).bind(obj)
throttle(objFunc, 1000)()
