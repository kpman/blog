---
title: JavaScript 變數宣告
date: 2016-09-17 15:41:31
tags:
- js
---

JS 宣告變數的方式在 ES6 之後增加了 `let` 和 `const`，這篇文章將會談談 `var`、`let` 和 `const`之間的差異。

![](https://i.imgur.com/Jgd8jj5.jpg)

<!-- more -->

## 變數宣告的過程

![](https://i.imgur.com/ya351ON.png)

如圖所見，JS 內變數的宣告總共會經歷三個階段

- Declaration: 在相對應的作用域範圍內註冊變數名字
- Initialization: 分配記憶體使用
- Assignment: 賦予該變數的值

## var

```js
var x; // Declaration, Initialization
x = 'Hello World'; // Assignment

// all in one line
var y = 'Hello World';
```

`var` 廣泛被使用，直到 ES6 推出後才有了其他的替代方式，而如果 var 被宣告在函數內，則沒有辦法在函數外部取得該變數。

```js
function someFunc() {
  var innerVar = 'hi';
  return innerVar;
}
console.log(innerVar); // ReferenceError: innerVar is not defined
```

## let

在 ES6 後，出現了 `let` 的方式宣告變數，它和 `var` 有共同的作用，便是在函數中封閉，額外的效果是在 block statement 內也是封閉，作用域變得更小範圍，可以減少錯誤的發生。

```js
let x; // Declaration, Initialization
x = 'Hello World'; // Assignment

// all in one line
let y = 'Hello World';
```

```js
if (true) {
  let innerLet = 'hi';
} else {
  // do nothing
}

console.log(innerLet); // ReferenceError: innerLet is not defined
```

上述例子代表 innerLet 只能在 block statement 內存活，跳出這個 block statement 就無法取得，我們將 let 換成 var 看看：

```js
if (true) {
  var innerLet = 'hi';
} else {
  // do nothing
}

console.log(innerLet); // hi
```

由上述可以清楚看到將 `let` 宣告的方式改成 `var` 則可以在 block statement 之外取得該變數，這就是 `let` 相對於 `var` 作用域更小的關係。

## const

`const` 顧名思義就是 constant 的縮寫，ES6 新的語法，代表說只要當宣告過後，該賦予的值就不能被更動，更嚴格來說，是該變數指向的記憶體位址不能被更動。因此，當利用 const 宣告了 `Array` 或是 `Object`，只要不重新賦予值，而是更動 array 或 object 內部狀況，是可以被接受的操作方式，參考以下例子：

```js
const PI = 3.14159;
PI = 3.1415926; // TypeError: Assignment to constant variable.

const arr = [];
arr.push(PI); // [ 3.14159 ];

const obj = {};
obj.pi = PI; // { pi: 3.14159 };

arr = new Array(); // TypeError: Assignment to constant variable.
obj = new Object(); // TypeError: Assignment to constant variable.
```

## Hoisting

在利用 `var`, `let`, `const` 宣告變數的時候，變數都會自動的做 `Hoisting`，也就是被抬升到該作用域的最高處，但是抬升過後，`var` 會對於變數賦予值 `undefined`，而 `let`, `const`一樣也會被抬升，但是沒有初始值，因此會有 ReferenceError 發生。

```js
console.log(hello); // undefined
var hello;
hello = "I'm a variable";

console.log(world); // ReferenceError: world is not defined
let world;
world = "I'm a variable";
```

## 結論

在 ES6 推出後，應該盡可能的利用 `let` 和 `const` 去宣告變數，因為它們的限制更高，會減少出錯的機會。若有使用 ESLint，甚至有條件限制使用 `var`。若是情況一定需要使用 `var`，也應該在作用域的最一開始就宣告變數，以免發生 hoisting 導致無法預期的結果出現。

### reference

- [How to Declare Variables in Javascript](https://www.sitepoint.com/how-to-declare-variables-javascript/)
- [如何在 JavaScript 中声明变量](https://github.com/rccoder/blog/issues/15)
