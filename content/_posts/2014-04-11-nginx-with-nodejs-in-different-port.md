---
title: Nginx with Node.js in different port
date: 2014-04-11 00:16:33
tags:
  - nodejs
  - nginx
  - server
---

Nginx 因為它的輕量、高效能而越來越多人喜歡使用它來做為網頁伺服器或是反向代理伺服器。

由於近期想要把不同的 node.js 程式放在同一個 server，因此開始研究 nginx 用法，記錄下來我的實作方式。

![Nginx](https://i.imgur.com/fObgc2s.png)

<!-- more -->

### 一、Domain 指向主機

將不同的 domain 都指向你的主機 ip，此時都會指向 HTTP 預設的 80 port，後面再用 nginx 設定由不同的 port 去處理不同的 node.js 程式。

### 二、安裝 Nginx in Ubuntu

```
sudo apt-get update
sudo apt-get upgrade // 確定抓到套件
sudo apt-get install nginx
sudo service nginx start
```

在安裝的時候，記得你如果有其他 server 在 run 必須要停掉，不然佔住 80 port 是沒有辦法裝成功 nginx 的。

### 三、將 Node.js 設定不同 port

會寫 node.js 應該會將 port listen 在不同的 port，注意不要用常用的那些 port 即可。例如：80(HTTP)、22(SSH)。

### 四、設定 Nginx 資料夾檔案

進到`/etc/nginx/sites-enabled`，然後創建跟你 domain 一樣的檔案，記得權限要用`sudo`去創

```
sudo vim domain1.com
```

檔案內容

```
server {
    listen 80;
    server_name domain1.com;
    access_log /var/log/nginx/domain1.access.log;
    location / {
        proxy_pass    http://127.0.0.1:4000/;
    }
}
```

同理創建 domain2.com，記得 4000 port 要改成你設定的 port。

### 五、重啟 Nginx

`/etc/init.d/nginx restart`

記得做過更動後，要重新啟動 nginx 才有用。
如此一來，不同的 domain 就可以連到同一台 server 的不同支 node.js 去執行了。

**reference**

[node.js + nginx - And now?](http://stackoverflow.com/questions/5009324/node-js-nginx-and-now/5015178#5015178)
[wikipedia nginx](http://zh.wikipedia.org/wiki/Nginx)
