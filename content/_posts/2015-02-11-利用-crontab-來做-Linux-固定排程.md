---
title: 利用 crontab 來做 Linux 固定排程
date: 2015-02-11 11:57:45
tags:
- code
- linux
- crontab 
---

近期有個需求，要在 Linux 上執行固定週期的時程，發現利用 crontab 這個內建的功能便可以完成，本篇記錄使用過程以及相關的參數。

![](https://i.imgur.com/kcFpx34.png)

<!-- more -->

## crontab 介紹

crontab 是 Linux 內建的機制，可以根據設置的時間參數來執行例行性的工作排程。

![](https://i.imgur.com/OGytWih.gif)

上述這張圖可以清楚的顯示出前五項參數應該要帶進去的數字。  
依序是`分鐘`, `小時`, `日期`, `月份`, `星期`, `command`  
參數為`0-59`, `0-23`, `1-31`, `1-12`, `0-6`, `需要執行的command`

※ 星期參數為`0`代表星期日

## 參數特殊字符意義

`【*】`：星號，代表任何時刻都接受的意思  
`【,】`：逗號，代表分隔時段。例如：`30 9,17 * * * command`，代表早上 9 點半和下午五點半都執行 command。  
`【-】`：減號，代表一段時間範圍。例如：`15 9-12 * * * command`，代表從 9 點到 12 點的每個 15 分都執行 command。  
`【/n】`：斜線，n 代表數字，表示每個 n 單位間隔。例如：`*/5 * * * * command`，代表每隔 5 分鐘執行一次 command。

還有一些人性化的參數，一次取代全部五個數字參數

`【@reboot】` ：僅在開機的時候執行一次。  
`【@yearly】` ：一年執行一次，和`0 0 1 1 * command`效果一樣。  
`【@annually】`：（和`@yearly`一樣）  
`【@monthly】`：一個月執行一次，和`0 0 1 * * command`效果一樣。  
`【@weekly】`：一個星期執行一次，和`0 0 * * 0 command`效果一樣。  
`【@daily】`：每天執行，和`0 0 * * * command`效果一樣。  
`【@midnight】`：（和`@daily`一樣）  
`【@hourly】` ：每小時執行，和`0 * * * * command`效果一樣。

## crontab 操作

crontab 是會根據不同的使用者去判定可以操作的範圍。

`$ crontab -l`: 列出該使用者擁有的 crontab 指令  
`$ crontab -e`: 編輯該使用者的 crontab 指令  
`$ crontab -r`: 將使用者的 crontab 全部清除！（ **小心使用** ）

編輯完後就可以存檔離開，Linux 系統便會依照你設定的排程固定做事，非常方便。

※ 下達指令請用 **絕對路徑** 避免錯誤

## 範例參考

`$ */5 * * * * /home/ubuntu/test.sh`：每五分鐘執行一次測試 shell script  
`$ 0 9 * * 1-6 node /home/ubuntu/workspace/report.js`：每天早上九點（除了星期日）執行 report.js 這隻檔案

### reference

[Schedule Tasks on Linux Using Crontab](http://kvz.io/blog/2007/07/29/schedule-tasks-on-linux-using-crontab/)
[鳥哥的 Linux 私房菜 例行性工作排程 (crontab)](http://linux.vbird.org/linux_basic/0430cron.php#whatiscron_linux)
