---
title: EC2利用tasksel架wordpress經驗分享
date: 2013-08-21 02:17:04
tags:
- wordpress
- amazon
- ec2
- tasksel
- ubuntu
- aws
---

看了這麼久的雲端資源，總算開了算是自己真正學到東西的第一台 Amazon EC2 server，目的是想要練習把 wordpress 架到 EC2 上，在此分享我的架設經驗。

![Amazon web service](http://blog.programmableweb.com/wp-content/amazon-web-services1.png)

<!-- more -->

## 一、擁有 AWS 帳號

關於開啟 AWS 的過程，實際走過一遍之後，阿正老師的[這篇](http://blog.soft.idv.tw/?p=823&page=2)，其內寫的不錯，推薦跟著走一遍，就會了解很多。

## 二、開啟自己的 instance

在實際走過後，會發現阿正老師[這篇](http://blog.soft.idv.tw/?p=824)真的超用心，因此接下來主要會利用這篇，再加上些我的補充。

- instance 地理位置

提到將主機開的位置，現在已經有 tokyo 的據點，離台灣更近，所以建議將 instance 位置設在 tokyo

> 建議將 instance 位置設在 tokyo

- instance 選擇方案

![EC2 ubuntu server for free](http://i.imgur.com/U4rs7wk.png)

利用 VISA 卡，選擇免費方案（圖中有星星的都是免費方案），在這邊我選擇 ubuntu 來做為我的系統。

- key pair 創建＆下載

在阿正老師的文章內看到關於 key pair 介紹，很重要，一定要記住要把下載下來的 pem 給管理好，未來是需要利用它來做 ssh 登入主機。

> .pem 檔需要存好，一台主機配對一個 key pair，且不能做更改，

## 三、設定 Security Group

在沒有設定 security group 的時候，新開的 instance 可能是鎖起來的，會有 SSH 連線上的問題。

1.  進入 console.aws.amazon.com
2.  左方導覽列選擇 security group
3.  選擇 instance 後，下方的 tab 選取`Inbound`
4.  分別加入`SSH`&`HTTP`，Source 部分都維持 0.0.0.0/0 即可，加入後記得要按`Apply Rule Change`才生效

> 記得開啟 SSH(20)、HTTP(80)

## 四、申請 Elastic IP

每一個 instance 都應該要綁定一個 elastice ip，未來可以作為連線使用。

1.  同上，進入 console.aws.amazon.com
2.  選擇 Elastic IPs
3.  選擇 Allocate New Address
4.  申請完之後記得要 associate 到你的 instance

> 申請完 elastic ip 後，原本的 Public domain 前半部分會改變為新的 ip

\***_ 其實我在實作時，是先做了 SSH 連線，後來在去申請 elastic ip，結果 associate 完後，我又要 ssh 連線，發現沒有辦法登入，之後才瞭解是做了 elastic ip 後，連線的 ip 也需要一並跟著改變。_**

## 五、SSH 連線進入自己的 instance

1.  打開終端機（推薦 iterm）
2.  `chmod 600 ~/.pem`  
    要記得把.pem 檔改權限，不然會登不進去
3.  ssh 連線使用以下 command line  
    `ssh -i ~/.pem ubuntu@ip`
    _ `~/.pem`是此 instance 的 key pair .pem 檔的路徑
    _ `ubuntu`是因為我用 ubuntu 當做 OS，如果當初選擇 Amazon linux 的話，則需要輸入`ec2-user`取代 ubuntu \* `ip`則為 instance 的 ip，進到 console，左側選 instance，拉到底下看見  
     `Public DNS: ec2-xx-xxx-xxx-xx.ap-northeast-1.compute.amazonaws.com`  
     則 xx-xxx-xxx-xx 改成`xx.xxx.xxx.xx`即為你的連線 ip
4.  連線成功會看到`ubuntu@ip-xxx-xxx-xxx-xxx:~$`字眼！那就恭喜了！

> pem 檔的權限要更改為 600

## 六、環境設定

剛進到 instance，記得將環境設定一下

1.  `sudo apt-get update` + `sudo apt-get upgrade`
2.  如果覺得一直 sudo 很麻煩，可以利用`sudo su`取得 root 權限

---

### # 安裝 tasksel

1.  是 ubuntu 底下的 lamp 懶人包
2.  推薦[教學文](http://howtounix.info/howto/LAMP-on-Ubuntu-with-tasksel-tool)
3.  開始安裝 taskel `sudo apt-get install tasksel`
4.  安裝 lamp-server `sudo tasksel install lamp-server`

### # 安裝 phpmyadmin

1.  `sudo apt-get install phpmyadmin`
2.  [reference](http://linadonis.pixnet.net/blog/post/27585552-ubuntu-server-%E5%AE%89%E8%A3%9D-phpmyadmin)

### # 安裝 wordpress

![wordpress](http://wow-wp.org/wp-content/uploads/2011/10/wordpress.png)

1.  [超棒教學文](https://www.digitalocean.com/community/articles/how-to-install-wordpress-on-ubuntu-12-04) 我是跟著文章走，裡面紅色的字記得改成自己的

- cd /var/www
- 下載 wordpress 包  
  `wget http://wordpress.org/latest.tar.gz`
- 解壓縮  
  `tar -xzvf latest.tar.gz`
- 進到 mysql mode  
  `mysql -u root -p`
- 剩下有紅字，推薦看連結 XD

## 七、測試連線

當你安裝完後，事實上可以利用 public domain 來連線看看  
直接在 console 裡面找到 instance 的 public domian，連線看看是否成功

1.  `cd /var/www`
2.  `sudo vi test.php` 創新 php 檔案，並進到 vim 模式
3.  按`i` 進入編輯模式，記得看下面是否出現`-- INSERT --`
4.  打上這一行`<?php phpinfo(); ?>`
5.  按下 esc -> 打入`:wq` -> enter 存檔(記得是看 iterm 下面)
6.  利用 public domain/test.php 連線測試，看到 php 的資訊就成功了！
7.  public domain/wordpress 也可以看見你的 wordpress 有沒有架成功！

## IP 連接 instance

如果你有自己的 ip，想要指到 EC2 的話，按照下面作法。

1.  到 godday 的 DNS manager

- 設定你的 IP 的`A record`
- 指向 instance 的`Elastic IP`即可

**_reference_**

- [阿正老師上篇](http://blog.soft.idv.tw/?p=823&page=2) 阿正老師這兩篇必讀
- [阿正老師下篇](http://blog.soft.idv.tw/?p=824) 主機實戰篇
- [免費玩 Amazon Web Service(AWS) EC2](http://blog.rx836.tw/blog/first-amazon-web-services/) 開機器寫的很詳細，圖文並茂
- [Setting Up WordPress on Amazon EC2 in 5 minutes](http://coenraets.org/blog/2012/01/setting-up-wordpress-on-amazon-ec2-in-5-minutes/) 根本神教學，我是受這篇感動才想要把自己的過程給記錄下來。
- [Ubuntu Server 安裝 Phpmyadmin](http://linadonis.pixnet.net/blog/post/27585552-ubuntu-server-%E5%AE%89%E8%A3%9D-phpmyadmin) phpmyadmin 圖文教學
- [Giving WordPress Its Own Directory](http://codex.wordpress.org/Giving_WordPress_Its_Own_Directory) 更換 wordpress 的路徑位置指向

> 如果有問題，或者我有寫錯的地方，歡迎留言讓我知道！
