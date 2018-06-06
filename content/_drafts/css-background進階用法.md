---
title: CSS background 進階用法
date: 2014-06-15 17:16:04
tags: 
- css3, 
- background,
- css
---

最近著手研究了 CSS3 的 multiple background 用法，翻了翻 spec 才發現有很多之前不知道的定義，利用這篇 blog 將這些早已定義好的屬性給記錄下來。

<!-- more -->

## multiple background

在 CSS3 新增的屬性下，許多瀏覽器都開始支援 multiple background，其用法如下：

```css
.multiple {
  background-image: url(路徑1), url(路徑2), url(路徑3);
  background-color: #fefefe;
  background-repeat: no-repeat;
  background-position: left top, center center, right bottom;
}
```

- 利用逗點分開不同的 background-image 屬性
- 後續的 background 屬性會依序對應到 background-image
- 若設定 3 個 background-image，但只有 2 個 background-position，則該屬性會 repeat 套用到 background-image 上面。
  - ex: 3rd background-image 會套用 1st 的 background-position 的屬性。
- 圖層概念：url(路徑 1) > url(路徑 2) > url(路徑 3)，前者會蓋在後者之上。

## default background value

## background-color

當設定了 background-color 後，又設了 background-image，則 background-color 會獨立一層，放在所有 background-image 底下。
