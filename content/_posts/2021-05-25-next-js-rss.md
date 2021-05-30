---
title: 為 Next.js 靜態網站產生 RSS feed
date: 2021-05-25 10:32:28
tags:
  - next.js
  - ssg
  - rss
---

Next.js 是 React 生態圈快速崛起的一套框架，本篇文章介紹在 Next.js 當中產生 RSS feed 的方法。

![Next.js with RSS](https://i.imgur.com/cTahD2b.png)

<!-- more -->

## 名詞簡介

以下有些名詞我選擇直接用縮寫，因此在這邊先做介紹：

- CSR: Client Side Rendering
- SSR: Server Side Rendering
- SSG: Static Site Generation

## 起源

有鑑於此部落格太久沒有更新，上一篇文章是[從 Hexo 搬到 Gatsby](/2018/06/08/%E5%BE%9E-Hexo-%E5%88%B0-Gatsby/)，這兩套框架都是非常優異，也都有持續維護的狀態。

這幾年更加吸引大眾目光的是 Next.js，其背後團隊 Vercel 來頭不小。目前的 CEO [rauchg](https://github.com/rauchg) 是 socket.io 作者，看[貢獻度](https://github.com/socketio/socket.io/graphs/contributors)目前也是排在第一位。夾帶這些名氣，以及 Next.js 推出的解決方案，不論是 CSR, SSR, 和 SSG 都可以處理。

因此，就選擇將本部落格再度搬移到 Next.js 了。XD

## 架構研究

Next.js 沒有原生支援 RSS feed 產生，所以必須要根據 Next.js 的架構去研究，在哪一個時間點產生出 RSS feed 會是最可行的作法。

在研究了 Next.js 的流程後，有幾種作法：

### SSR 解決方案

如果是 SSR 處理方式，尤其是直接將 project host 在 vercel 上面。可以直接在 `pages/rss.js` 裡面，利用 Next.js 的架構，直接在這支 JS 檔裡面處理回傳 RSS feed 的動作。

要注意的是 RSS 需要回傳 XML 的格式，因此  在 `pages/rss.js` 的 getServerSideProps 就必須要指定回傳的 header。詳細的實作可以參考[這篇文章](https://dev.to/kendalmintcode/create-a-next-js-rss-feed-for-your-static-website-210p)。

然而因為我的架構是擁有自己的 markdown file，不論用哪些框架只是幫我把這些 markdown file 轉成 HTML render 出來即可，因此 SSR 就不是我選擇的方向，也就往 SSG 解決方案去思考了。

### SSG 解決方案

SSG 就是將所有的檔案都在 build time 轉成 static file，所以自然沒有 server 端可以幫忙處理 response XML 的動作，因此就必須思考將 RSS feed 直接 build 成一個獨立的 public 檔案，讓想要訂閱 RSS feed 的人可以利用該連結直接訂閱。

在程式端具體的實作流程有許多種，以下舉我認為比較可行的兩種：

1. 寫一個獨立的 npm script，例如: `"postbuild": "node lib/rss.js"`，基於 npm script 的定義，只要在 build script 跑完後，就去直接執行這個 npm script 在 `public`（Next.js 定義的公開資料夾路徑）資料夾產生對應的 RSS file。
2. 寫一個獨立的 JS function，在 Next.js build 階段確定有執行這個 function 去產生 RSS file 到 `public` 資料夾即可。

這兩種真正執行的 function 內容幾乎一樣，就是包裝起來執行的方式和時間點不一樣而已。

我自己是選擇第二種，在 Next.js build 階段就有去執行產生 RSS file，可以在開發的時候比較好 debug。

## 實作

這次我選擇 [feed](https://github.com/jpmonette/feed) 這個套件來幫忙產生 RSS feed。

#### 一、安裝 feed 套件

```shell
yarn add feed
```

#### 二、創建一個 JS 檔，產生一個 `Feed` instance。

```javascript
import { Feed } from 'feed';

import config from '../config';

export const generateRSS = async () => {
  const feed = new Feed({
    title: config.title,
    description: config.subtitle,
    id: config.siteUrl,
    link: config.siteUrl,
    image: `${config.siteUrl}/image.png`,
    favicon: `${config.siteUrl}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${
      config.title
    }. All rights reserved.`,
    feedLinks: {
      atom: `${config.siteUrl}/atom.xml`,
    },
    author: {
      name: 'Daniel Tseng',
      email: 's92f002@gmail.com',
      link: config.siteUrl,
    },
  });
```

更多參數可以參考 [官方 Example](https://github.com/jpmonette/feed#example)

#### 三、把所有文章放進去 Feed instance

```javascript
import { Feed } from 'feed';

import config from '../config';

import markdownToHtml from './markdown';
import { getAllPosts } from './blog';

export const generateRSS = async () => {
  const feed = new Feed({
    // 略，請見上方
  });

  const posts = getAllPosts();

  await Promise.all(
    posts.map(async (post) => {
      const validURI = `${config.siteUrl}${encodeURI(post.slug)}`;

      feed.addItem({
        id: validURI,
        link: validURI,
        title: post.frontmatter.title,
        description: post.excerpt,
        date: new Date(post.date),
        image: post.ogImageUrl,
        content: await markdownToHtml(post.content || ''),
        author: [
          {
            name: 'Daniel Tseng',
            email: 's92f002@gmail.com',
            link: config.siteUrl,
          },
        ],
      });
    })
  );
};
```

#### 四、輸出至 public 資料夾

在輸出的時候，需要注意的是，那些會訂閱 RSS 的 service 會 default 找哪些路徑？

靜態檔案解決方案，根據參考大家常放的檔案路徑，做了以下歸納：

- `/atom.xml`
- `/rss.xml`
- `/rss/atom.xml`

因此我選擇這樣做：

```javascript
import fs from 'fs';

import { Feed } from 'feed';

import config from '../config';

import { getAllPosts } from './blog';

export const generateRSS = async () => {
  const feed = new Feed({
    // 略
  });

  // 略

  const invalidCharInXMLSpecRegexp =
    // eslint-disable-next-line no-control-regex
    /((?:[\0-\x08\x0B\f\x0E-\x1F\uFFFD\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g;

  fs.writeFileSync(
    './public/rss.xml',
    feed.atom1().replace(invalidCharInXMLSpecRegexp, '')
  );
  fs.writeFileSync(
    './public/atom.xml',
    feed.atom1().replace(invalidCharInXMLSpecRegexp, '')
  );
};
```

至於為什麼選擇 Atom 1.0 格式而不是 RSS 2.0 格式，
主要是因為 RSS 2.0 有比較多的限制，相對之下，比較晚誕生的 Atom 1.0 格式是主流，（這點如果有講錯歡迎指教，我有看到我會馬上修正）。

因此，這邊直接選擇只支援 Atom 1.0 格式。

#### 五、加入 Next.js 流程

在 Next.js 的流程中，有幾個基本但是重要的 function：

- getStaticProps (Static Generation)
- getStaticPaths (Static Generation)
- getServerSideProps (Server-side Rendering)

在官方的文件也清楚的表明了：

> `getStaticProps` (Static Generation): Fetch data at build time.

也就是在 build time 的時候，Next.js 一定會執行這個 function。我們便可以把產生 RSS 的動作放進這個 function 裡面，如下：

```javascript
// pages/index.js
import { generateRSS } from '../utils/rss';

export async function getStaticProps() {
  const posts = getAllPosts();

  const postPromises = posts.map(async (post) => ({
    ...post,
    html: await markdownToHtml(post.content || ''),
  }));

  await generateRSS(); // 主要是這一行

  return {
    props: {
      posts: await Promise.all(postPromises),
    },
  };
}
```

如此一來就可以在開發階段看到 RSS feed 產生了。

## 結論

搬移到 Next.js 之後，寫起來的體驗，更接近原生開發 React 的感覺，想要什麼功能自己實作，彈性很大很自由，而不像是 Gatsby 整套就是為了 SSG 而生的解決方案。在 Gatsby 遇到很多問題都有現成的套件，裝上去馬上就可以用。

然而有了彈性就代表需要選擇，為什麼選擇 A 而不是選擇 B，每一步都需要思考。坦白說實作這短短幾行 code 花不了多少時間，但是背後的選擇我想才是關鍵，藉由這篇文章記錄思考的過程。

## Reference

- [Generate RSS feeds for your static Next.js blog](https://phiilu.com/generate-rss-feeds-for-your-static-next-js-blog)
- [CSR, SSR, and SSG on NextJS](https://www.jackherrington.com/csr-ssr-and-ssg-on-nextjs/)
- [我實作的 PR](https://github.com/kpman/blog/pull/8/files)
