# 对话框

## demo

```js
import React, { useState } from 'react';

function demo() {
  const [visible, setVisible] = useState(false);

  function handleConfirm() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        setVisible(false);
      }, 2000);
    });
  }

  return (
    <div>
      <button onClick={() => setVisble(true)}>弹出</button>
      <Dialog
        outsideClickCancel={true}
        visible={visible}
        confirmBtnLoading={true}
        onCancel={() => setVisible(false)}
        onConfirm={handleConfirm}
      >
        <p>123</p>
      </Dialog>
    </div>
  );
}
```

## params

```ts
visible: boolean; // 是否显示
title: string; // title
cancelIcon?: boolean; // 右上角取消图标
cancelBtn?: boolean; // 取消按钮
confirmBtn?: boolean; // 确定按钮
cancelBtnText?: string; // 取消文字
confirmBtnText?: string; // 确定文字
confirmBtnLoading?: boolean; // 确定时是否 loading
outsideClickCancel?: boolean; // 点击对话框外是否取消
disabledConfirmBtn?: boolean; // 是否禁止掉确定按钮
onCancel: () => void; // 取消回调
onConfirm: () => void; // 确定回调
children?: Object; // 内容
```
