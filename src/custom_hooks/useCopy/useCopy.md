# 复制内容到剪切板

## params

```ts
params?: Array<[string | number | RegExp, string | number]>; // 复制时进行替换的规则
```

## result

```ts
handleCopy: (data: string | number) => string; // 用于复制的函数
```

## demo

```js
import React from 'react';
import { useCopy } from './custom_hooks/index';

function Demo() {
  const copy = useCopy();

  return <button onClick={() => copy('被复制内容')}>复制</button>;
}
```
