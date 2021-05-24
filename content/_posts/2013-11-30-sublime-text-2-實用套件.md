---
title: Sublime Text 2 實用套件
date: 2013-11-30 00:02:48
tags:
  - sublime text 2
---

![Sublime Text 2](https://i.imgur.com/f5ZJthW.png 'Sublime Text 2')

Sublime Text 2 是網頁開發者都不陌生的一套編輯器，除了單純的文字編輯外，它還有很多實用的套件，這篇來介紹我平常常用的 Sublime Text 2 套件。

<!-- more -->

## 編輯環境

1.  Mac 10.9
2.  Sublime Text 2

Mac 環境，所以快捷鍵會介紹 command 的配置，若 windows 版本請自行查閱。

### 安裝 Package Control

所謂 Package Control 就是 Sublime Text 2 用來裝套件的，因此在裝其他的套件之前，我們必須先來安裝 Package Control。

```
開啟Sublime Text 2
開啟console，快捷鍵ctrl+`
貼上以下程式碼

import urllib2,os; pf='Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler( ))); open( os.path.join( ipp, pf), 'wb' ).write( urllib2.urlopen( 'http://sublime.wbond.net/' +pf.replace( ' ','%20' )).read()); print( 'Please restart Sublime Text to finish installation')
```

程式碼可以參照[官網](https://sublime.wbond.net/installation#st2)

安裝完後，未來我們就可以使用`cmd+shift+p`，打入`install package`，即可啟用 Package Control，如下圖

![install package](https://i.imgur.com/5n76S9Q.png)

### 安裝套件步驟

1.  首先`cmd+shift+p`
2.  鍵入`install package`
3.  跳出新的輸入欄位後，在輸入你要的`package名稱`
4.  看著左下角，等它跑完
5.  重新啟動 Sublime Text 2 即安裝完成。

## 必裝套件

#### 一、BracketHighlighter

![](https://i.imgur.com/2ovEcG8.png)

這是一套超過 196K 人裝的套件，如圖所示，寫 html 常常遇到不知道 close tag 在哪邊，裡用它可以清楚的將 close tag 標示出來。  
另外它有一個很好的地方，就是會在每一行的前面列出來目前的 tag，不同的語言還有不同的 icon，因此可以更快的知道自己的位置。

#### 二、Emmet

以前它叫做 Zen coding，現在則改為 Emmet。

可以將需要重複的 html 用很簡短的方式寫出來，例如：

1.  `.container>.col-lg-4*3`
2.  按下 tab 後便會出現
3.  ![Emmet](https://i.imgur.com/PP9vdmr.png)

若你發現按下 tab 後竟然沒有用，記得確定自己是不是在 html 文件內。

```
view --> syntax --> HTML(5)
```

在 HTML5 的文件下，`!+tab` 會有出現 HTML5 的 snippet 出現，非常好用！

#### 三、Pretty Json

有利用到 JSON 的人，想必一定會為了格式上面的問題而煩惱，只要裝上這個，JSON 立刻變得很好看。

裝完之後，把你要修改的 JSON 選取起來，按下快捷鍵

```
cmd+ctrl+j
```

立刻就可以把 JSON 變得很漂亮，也可以自行進去定義縮排大小。

#### 四、flat theme

![flatland](https://i.imgur.com/pvxRMlX.png)

其實這個套件全名是 flatland 才對，可以把 Sublime Text 2 的整體環境變得扁平化。

安裝方法：

1.  打開 Package Control
2.  輸入 Theme - Flatland 即可

---

以上介紹了一些我常用的 Sublime Text 2 套件，但一直沒有找到好看的主題，如果你有推薦的主題，非常歡迎交流！
