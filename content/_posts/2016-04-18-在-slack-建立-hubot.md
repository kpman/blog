---
title: 在 slack 建立 hubot
date: 2016-04-18 22:42:02
tags:
- bot
- slack
- hubot
- heroku
---

slack 推出 bot 在 2016 這個時間點已經不算新鮮事，隨著 messenger 也推出自家的 bot 後，才真正開始接觸架設自己的 bot，網路上查到都是日文的資源較多，因此記錄這篇過程，希望能幫助到其他中文開發者。

![slakbot & hubot](http://i.imgur.com/qzHh7bb.png)

<!-- more -->

## 零、懶人包指令

先把會用到的全部指令列在這邊，下面會分項目做解釋

```
npm install -g hubot coffee-script yo generator-hubot
mkdir hubot
cd hubot
yo hubot
npm install hubot-slack --save
git init
git add .
git commit -m "Initial commit"
GET HUBOT_SLACK_TOKEN // https://my.slack.com/services/new/hubot
Install the Heroku Toolbelt // https://toolbelt.heroku.com/
heroku create "project-name"
heroku config:add HEROKU_URL=https://"project-name".herokuapp.com
heroku config:add HUBOT_SLACK_TOKEN="xoxb-********-********"
git push heroku master
```

## 一、安裝本地環境

```
npm install -g hubot coffee-script yo generator-hubot
```

hubot 會用到 coffee-script 和 yo 去產生整個專案，所以需要安裝在全域 `-g`

```
mkdir hubot
cd hubot
```

此處創建資料夾可建立自己的名字

## 二、產生 hubot 專案

```
yo hubot
```

這邊會問你一些問題，記得在 `adapter` 打 `slack`
此舉會讓官方產生預設 heroku 的 `Procfile` 裡面多了這一行

```
web: bin/hubot -a slack
```

這是為了讓 heroku 啟動時候知道怎樣運作的指令

## 三、安裝 hubot-slack 套件

這是 slack 官方維護的套件，穩定度應該頗高，安裝後一併做一個專案 git 初始化並 commit

```
npm install hubot-slack --save
git init
git add .
git commit -m "Initial commit"
```

## 四、取得 HUBOT_SLACK_TOKEN

到[此處](https://my.slack.com/services/new/hubot)建立新的 hubot service
若有多個 team 帳號，請記得確定你登入的帳號是在哪一個 team 底下

取一個 hubot 要在 slack 內的名字，下圖用 `hubot` 做示範

![hubot](http://i.imgur.com/bpsLcz7.png)

接著下一步就可以取得 HUBOT_SLACK_TOKEN，記得把這個 TOKEN 記下來

## 五、本機端測試

```
HUBOT_SLACK_TOKEN=xoxb-********-******** ./bin/hubot --adapter slack
```

本機端記得先安裝 redis，hubot 會用到，
順利的話就可以在 slack 啟動 hubot 囉！

![hubot in slack](http://i.imgur.com/EWkWV3Q.png)
可以打開 hubot 跟它對話，
如果看到 `PONG` 則代表成功

## 六、將本地端 server 放上 heroku

slack 官方推薦的平台是 heroku，這邊介紹如何運作，
要記得的原理就是其實上述已經在本機端可以運行了，
這個步驟就是將 server 放到 heroku 上面去跑而已。

首先安裝 Heroku Toolbelt，這部份請看 [heroku 官方教學](https://toolbelt.heroku.com/)

```
heroku create "project-name"
heroku config:add HEROKU_URL=https://"project-name".herokuapp.com
heroku config:add HUBOT_SLACK_TOKEN="xoxb-********-********"
git push heroku master
```

這個 project-name 其實就是未來你的 herokuapp 的 URL，
不能和其他人重複，因此名字可以想自己容易記得即可。

`heroku config:add` 是將一些變數丟給遠端的 heroku 知道，
讓他可以抓到 `HEROKU_URL` `HUBOT_SLACK_TOKEN` 等，
接著就是將 local 這個 git repo push 到 heroku 上面。

## 七、注意事項

等到 heroku 跑完後，hubot 的 server 已經跑在 heroku 上面了，
而免費的 heroku dyno 有每 24 小時一定要停機 6 小時的規定，
因此若要拿來當正式的 bot 服務，
建議自己架 server 或者就付費買 heroku 的服務。

另外，在 hubot 專案底下的 `hubot-heroku-keepalive` 就是會固定戳 heroku，避免 30 分鐘後這個 dyno 就休息了。

在 heroku 上面有免費的 redis add-on 可以用，
每個月有 30mb 的免費使用量。

## reference

- [hubot official doc](https://hubot.github.com/docs/)
- [hubot-slack npm README](https://www.npmjs.com/package/hubot-slack)
- [hubot configuration on heroku](https://github.com/slackhq/hubot-slack#configuration) 推薦看這份

有任何問題，歡迎留言討論。
