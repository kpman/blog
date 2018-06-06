---
title: Sublime Text 3 Mac 指南
date: 2014-10-14 15:16:59
tags:
- sublime text 3
- sublime text
---

本篇是我根據自己使用習慣所做的快捷鍵整理，使用 sublime text 這套編輯器已經有 2 年之餘，本身是個快捷鍵愛好者，對於發掘好用的快捷鍵樂此不疲，因此整理常用的快捷鍵在這篇，針對的是 mac 使用者所使用者快捷鍵，希望對各位有幫助。

<!-- more -->

# 快捷鍵

左邊為本篇所採用的縮寫，右邊則為鍵盤上面的標示

- cmd = command
- shift = shift
- option = option (alt)
- control = control
- pkg-ctrl = package control (command + shift + p)

## 基礎模式

「基礎模式」介紹非 sublime 專用的快捷鍵，是一般使用者都可以快速上手的部分，想要看進階的可以跳過這部份。

### 1. cmd + o (open)

快速開啟整個資料夾(專案)

### 2. cmd + w

關閉視窗分頁

### 3. cmd + n

開新分頁

### 4. cmd + shift + t

重新開啟剛剛關閉的分頁

### 5. cmd + shift + v

貼上時，符合縮排

## 畫面配置

以下介紹 sublime 的畫面配置，常常因為編輯情境的所需，利用快捷鍵讓自己的畫面配置更加有彈性。

### 1. cmd + option + 數字

分割視窗，讓你的編輯範圍有多個 panel。
常用為`cmd + option + 1` 和`cmd + option + 2` 之間切換。
使用情境：左邊.html 右邊.css，編輯起來快速又方便。
建議：利用空白鍵右邊的兩個連續按鈕搭配數字。

![](http://i.imgur.com/wWrUvSA.gif)

### 2. cmd + k 再 cmd + b

關閉左側資料夾目錄，讓畫面變得更寬敞。
這是我非常使用的一個快捷鍵，可以讓編輯的區域變得更大。

![](http://i.imgur.com/IiAhOPx.gif)

### 3. cmd + shift + control + f

進入 zen 狀態，單份文件變成全螢幕，且左邊會自動縮排。
使用情境：當不常需要切換檔案時，此模式可以專注在單一檔案上，打這篇 blog 時我便這樣使用。
建議：快捷鍵不好記，可以點選`View --> Enter Distraction Free Mode`

![zen](http://i.imgur.com/DdD24a5.png)

## 選取

底下介紹的部份，回到 sublime text 編輯器本身，因為重點在編輯部分，因此在此將「選取」特別整理成一區。

### 1. cmd + d (可連按)

快速選取一範圍內的字串，`連按d`的話會選取整份文件內相同的字串。
當選取完後，可以直接打字，因此就可以將整份文件的字串全部改成新字串。

![](http://i.imgur.com/tkjccVA.gif)

### 2. cmd + l (可連按)

選取游標在內的一行，`連按l`的話會往下選取下面的行數。

### 3. cmd + shift + l

此功能常與上述`cmd + l`配合，當選取多行後，按下`cmd + shift + l`，則會在多行的情況結尾出現游標，可以做多行編輯。
![](http://i.imgur.com/t6Mvfof.gif)

### 4. option + 滑鼠拖拉

當按住`option`後，搭配`滑鼠拖拉`便可以一次選取多行，並且產生游標。
_注意：拖曳的時候，滑鼠必須是由上到下垂直的選取狀態_

![](http://i.imgur.com/4cyN5eD.gif)

### 5. cmd + 滑鼠點選

按住`cmd`後，利用滑鼠在文件內點選，便可以在任何位置新增游標，產生多選狀態做編輯。

![](http://i.imgur.com/ltNQcxi.gif)

### 6. cmd + 左 或 右

讓你的游標可以快速的回到該行的最前面或是最後面。

![](http://i.imgur.com/WXyhkDE.gif)

### 7. shift + 左 或 右

每按一次會選擇一個字元，可以更加精準的選取自己要的部份。

![](http://i.imgur.com/yPeO2UF.gif)

### 8. cmd + shift + 左 或 右

從游標所在處，往前選取或者往後選取該行到底。

![](http://i.imgur.com/RX0XyMh.gif)

## 尋找

在 sublime 裡面尋找的功能做的非常強大，不論是文件內、或是文件名稱都可以快速找到。
底下將會利用 GoTo Anything 這個強大的內建功能來實作。

### 1. cmd + p + 輸入檔名

利用`cmd + p`，之後等視窗出現後，即可輸入你要找的檔名，按下 enter 即可開啟。

![](http://i.imgur.com/eH0Lbiu.gif)

### 2. cmd + p + ":" + 行數

此功能相同於`control + g`，可以快速的跳到你指定的行數。

![](http://i.imgur.com/cIp5SYH.gif)

### 3. cmd + p + "@" + function name

此功能相同於`cmd + r`，可以快速跳到定義的 function
建議：若是知道要找 function，建議使用這個而非使用`cmd + f`

![](http://i.imgur.com/IGdokvK.gif)

### 4. cmd + p + "#" + keyword

此功能可以快速找到文件內的關鍵字。
個人比較少用這個功能，利用`cmd + f`時，可以持續按 enter 找到目標。

### 5. cmd + shift + f

全文搜尋，可以找出「整個 project」內的關鍵字。
在 Find Result 內，點選兩下，便可以跳到該文件，這是我覺得最實用的部份。

![](http://i.imgur.com/RYZ0GOQ.gif)

## 快還要更快

### 1. cmd + control + 上 或 下

將選取起來的行，整段往上或往下移動。
使用情境：當幾行 code 需要移動不算太大範圍的時候，可以使用這個快捷鍵，而不用剪下再貼上。

![](http://i.imgur.com/R3jxRrV.gif)

### 2. cmd + /

將該行註解。
個人建議：搭配`cmd + l(連按)`可以選取多行，一次註解起來。

![](http://i.imgur.com/B85owMN.gif)

## reference

1.  [GETTING STARTED WITH SUBLIME TEXT 3: 25 TIPS, TRICKS, AND SHORTCUTS](https://blog.generalassemb.ly/sublime-text-3-tips-tricks-shortcuts/)
2.  [Sublime Text 全程指南](http://zh.lucida.me/blog/sublime-text-complete-guide/)
