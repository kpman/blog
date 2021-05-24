---
title: 利用pseudo element 讓html更簡潔
date: 2013-05-07 11:28:16
tags:
  - code
  - css
  - html
---

趁著記憶猶新的狀況，記錄自己使用偽元素 (pseudo-element)讓原本的 html 架構更加簡潔的方法。

<!-- more -->

## 何謂 pseudo-element?

不會出現在 html 的文件裡面，而是利用 css 讓瀏覽器去實作。以下列出的都是可以使用的 pseudo-element。

1.  ::first-line：若是 p 元素，則可以用來操作第一行。
2.  ::first-letter：用來操作第一個字。
3.  ::before：可以在所選元素之前插入樣式/內容。
4.  ::after：同`before`但是是在之後插入。
5.  ::selection：用來自定反白後的效果。

> 為了區分偽元素和偽類，CSS3 的 guildline 將偽元素的寫法修正，以往只要加一個冒號「:」，現在則是加兩個冒號「::」，部分可支援的瀏覽器包含 webkit, firefox, opera。)
> -- by [MUKI](http://www.mukispace.com/pseudo-elements-10-examples/)

## 修改過程

### 原本的 html code

```html
<div class="icon">
  <img src="img/icon01.png" alt="正確觀念" />
  <span>正確觀念</span>
</div>
```

```scss
.icon {
  display: inline-block;
  position: relative;
  padding: 1em;
  padding-top: 5px;
  span {
    position: absolute;
    bottom: -7px;
    left: 12px;
  }
}
```

原本利用 div > span 的效果去把中文字顯現出來，所以在 html 的架構下，需要多一個`span`的 tag。  
且利用`img`去把圖片給 show 出來。

### 更改過後的 html code

```html
<!-- html只剩一行！-->
<div data-text="正確觀念" class="concept_label icon"></div>
```

```scss
.icon {
  display: inline-block;
  position: relative;
  padding: 1em;
  padding-top: 5px;

  &:before {
    position: absolute;
    bottom: -7px;
    left: 12px;
    content: attr(data-text); // 關鍵作法
  }
}
.concept_label {
  background-image: url(../img/icon01_c.png);
}
```

###觀念整理

1.  將中文字放入自訂的`data-*`屬性
2.  CSS 中利用`::before`取代原本的`span`
3.  利用`content: attr(data-text);`將 date-text 文字取出來
4.  將背景圖片利用另外一個 class 取代，以後維護性提高。

### _reference_

[那些 CSS 偽元素可以幫你做的 10 個效果](http://www.mukispace.com/pseudo-elements-10-examples/)
