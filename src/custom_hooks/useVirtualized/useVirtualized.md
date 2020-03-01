# 长列表优化

## params

```ts
items: Array<any>; // 需要渲染的长列表
options: {
  itemHeight: number | ((index: number) => number), // 每项高度, 固定值或计算函数
  renderCount?: number // 渲染个数
};
```

## result

```ts
isScrolling: boolean; // 是否处于滚动状态
startIndex: number; // 开始渲染的下标
endIndex: number; // 结束渲染的下标
list: Array<T>; // 渲染的项目集合
containerProps: object; // 最外层 div 的属性
wrapperProps: object; // 第二层 div 的属性
```

## demo1

```js
import React from 'react';
import { useVirtualized } from './custom_hooks/index';

const items = Array.from(Array(100000)).map((_, index) => {
  return {
    id: index,
    other: `${index} list`
  };
});

function Demo1() {
  const { list, containerProps, wrapperProps } = useVirtualized(items, {
    itemHeight: 50
  });

  return (
    <div
      {...containerProps}
      style={{
        width: '300px',
        height: '400px',
        margin: '0 auto',
        overflow: 'auto',
        background: '#eee'
      }}
    >
      <div {...wrapperProps}>
        {list.map(item => (
          <div style={{ height: 50 }} key={item.id}>
            编号: {item.id}
          </div>
        ))}
      </div>
    </div>
  );
}
```
