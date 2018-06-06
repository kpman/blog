---
title: 將 JS Callback 轉成 Promise
date: 2016-12-16 07:57:57
tags:
- promise
- js
---

隨著越來越多 JS 開發者的提倡，越來越多人擁抱 ES6(+) 的語法，其所帶來的好處讓許多開發者願意接受。

然而一些新接觸的開發者，在流程控制上會聽聞 Promise 的好處進而開始使用，但較早期的套件會遵循著 node.js style 的 Callback；因此本篇文章將會介紹如何將這類 Callback 利用套件轉成 Promise。

![](http://i.imgur.com/Xhzct6v.png)

<!-- more -->

## Node.js Style Callback

在 JS 的流程處理上，有許多人一定會遇見 Callback function，而 node.js 有獨特的規範，遵循著這類規範會讓更多開發者受益，這類的 Callback 被稱為 `Error-First Callbacks`。

- 非同步的 Callback function 第一個參數是錯誤物件，有錯誤就會回傳錯誤訊息，沒有錯誤則第一個值會是 null。剩下的參數為 Callback function 正常情況下會回傳的值。

```
fs.readFile('/etc/passwd', (err, data) => {
  if (err) throw err; // 此處為 Node.js Style Callback
  console.log(data);
});
```

## thenify 套件使用

#### 使用情境

將會是把第三方套件 Node.js Style Callback 轉成 Promise，接著就可以 `.then()` 或者是利用 `async` `await` 去處理流程了。值得一提此套件利用的是 `any-promise`，理論上你可以隨時的設置你想要的 Promise 實作。

#### 使用方法

因為 README 上面寫的蠻不清楚，以下列出幾種狀況，也推薦看套件的測試檔案[範例](https://github.com/thenables/thenify/blob/master/test/test.js)：

範例一：非同步 function 直接接收 cb

```javascript
function fn(cb) {
  // 處理複雜流程
  cb(null, true);
}

const p = thenify(fn); // p is a promise now.

p().then(val => console.log(val)); // true
```

範例二：非同步 function 直接接收 cb，該 cb 回傳多個參數

```javascript
function fn(cb) {
  // 處理複雜流程
  cb(null, 1, 2, 3); // 除了第一個 error msg 外，回傳多個值
}

const p = thenify(fn); // p is a promise now.

p().then(val => console.log(val)); // [1, 2, 3]，會轉成 array
```

範例三：非同步 function 直接接收多個參數及 cb，該 cb 亦接受多個參數

**此範例為最常被使用功能，關鍵點為 cb 位在 fn 的最後一個參數，且此 cb 遵循著上述提到的 Node.js Style Callback。**

```javascript
function fn(a, b, c, cb) {
  // 處理複雜流程
  cb(null, a, b); // 最後回傳 error msg(null) 和 a, b
}

const p = thenify(fn); // p is a promise now.

p(1, 2, 3).then(values => console.log(values)); // [1, 2]，callback 回傳的值，一樣會包成 array
```

## 結論

隨著 node 核心原生支援的語法越來越多，選擇利用 babel 搭配就可以在此時享受到 Promise 甚至是 async, await 語法帶來的好處，然而較早期的套件甚至不預設回傳 Promise，此時便需要一些工具的幫助。

希望這篇文章能幫助到那些一接觸學習 JS 流程控制就享受到 Promise 好處，但實務上卻不太理解如何處理原生或第三方套件這類 Callback function 的開發者。

## reference

- [thenify package](https://www.npmjs.com/package/thenify)
- [Node.js error-first callback](http://eddychang.me/blog/javascript/57-node-js-error-first-callback.html)
- [如何把 Callback 接口包装成 Promise 接口](http://welefen.com/post/how-to-convert-callback-to-promise.html)
