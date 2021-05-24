---
title: Sublime Text 2 實用技巧
date: 2013-06-05 12:53:10
tags:
  - sublime text 2
---

![Sublime Text 2](https://i.imgur.com/f5ZJthW.png 'Sublime Text 2')

Sublime Text 2 是一套越來越火紅的編輯器，如果你是接觸網頁開發，想必對於這套軟體不陌生，以下分享幾個好用的技巧，都是我自己平常比較常使用的技巧，因為我本身是一個懶得看文件的人，所以就整理這篇與大家分享。

<!-- more -->

## 編輯環境

1.  Mac 10.7.5
2.  Sublime Text 2

我是使用 mac，所以快捷鍵就會是 command 的配置。

## 技巧介紹

### 一、Set Syntax

有發現你的 Sublime Text 2 右下角有你正在編輯的環境語言嗎？舉凡 JAVA、CSS、HTML5 等  
比如說我現在要從 HTML5 切到 CSS 介面，除了由上方的 View->Sytax 切換外，可以利用快捷鍵

切換到 CSS 範例：

```
shift+command+p
鍵入sscss
```

![Set Syntax](https://i.imgur.com/51PUAhD.png 'Set Syntax')

每一個 Color Scheme 都會針對不同的語言去做優化，因此值得學習。

### 二、HTML5 snippet

貼心的 Sublime Text 2 有內建 HTML5 的 snippet，方法如下：

```
! + tab
```

```
html:5 + tab
```

都可以達成 HTML5 快速生成已經預定的 snippet.

![](https://i.imgur.com/grLplgD.png)

### 三、Multiple Selection 同時多個游標

```
按住command+點選你要的位置
```

推薦用在處理 Array 等結構重複性高的資料型態。

### 四、Column Selection 同時直行游標

```
按住option+按著滑鼠左鍵直行往下拖曳選取
```

推薦用在處理 html 等修改固定 class 或其他部分。

![](https://i.imgur.com/1kLSh2P.png)

### 五、選取引號內字串

通常你都怎樣選取雙引號內的字串呢？`"string"`利用滑鼠從第一個引號拉到後面那個。

輸入：`command + d` 即可完成

### 六、分割畫面

有時候我時常左邊放 HTML 檔，右邊放 SCSS 檔，一邊看一邊編輯，這時候就要分割畫面。

輸入：`command+option+數量`

就可以把視窗分割成你要的數量。

### 七、貼上符合縮排

有時候從網站上複製一段 code，常常貼上的部份本身就有縮排，貼完卻只有第一行有縮排，其他跑到前面。

複製完後，輸入：`shift+command+v`

也就是在原本的貼上加上 shift 就可以解決！

### _reference_

1.  [up chen in 2013 JSDC](http://www.youtube.com/watch?v=41nY3RLBy3w&list=PL8dIIwCMF-SOaSb3_VYUlyULpPyk7iwlh&index=1)
2.  [Paste and Indent](https://gist.github.com/twosixcode/1988097)
