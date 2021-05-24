---
title: 從 deploy node.js 專案所學
date: 2015-09-12 23:18:17
tags:
  - node.js
  - deploy
  - tips
---

學習 Node.js 已經兩年之餘，這段時間陸陸續續在開發上遇到一些問題（雷），然而隨著時間累積的叫做經驗，因此藉由此篇文章記錄從本機 development 環境到遠端 Linux 上的 production 所得到的經驗。

![Deploy](https://i.imgur.com/GtZ5ROB.jpg)

<!-- more -->

以下的 localhost 環境皆為 Mac 10.10，express.js，
而 deploy 的環境皆為 Linux 14.04 環境。

## 1. 環境變數

NODE_ENV 是運行 Node.js 重要的變數，在本機開發的時候預設為 `NODE_ENV=development`。

在執行 `app.js` (aka `bin/www`) 時，選擇需要的變數 (development || production)，若要運行為 production 環境指令為

```
$ NODE_ENV=production node bin/www
```

當然這個 `NODE_ENV` 值可以直接 export 在你所運行的環境當中，

```
$ export NODE_ENV=production
$ node bin/www
```

而若不想每次開啟 shell 都要重新 export 一次，可以將 export 指令寫進 `~/.bashrc` 內，之後開啟 shell 就會設定 NODE_ENV=production 了！

---

Q：那如何在 express.js 框架下的 app.js 拿到環境變數呢？
A：只要利用 express 框架為我們做好的 API 如下：

```javascript
// app.js
app.get('env');
```

即可得到 `NODE_ENV` 值。

## 2. config 檔設定

關於 config 檔的設定，每個人有不同的習慣，我介紹我常用的 config 檔設定方式。

```javascript
// config.js
var config = {
  development: {
    port: 3000,
    // anything else
  },
  production: {
    port: 3001,
    // anything else
  },
};
module.exports = config;
```

```javascript
// app.js
var config = require('./config.js')[app.get('env')];
var port = config.port; // production mode will return 3001
```

這樣設定 config 檔後，未來就可以利用 NODE_ENV 的不同來判斷應該要連接的資料，例如在 dev DB 和 production DB 的分開等等情況。

## 3. ejs 樣板引擎快取問題

在樣板引擎方面我習慣 ejs，而 ejs 會在 `production` 的狀態下把 view template 快取起來，加速 render 的時間，因此需要做 restart node server 的情況才可以解決快取問題。

ps. 或許這個問題有其他更好解法，非常歡迎協助補充。

## 4. node 執行 .js 檔

因為曾經撞過這些雷，單純就是經驗不足，以致於值得記錄一下 XD

直接提供 debug 經驗談：

- chmod -x yourfile.js // 權限問題
- 讀檔＆寫檔 // 請確定`相對路徑`和`絕對路徑`在環境的問題
- 第一行請加上 `#!/usr/bin/env node` // 讓環境找得到 node 去執行它

## 5. MongoDB 的匯出和匯入

Q：在本機端匯出和匯入都好好的，不知道為什麼到遠端的環境就沒有辦法匯入？
A：原因是語系問題，記得在 DB 匯入前先執行 export 或寫入 bashrc 檔

```sh
export LC_ALL="en_US.UTF-8"
```

## 後記

花時間經歷過的才會印象深刻，上述這幾點都是我利用時間所換來的，將此記錄在這邊，也希望能或多或少幫助到一些人：）
