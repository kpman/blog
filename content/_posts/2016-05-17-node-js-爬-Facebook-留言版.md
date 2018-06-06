---
title: node.js 爬 Facebook 留言版
date: 2016-05-17 21:54:04
tags:
- nodejs
- api
- facebook
- parser
---

聽到網路爬蟲，有很多專案都是建立在 python 上面，在文字處理分析上， python 有很強大的套件可以使用，然而隨著 node.js 的發展越來越廣泛，也有許多因應的套件產生，今天將會介紹利用 FB 提供的 Graph API 來爬留言版。

![Facebook Comment Plugin](https://i.imgur.com/2Qckxbc.jpg)

<!-- more -->

本文並非會有教學範例檔，僅會針對 FB 提供的 Graph API 做簡單的範例。
此處的範例會利用 ES6 的 `template strings` 語法。

## 1. 了解 FB 留言版架構

最近 FB 推出了可以回覆他人的功能，因此留言有可能會有巢狀情形，但可以觀察到的是，目前 FB 的機制就是至多一層的回覆。因此簡單的架構如下：

```
comment 1
  - reply_comment 1
  - reply_comment 2
comment 2
  - reply_comment 1
  _ reply_comment 2
...
...
```

## 2. 確定該網址的留言數

```javascript
`http://graph.facebook.com/?id=${URL}`;
```

```javascript
GET 'http://graph.facebook.com/?id=http://www.google.com'
{
  id: "http://www.google.com",
  shares: 31205003,
  comments: 1323
}
```

因此可以知道 www.google.com 在 FB Graph API 有 1323 筆留言數。

## 3. 利用 Graph API 拿第一層留言

Graph API 在留言版其實是公開，只要給定 URL 就可以拿到該網址的留言，
這邊要注意的是需要確定該 URL 是 OG:URL 的參數給 FB 才拿的到。

```javascript
`http://graph.facebook.com/comments?id=${URL}&limit=${comments}&filter=stream`;
```

底下是 return sample json

```javascript
{
  created_time: "2012-04-16T12:45:03+0000",
  from: {
    name: "Sunil Maheshwari",
    id: "100000525493028"
  },
  message: "hello",
  can_remove: false,
  like_count: 0,
  user_likes: false,
  id: "381702034999_21746175"
}
```

若此處沒有加上 `&limit` 的話，會拿到比較少的數量。
加上 `&filter=stream` 參數，則會一併將回覆狀態的留言拿回來。
因為在此記錄部落格使用，在實作上並不會加上 `&filter=stream` 這個參數，以免拿第二層的時候重複還需要做額外處理。

## 4. 拿 Graph API 第二層留言

在拿第一層的時候，因為是 public API 狀態，因此不需要 token，且網址利用 http 就可以。
但在拿第二層留言，就需要 https + access_token 狀態。

最簡單取得 access_token 方式是到 [FB graph explorer](https://developers.facebook.com/tools/explorer/) 申請 access_token 來實作。

接著需要串接的 API 格式為：

```javascript
`https://graph.facebook.com/${id}/comments?access_token=${token}`;
```

上述 id 就是第一層拿回來的 json 格式內的 id，
token 則是 access_token。

在實作上因為無法透過第一層的 API 得到是否有無第二層留言，因此若要完整的拿取全部的留言，則需要將全部的 id 跑過一次才可以得到完整的結果。

## reference

- [Using Facebook Graph API To Crawl Comments from a Facebook Comments Plugin](http://www.oneminuteinfo.com/2015/06/use-api-to-get-fb-comments-plugin-posts.html)
- [FB graph explorer](https://developers.facebook.com/tools/explorer/)
