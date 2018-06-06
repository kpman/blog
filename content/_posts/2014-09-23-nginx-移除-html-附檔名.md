---
title: Nginx remove .html filename
date: 2014-09-23 10:10:56
tags:
- nodejs
- nginx
- static file
- server
---

Nginx 是一套輕量化的 web server，因為它的輕量、高效能而越來越多人喜歡使用它來做為網頁伺服器或是反向代理伺服器，本篇將介紹靜態網頁在 nginx 上移除.html 附檔名的作法。

![Nginx](http://upload.wikimedia.org/wikipedia/commons/c/c5/Nginx_logo.svg)

<!-- more -->

### 一、Start

本篇要做 nginx 這套 web server 的設定檔更改，來達到雖然存取靜態頁面，卻可以利用 mydomain.com/user 的 URL 來拿到所要的靜態頁面。

> 其實是我單純是因為不想要看到.html 這樣的附檔名，這看起來不專業！

_本篇環境為 ubuntu14.04 下執行。_

### 二、Static file permission

在 nginx 下，你要將靜態檔案放在 server 哪邊都可以，在此我根據之前 apache 習慣的設定，放在/var/www

```
cd /var
sudo mkdir www
sudo chown -R www-data:www-data /var/www/mydomain.com
sudo chmod 755 /var/www
```

如此一來你便可以將整個靜態網站檔案放在/var/www/mydomain.com 目錄底下。

### 三、Nginx conf setting

```
cd /etc/nginx/sites-enabled
sudo vim mydomain.com
```

修改底下內容為你要的設定

```
server {
  listen        80;
  root          /var/www/mydomain;
  index         index.html index.htm;
  server_name   mydomain;
  location / {
    try_files $uri $uri/ $uri.html;
  }
}
```

此設定將會當抓到$uri 時，nginx 會自動帶入`$uri/`或是`$uri.html`
因此我們送出`mydomain.com/user`，nginx 會試著搜尋`mydomain.com/user/`或`mydomain.com/user.html`。

### 四、Remove default conf

```
sudo rm /etc/nginx/sites-enabled/default
```

在我設定的時候，需把 default 刪除後，才可以正常的讀取到新設定的 mydomain.com 檔，歡迎各位先進補充這點。

### 五、Restart Nginx

`/etc/init.d/nginx restart` || `sudo service nginx restart`

如此一來你便可以利用`mydomain.com/user`純取到相關的靜態頁面了！

**reference**

[How To Set Up nginx Virtual Hosts (Server Blocks) on Ubuntu 12.04 LTS](https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-virtual-hosts-server-blocks-on-ubuntu-12-04-lts--3)
