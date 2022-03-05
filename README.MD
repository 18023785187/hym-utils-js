# hym-utils-js
<a href="https://www.npmjs.com/package/hym-utils-js"><img src="https://img.shields.io/npm/v/hym-utils-js.svg" alt="Version"></a>
<a href="https://npmcharts.com/compare/hym-utils-js?minimal=true"><img src="https://img.shields.io/npm/dm/hym-utils-js.svg" alt="Downloads"></a>
<a href="https://github.com/18023785187/hym-utils-js/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/hym-utils-js.svg" alt="License"></a>
<a href="https://github.com/18023785187/hym-utils-js/search?l=javascript"><img src="https://img.shields.io/github/languages/top/18023785187/hym-utils-js.svg" alt="TopLang"></a>

### 🚀 实用的js工具库，为你的开发提供便捷。

# 安装

```
$ npm i hym-utils -S
```

# 引入

```typescript
// js
import * as hymUtils from 'hym-utils'

console.log(hymUtils.isMobile())

// 或者
import { isMobile } from 'hym-utils'

console.log(isMobile())
```

# 文档

#### formatDate 转化时间格式

将时间转换为自定义格式的字符串并返回。

```typescript
formatDate(date: Date, fmt: string): string

date: 时间格式
fmt: 格式字符串, "yyyy-MM-dd hh:mm:ss" y: 年；M：月；d：日；h：时；m：分；s：秒；
```

```typescript
formatDate(new Date(), "yyyy-MM-dd hh:mm:ss") // 2022-3-5 00:00:00
```

#### throttle 节流

节流函数。

```typescript
throttle<T>(
    func: (...rest: any[]) => T,
    delay: number
): (...rest: any[]) => T | undefined

func: 目标函数
delay: 节流时间, 单位ms
```

```typescript
throttle(() => {}, 1000)
```

#### debounce 防抖

防抖函数。

```typescript
debounce(
    func: (...rest: any[]) => any,
    delay: number
): (...rest: any[]) => void

func: 目标函数
delay: 防抖时间, 单位ms
```

```typescript
debounce(() => {}, 1000)
```

#### stringify 多类型深拷贝

多类型深拷贝，返回js代码字符串，需要配合eval使用。

```typescript
stringify(val: any): string

val: 任意值
```

```typescript
const jsCode = stringify([new Map(), {} , Symbol()])
const deepCloneRes = eval(jsCode)
```

#### isMobile 检测移动端

检测当前环境是否为移动端。

```typescript
isMobile(): boolean
```

```typescript
isMobile() // 如果是移动端, 返回true; pc端返回false
```
