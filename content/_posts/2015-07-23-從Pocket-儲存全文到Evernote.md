---
title: 從 Pocket 儲存全文到 Evernote
date: 2015-07-23 21:21:26
tags:
- pocket
- evernote
- tool
- ifttt
---

Pocket 是一款可以稍候待讀的 app，其漂亮的介面和離線閱讀的功能，使我對於它愛不釋手。
然而從英語語系出發的 Pocket 團隊，雖然在專業版提供全文檢索（full text search）的功能，但是在繁體中文上面還是略顯不足，常常找不到已經封存的文章內容，因此本篇記錄利用 Pocket 儲存到 Evernote 的過程。

![RSS to Evernote](https://i.imgur.com/g9vZzcB.png)

<!-- more -->

Pocket 的閱讀介面是它的一大優勢，而 Evernote 的搜尋功能是有目共睹的準確，我們將利用 IFTTT 這個自動化工具來實作「當我從 Pocket 封存項目後，自動儲存全文到 Evernote」。

## 0. IFTTT 內建 Pocket 問題所在

有使用 [IFTTT](https://ifttt.com) 的朋友應該知道說其實它有內建 Pocket 的選項，但是由於它提供的 Pocket 儲存只有所謂的 Excerpt 的功能，也就是只有部分的內容，並沒有辦法全文儲存到 Evernote 的 note 當中。

![ifttt pocket feature](https://i.imgur.com/Q90mCAB.png)

因此我們的解決步驟為：

1.  建立 Pocket archive item 的 public full text RSS feed
2.  創建 RSS to Evernote 的 recipe
3.  問題解決

未來就可以利用 Evernote 強大的搜尋功能來做到找到曾經閱讀封存的文章。

## 1. 建立 Pocket 的 Full Text RSS 來源

- 首先到 [`Pocket > Options > Privacy`](https://getpocket.com/privacy_controls) 把 RSS feed 設為 public
- 點選 `Archive feed` 取得 Pocket 帳戶底下封存項目的 RSS feed link，連結應該為 `http://getpocket.com/users/<你的帳號>/feed/read`
- 到 [`fivefilters`](http://fivefilters.org/content-only/) 建立 full text RSS，貼上你的 feed url 後，按下 Create feed
- 把視窗連結記錄下來，這連結即為你的 full text RSS 來源

## 2. 創建 RSS to Evernote Recipe

- 根據此 [`recipe`](https://ifttt.com/recipes/183722-save-full-text-of-new-pocket-item-to-evernote) 創建你自己的版本
- 將上述的 full text RSS 連結貼上
- 根據步驟創建你的 IFTTT recipe

完成上述步驟後，即可在 Evernote 你所命名的筆記本內看到你在 pocket 所封存的項目囉。

## 使用心得

其實在 pocket mobile app 上面，有直接儲存到 Evernote 的選項，但我閱讀文章完如果值得存下來的，我習慣直接 archive 起來。
實際使用這個 recipe 後，發現有一些網站的 full text RSS 抓的並不是很準確，速度也沒有很快，通常都要半個小時後才會在 Evernote 出現，但在網頁版並沒有存到 Evernote 的選項，在權衡下，我還是選擇使用此 recipe 來做為未來可以在 Evernote 搜尋的自動化工具。

### reference

[Automate Full Text of Pocket Backup to Evernote with IFTTT and FiveFilters](https://capeably.wordpress.com/2014/06/21/automate-full-text-of-pocket-backup-to-evernote-with-ifttt-and-fivefilters/)
