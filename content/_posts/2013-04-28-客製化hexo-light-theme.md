---
title: 客製化hexo light theme
date: 2013-04-28 21:09:37
tags:
- hexo
- theme
---

分享一些目前知道的客製化 theme 技巧。  
其實非常簡單，但是這些技巧如果沒有問過或是自己看過文件，  
一時間也無法摸透，所以覺得應該值得把它記錄下來。

<!-- more -->

### 一、增加 Disqus 留言板

- 到[Disqus](http://disqus.com/)申請帳號
- 右上角的 Dashboard `+Add` 申請一個新的帳號
- 將網址、name、shortname 打好後，要把 `shortname` 記住！
  _ 修改本機目錄下的 `_confid.yml`
  _ 在 `disqus_shortname` 貼上自己的 shortname

完成～

※ 後記：  
若你在申請完 disqus 貼到自己的 blog 上面，發現出現很多不必要的連結，請到 disqus 的 dashboard 去修改。  
右上方 `Setting` -> `Discovery` -> 將 Discovery level 拉到最右邊，如下圖  
![Discovery level](https://i.imgur.com/eeEjwka.png)

### 二、增加右方側欄 widget

在標題就已經破梗囉 XD  
右方出現那些『Tag』『Tag Cloud』等欄位，其實就是修改 widget 過後得到的結果。  
方法如下：

- 找到 `theme/light/layout/_widget` ，可以發現很多 **ejs** 檔
- 有些是已經自訂好了，例如 `category` `recent_posts` 等
- 在 `theme/light/_config.yml` 內，修改**widgets**，在底下新增你要的 ejs 檔名即可～

同樣方法可以自己寫 ejs 檔，一樣在`theme/light/_config.yml`加上檔名就可以自訂。

### 三、增加上方自訂全域導覽列

預設為 Home、Archives 這兩個  
當然得要自訂才爽 XD

方法一樣很簡單如下：

- 找到`theme/light/_config.yml`裡面的第一行
- 預設狀況應該只有 Home&Archives  
   ![menu](https://i.imgur.com/reKRQw4.png)
- 自訂自己的 menu，項目後面即為**連結**，可以直接使用`http://google.com`之類的連結。

### 四、自訂 favicon

- 首先你要有一個 favicon.ico 檔或是.png 檔(這邊預設檔名為`favicon.png`)
- 將檔案放在 `主目錄/source` 底下  
   ![favicon path](https://i.imgur.com/Aar4ap9.png)
- 找到 `theme/light/layout/_partial/head.ejs`做修改
- 在裡面加上 head.ejs 檔內確認有以下這行 code 即可擁有自己的 favicon

```
<link href="<%- config.root %>favicon.png" rel="icon">
```

以上介紹一些目前知道的自訂方法，  
希望還有人可以跟我多介紹一些技巧，一起分享吧！
