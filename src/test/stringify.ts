/**
 * 测试stringify
 */
import { stringify } from 'utils'

const target: any = [
    {      
        a: function () {},
        b() {},
        c: () => {},
        d: function *(){},
        e: async () => {},
        f: async function *(){},
        [Symbol('tag')]: new ArrayBuffer(6),
        math: Math
    },
    new Map(),
    new Set(),
    1,
    2n,
    NaN,
    'null',
    null,
    undefined,
    class Test {
        message: string
        constructor() {
            this.message = 'hi'
        }
        getMessage() {
            console.log(this.message)
        } 
    },
]

const deepCloneJs = stringify(target)
const deepClone = eval(deepCloneJs)
console.log(deepCloneJs, deepClone)
