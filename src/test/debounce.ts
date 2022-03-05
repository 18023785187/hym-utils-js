/**
 * 测试防抖函数
 */
import { debounce } from 'utils'

// 每次点击都会在300ms后触发事件，在防抖期间触发会重新计时
document.getElementById('btn')!.onclick = debounce(() => {
    console.log(this)
}, 300)

// 传参666并打印
debounce((log: number) => {
    console.log(log)
}, 300)(666)
