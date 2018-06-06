---
title: 建立自己blog的subdomain
date: 2013-04-27 00:24:36
tags:
- domain
- hexo
- subdomain
- url
---

有鑑於 `kpman.github.io` 這一個網址實在太難記了，所以就決定將自己有的 domain 利用 subdomain 的方式指過來。  
以下的介紹是我的個案，我利用 subdomain 而非 TLD 去做。

<!-- more -->

## 一、擁有自己的 domain

雖然像是廢話 XD
但這邊推薦去[GoDaddy](www.godaddy.com/)買 domain.  
方便又快，在更新 domain 的時間非常快速，理論上一個小時內就可以指到你要的 ip 位置。

## 二、到 GoDaddy 設定 subdomain

1.  進到 DNS manager
2.  新增一筆 CNAME

    ![CNAME](https://i.imgur.com/esdG2wP.png)

3.  GoDaddy 部分完成

## 三、在本機端設置 CNAME 檔

這邊要在 `主目錄-source` 底下放一個檔名為 `CNAME` 的檔案  
裡面為你要指向的路徑，這邊我是指向 `http://code.kpman.cc`

![path](https://i.imgur.com/gyMS7U6.png)

至於如何設置 CNAME 檔案，我是利用在 github repo 上面的 create new file

![create new file](https://i.imgur.com/AHcVLBW.png)

設置完之後 clone 下來，然後複製進去`主目錄-source` 底下 XD  
（有人知道怎樣做比較好嗎？）

理論上這樣子就完成囉！  
如果有漏掉的麻煩留言給我一起討論:)

### _reference_

[官方文件](https://help.github.com/articles/setting-up-a-custom-domain-with-pages)
