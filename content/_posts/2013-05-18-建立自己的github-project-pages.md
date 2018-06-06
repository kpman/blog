---
title: 建立自己的GitHub Project Pages
date: 2013-05-18 00:04:03
tags:
- github
---

在 GitHub 使用上，我算是初新者，有疑問才有進步。每當看到有人把好玩的東西放到 GitHub 上面變成靜態頁面，都會很想知道他是怎樣辦到的。結果不難，就是利用 GitHub Pages 來做到。

<!-- more -->

## GitHub Pages 介紹

當你要有一個自己的 GitHub Pages，其實分成兩項。

1.  repo 的名字為`yourname.github.com`，則會產生的 page 路徑為 `yourname.github.io`。[本部落格](http://kpman.github.io)是建立在 github 上面，就是利用這一個 GitHub Pages 模式去建立，可以參考[hexo 架 blog 初體驗](http://code.kpman.cc/2013/04/26/hexo%E6%9E%B6blog%E5%88%9D%E9%AB%94%E9%A9%97/)、[建立自己 blog 的 subdomain](http://code.kpman.cc/2013/04/27/%E5%BB%BA%E7%AB%8B%E8%87%AA%E5%B7%B1blog%E7%9A%84subdomain/)這兩篇文章。
2.  repo 的名字為`repo-name`，則會產生的 page 路徑為 `yourname.github.io/repo-name`，這邊的 repo name 就不像第一種模式，沒有固定名稱。

## GitHub Pages 建立

在每一個新的 repo 下面，正常的情況都是在 mater 這一個 branch。分享一下我自己的作法。

1.  GitHub 頁面上建立一個新的 repo，這邊我取名為 first-repo。

![create new repo](https://i.imgur.com/6mFqQlc.png 'new repo')

2.  從本機端 clone 下來，參照自己的路徑，我的 repo 則是在 command line 底下打

```
git clone git@github.com:kpman/first-repo.git
```

3.  移到該資料夾

```
cd first-repo
```

4.  將 branch 移到`gh-pages`，這步驟很重要，Github Pages 就是看這一個 branch 去決定頁面的。

```
git branch gh-pages
git checkout gh-pages
```

或者

```
git checkout --orphan gh-pages //建立一個沒有parent的branch，並移到該branch上
```

5.  將編輯好的檔案 push 上去。

```
git add .
git commit
git push origin gh-pages
```

6.  完成！

## 路徑差異

[http://github.com/kpman/liteAccordion](http://github.com/kpman/liteAccordion)這樣代表連回 GitHub 的 code 頁面  
[http://kpman.github.io/liteAccordion](http://kpman.github.io/liteAccordion)因為新增到`gh-pages`這一個 branch，所以可以看到靜態的 html 展示頁面。

其他範例  
[two.js](http://jonobr1.github.io/two.js/)  
[textillate](http://jschr.github.io/textillate/)

### _reference_

1.  [官方文件](https://help.github.com/articles/creating-project-pages-manually)
2.  [Getting started with GitHub Pages](http://xlson.com/2010/11/09/getting-started-with-github-pages.html)
3.  [Create a new branch with git and manage branches](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches)
