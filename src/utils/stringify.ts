/**
 * 将数组或对象转化为字符串
 */
 const typings = {
    number: '[object Number]',
    string: '[object String]',
    boolean: '[object Boolean]',
    symbol: '[object Symbol]',
    bigInt: '[object BigInt]',
    null: '[object Null]',
    undefined: '[object Undefined]',
    object: '[object Object]',
    array: '[object Array]',
    regExp: '[object RegExp]',
    math: '[object Math]',
    map: '[object Map]',
    set: '[object Set]',
    function: '[object Function]',
    generator: '[object GeneratorFunction]',
    async: '[object AsyncFunction]',
    asyncGenerator: '[object AsyncGeneratorFunction]',
    arrayBuffer: '[object ArrayBuffer]'
}

const classReg = /^class/
const arrowReg = /=\>/
const funcReg = /^function/
const asyncFuncReg = /^async\s+function/
const asyncGeneratorReg = /^async\s+\*function/

/**
 * 深拷贝, 返回深拷贝的js代码字符串，利用eval返回拷贝结果
 * @param val 任意值
 * @returns string  --js代码字符串
 */
export default function stringify(val: any): string {
    return '(' + handler(val, getType(val)) + ')'
}

/**
 * 处理器
 * @param {any} val 
 * @param {string} type 
 * @returns {string}
 */
function handler(val: any, type: string): string {
    switch (type) {
        case typings.number:
            return createNum(val)
        case typings.string:
            return createStr(val)
        case typings.boolean:
            return createBool(val)
        case typings.null:
            return createNull()
        case typings.undefined:
            return createUndefined()
        case typings.bigInt:
            return createBigInt(val)
        case typings.symbol:
            return createSymbol(val)
        case typings.function:
            return createFunc(val)
        case typings.generator:
            return createGenerator(val)
        case typings.async:
            return createAsync(val)
        case typings.asyncGenerator:
            return createAsyncGenerator(val)
        case typings.object:
            return createObj(val)
        case typings.array:
            return createArr(val)
        case typings.map:
            return createMap(val)
        case typings.set:
            return createSet(val)
        case typings.regExp:
            return createRegExp(val)
        case typings.math:
            return createMath()
        case typings.arrayBuffer:
            return createBuffer(val)
        default:
            return ''
    }
}

/**
 * 创建函数
 */
function createNum(num: number): string {
    return num.toString()
}

function createStr(str: string): string {
    return `'${str}'`
}

function createBool(bool: boolean): string {
    return bool ? 'true' : 'false'
}

function createNull(): string {
    return 'null'
}

function createUndefined(): string {
    return 'undefined'
}

function createBigInt(bigInt: BigInt): string {
    return bigInt.toString() + 'n'
}

function createSymbol(symbol: Symbol): string {
    const description = symbol.description
    const isFor = Symbol.for(description ?? '') === symbol

    function isVoid(val: any) {
        return val === undefined || val === ''
    }
    return isFor ? `Symbol.for(${isVoid(description) ? '' : `'${description}'`})` : `Symbol(${isVoid(description) ? '' : `'${description}'`})`
}

function createFunc(func: Function): string {
    const funcStr = func.toString()

    if (funcReg.test(funcStr) || arrowReg.test(funcStr) || classReg.test(funcStr)) {
        return funcStr
    } else {
        return `function ${funcStr}`
    }
}

function createGenerator(generator: Generator): string {
    const generatorStr = generator.toString()

    return funcReg.test(generatorStr) ? generatorStr : `function ${generatorStr}`
}

function createAsync(asyncFunc: Function): string {
    const asyncFuncStr = asyncFunc.toString()

    if (asyncFuncReg.test(asyncFuncStr) || arrowReg.test(asyncFuncStr)) {
        return asyncFuncStr
    } else {
        return asyncFuncStr.replace('async ', 'async function ')
    }
}

function createAsyncGenerator(asyncGenerator: AsyncGenerator): string {
    const asyncGeneratorStr = asyncGenerator.toString()

    return asyncGeneratorReg.test(asyncGeneratorStr) ? asyncGeneratorStr : asyncGeneratorStr.replace('async *', 'async function*')
}

function createObj(obj: {}): string {
    let start = '{'
    let end = '}'
    let res = ''

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            res += `${key}: ${handler(obj[key], getType(obj[key]))},`
        }
    }
    const symbolList = Object.getOwnPropertySymbols(obj)
    for (const symbol of symbolList) {
        const symbolStr = createSymbol(symbol)
        res += `[${symbolStr}]: ${handler(obj[symbol], getType(obj[symbol]))},`
    }

    return start + res.slice(0, -1) + end
}

function createArr(arr: any[]): string {
    let start = '['
    let end = ']'
    let res = ''

    for (const item of arr) {
        res += handler(item, getType(item)) + ','
    }

    return start + res.slice(0, -1) + end
}

function createMap(map: Map<any, any>): string {
    let start = 'new Map(['
    let end = '])'
    let res = ''
    map.forEach((val, key) => {
        res += `[${handler(key, getType(key))}, ${handler(val, getType(val))}],`
    })

    return start + res.slice(0, -1) + end
}

function createSet(set: Set<any>): string {
    let start = 'new Set('
    let end = ')'

    return start + createArr([...set]) + end
}

function createRegExp(regExp: RegExp): string {
    return regExp.toString()
}

function createMath(): string {
    return 'Math'
}

function createBuffer(arrayBuffer: ArrayBuffer): string {
    return `new ArrayBuffer(${arrayBuffer.byteLength})`
}

/**
 * 封装Object.toString方法
 * @param {any} val 
 * @returns {string}
 */
function getType(val: any): string {
    return Object.prototype.toString.call(val)
}