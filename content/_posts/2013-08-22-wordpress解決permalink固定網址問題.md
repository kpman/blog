---
title: wordpress解決permalink固定網址問題
date: 2013-08-22 12:54:15
tags:
- wordpress
- apache2
- htaccess
---

本 case 為希望主目錄可以直接連到 wordpress，但是 wordpress 是另外放在一個資料夾。

```
主目錄：/var/www
wordpress資料夾：/var/www/blog
```

<!-- more -->

## 一、.htaccess

wordpress 會利用.htaccess 去更改固定連結，是位在根目錄，也就是`/var/www`底下，wordpress 會根據你的`網站位置URL`去設定.htaccess

利用終端機產生.htaccess

```
vi .htaccess
chmod 777 .htaccess
```

## 二、進入後台設定固定網址 permalink

這邊我選擇文章名稱的格式

![固定網址](http://i.imgur.com/XlEgUdT.png)

因為剛剛上面有設定.htaccess 權限打開到最大，因此進後台設定完，記得把 chmod 改為 644，要注意安全性。

## 三、設定 mod_write

我的 wordpress 是架在 Amazon EC2 上的 ubuntu，server 是 apache2，因此上網搜尋相關資料，解決辦法如下：

```
sudo a2enmod rewrite
sudo /etc/init.d/apache2 restart
```

只要兩行就可以解決!

### **_後記_**

在解決這個問題的時候，找了很多資料，一來是不明白.htacces 真正的目錄，二來是不知道 ubuntu 的 rewrite 要打開，因此在這邊記錄下來，讓有相同困擾的人可以了解。
