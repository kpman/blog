---
title: Linux 之 command line 上手
date: 2015-05-10 11:25:44
tags: 
- linux
- command line
- iterm2
- 終端機
---

開發者對於 command line 一定不陌生，然而 Mac OS 會受到許多開發者的青睞，是因為其本身就是依照 unix 系統做開發，因此對於虛擬主機需要用到 command line 自然不陌生，整合性很好。

這篇 blog 記錄網站開發超過兩年半經驗的我，最常用到的終端機指令 (command line)。

![](http://i.imgur.com/hGb22rh.png)

<!-- more -->

本篇針對的讀者是 mac 新手。

## 環境設定

建議下載 iterm2 來使用，有興趣可參考[設定](/2015/02/07/Sublime-與-iTerm-的視窗配置/)

## 常用指令

前面加上錢字號($)代表此行為 command line 開始，真正在打的時候不用加入`$`

`$ cd`: 移動 root 位置
`$ cd ..`: 移動到目前所在位置的上一層
`$ cd ../..`: 移動到目前所在位置的上兩層

`$ pwd`: 列出目前完整路徑 --> 可以知道自己現在在哪邊，再決定要如何利用 `cd` 移動

`$ ls`: 列出所在目錄的檔案
`$ ls -a`: 列出的目錄檔案包含隱藏檔
`$ ls -al`: 列出的目錄檔案包含隱藏檔 & 檔案屬性和權限

`$ vi(m) **.xx`: 創建檔名為`**`，附檔名為`xx`的檔案 --> 之後會進入 vi(m) 文字編輯模式，推薦查閱[鳥哥 vim 教學](http://linux.vbird.org/linux_basic/0310vi.php)

`$ mkdir ***`: 創建名稱為`***`的資料夾
`$ rmdir ***`: 移除名稱為`***`的資料夾 --> 需確定資料夾為空

`$ cp dest1 dest2`: 把 dest1 檔案複製到 dest2 的位置
`$ mv dest1 dest2`: 把 dest1 檔案移動到 dest2 的位置，亦可作為變更檔名使用，例如 `$ mv test.txt no-test.txt`，就可以把檔名 test 的文字檔改變成為 no-test 檔名。

`$ sudo su`: 取得 root 權限

以上列出我最常用的指令，許多指令都可以帶有特殊的參數，unix base 底下的 command line 也不只這些，想要更進一步，可以再多去參考書籍或是教學。

## reference

[鳥哥 Linux 檔案與目錄管理](http://linux.vbird.org/linux_basic/0220filemanager.php#dir_path)
