---
title: 利用 Hub 來自動發 GitHub PR
date: 2017-07-03 23:55:19
tags:
  - github
---

## 起源

因為工作和平時習慣的 Git 協作平台是 GitHub，因此常常發 pull request (以下簡稱 PR) 到 GitHub 上面，而這個流程對我來說不太順手，因此便想要利用更自動化的方式來做掉。

![](https://i.imgur.com/jEBYSRO.png)

<!-- more -->

## 舊有流程

一般來說發 GitHub 的 PR 流程如下：

1.  在 local commit
2.  推 local branch 到 remote 上面
3.  打開 GitHub 網站
4.  進到你的 repo 頁面
5.  點開 PR 按鈕
6.  編輯 PR title
7.  按下按鈕確認發 PR

這樣的流程除了需要在瀏覽器 和 terminal 間切換外，最麻煩的是需要操作滑鼠多點好幾下，整個流程會將思緒打斷。

## Hub

這是一套 GitHub 官方所維護的套件，用來加強原生 git 的功能，而這個套件剛好提供了
`$ hub pull-request` 的功能，可以在該 local branch 發 PR。

使用 Hub 套件發 PR 流程如下：

1.  在 local commit
2.  推 local branch 到 remote 上面
3.  $ hub pull-request
4.  進入 vim 模式
5.  編輯 vim
6.  編輯完後需要存檔離開 vim ，Hub 才會自動發 PR

使用 Hub 後流程已改善，把在瀏覽器上的操作帶回到 terminal，但整體使用卻依舊不便，因此我便思考能不能一鍵發 PR 到 GitHub 上面，而最後找到了下面這個解決方案，雖非最完善，但方便不少。

## 一鍵自動化流程

### Setup

```shell
$ vim ~/.oh-my-zsh/lib/aliases.zsh (in my case)
$ alias pr='hub pull-request -m "$(git reflog -1 | sed '\''s/^.*: //'\'')" | xargs open'
$ source ~/.zshrc (in my case)
```

### usage

```shell
# local commit
$ git push origin <branch-name> && pr
```

藉由 Hub 的 pull-request 加上自己所寫的 alias，
此 alias 會將 commit message 的第一行拿出來自動當做 PR title，
且會自動打開瀏覽器，可以再度進行檢視或做最後的修正。

## 結論

能夠利用小技巧將繁瑣重複的事情給自動化，是每個人都很樂見的，在此分享，希望能幫助到可能也需要的你。
