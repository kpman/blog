---
title: Sublime 與 iTerm 的視窗配置
date: 2015-02-07 19:55:04
tags:
- sublime text
- terminal
- tips
---

常用的編輯器是 Sublime Text 3，但是終端機是 iTerm2，兩者一直沒有 IDE 般的整合。
本篇記錄下如何更改 iTerm2 的視窗配置，讓兩者操作體驗上有更佳的配合。

![](http://i.imgur.com/wI92DCX.png)

<!-- more -->

### 一般情境

一般在 Sublime 和 iTerm 之間切換，我都是利用 `cmd+tab` 來做切換，但是這樣的使用情境，如果在筆電上開發，則會在執行 iTerm 的時候遮到 Sublime 的內容。如下圖所示：

![](http://i.imgur.com/7lg3dx4.png)

讓我們更改 iTerm 的視窗配置，來改善這樣的情況！

### iTerm 視窗設定

![](http://i.imgur.com/gfMTEKP.png)

根據上圖，依序找到 Profiles --> Window --> Style: Bottom of screen
調整完後視窗的高度會根據設定的 Rows 高度來決定。

### 快捷鍵設定

根據個人習慣，在不與 Sublime 相關的快捷鍵衝突，我建議採用 `cmd+.` 來啟動 iTerm。

![](http://i.imgur.com/Iw6ywHt.png)

※ 記得重新啟動 iTerms 來檢視設定的效果。

### 成果 Demo

做完上面的設定就大功告成了！

未來在編輯的時候，就可以利用 `cmd+.` 來啟動＆關閉終端機，操作感覺接近是內建在 Sublime 的環境。

如下圖所示：

![](http://i.imgur.com/cJNfCCa.png)

Enjoy!
