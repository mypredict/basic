# 函数节流

## params

```ts
fn: Function; // 需要节流的函数
delay?: number; // 节流的时间间隔
```

## result

```ts
run: Function; // 持续调用的方法, 其会节流触发目标函数
clear: Function; // 立即取消触发函数
```

## demo

```js
import React from 'react';
import { useThrottle } from './custom_hooks/index';

function Demo() {
  const { run } = useDebounce((...args) => console.log(args), 1000);

  return <button onClick={() => run('触发')}>触发</button>;
}
```
