---
title: 從 Hexo 到 Gatsby
date: 2018-06-08 20:55:19
tags:
  - hexo
  - gatsby
---

本篇文章記錄了我將部落格從 Hexo 轉換到 Gatsby 的過程，以及這過程當中相關設定的經驗分享。

![From Hexo to Gatsby](https://i.imgur.com/yGnymMq.png)

<!-- more -->

本篇文章並非詳細介紹 Gatsby，如想了解更多，請至[官方網站](https://www.gatsbyjs.org/)。

## 緣由

Hexo 是一套歷史已久的 static site generator，此部落格原本就是利用 Hexo 架起來的。然而，後起之秀 Gatsby 採用著不同的資料流處理方式，加上優異的架構，最重要的是該團隊獲得資金並成立公司的[新聞](https://twitter.com/gatsbyjs/status/999684072501792768)一出，我對於這個專案後續維護更加看好，就決定搬家到 Gatsby。

## 搬移過程

此處列出一些在搬部落格過程中需要注意的點，並作大綱的列點，可以選擇自己喜歡的部份研究。

- [Markdown 整理](#markdown-整理)
- [URL 一致性](#url-一致性)
- [Page 設計](#page-設計)
- [Favicon](#favicon)
- [Gatsby plugin & useful packages](#gatsby-plugins--useful-packages)

## Markdown 整理

Hexo 原生就提供產生文章的 CLI API，因此使用上蠻方便，只要一個指令就可以自動產生 Markdown 檔。而 Gatsby 就得要自行選擇文檔的類型，因為當初選用 Hexo 就是它可以利用 Markdown 寫部落格，所以轉換到 Gatsby 自然就沿用 Markdown 了。

### gatsby-source-filesystem

在部落格架構設計上，我把所有原始檔放在 `./content/_posts` 底下。但想讓 Gatsby 知道文件位置，就得利用 `gatsby-source-filesystem` 這個 plugin，如下設定：

```js
// gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'posts', // Name this source
      path: path.resolve('./content/_posts'),
    },
  },
];
```

ps. Gatsby 的範例都利用 ` ``(backtick) ` 包住字串，但我還是習慣使用 single quote。

### gatsby-transformer-remark

把原始 file 讀進來之後，Gatsby 也提供了專為 Markdown 檔處理的 plugin，名為 `gatsby-transformer-remark`。  
經過這個 plugin 處理過的資料，會被轉成 Gatsby 架構下的 `node`，此 node 的 type 為 `MarkdownRemark`，該 node 會增加許多有用資訊，例如：`html`, `headings`, `excerpt` 等等，省下許多 parse Markdown 檔的功夫。

```js
// gatsby-config.js
plugins: ['gatsby-transformer-remark'];
```

後續還會介紹更多這個 plugin 的設定方式，也可直接參考 [repo](https://github.com/kpman/kpman.github.com/blob/0f02b98eaa23e92f794adf4a14bfda4c1ec3be0d/gatsby-config.js#L24-L42)

## URL 一致性

當初利用 Hexo 建立出來的 URL 為類似 `/2017/07/03/利用-Hub-來自動發-GitHub-PR/` 這樣的 pattern，
為了不 breaking 既有 URL，我選擇將新版的 URL 設計和當初一樣。

此時就得讓 Gatsby 讀懂日期，這邊當初猶豫是要從 Markdown 裡面拿或者是從檔名拿日期。
將日期寫在檔名有多一個好處，就是可以利用檔名來做排序，基於這樣就決定將原本的所有 Markdown 檔都加上日期，修改過後的檔名為 `2017-07-03-利用-Hub-來自動發-GitHub-PR.md`。

### onCreateNode

Gatsby 提供 `onCreateNode` 此 API 操作，原理上是在 Gatsby 要 createNode 時，在該 node 上面加上一些我們用的到的資訊。
我在此處便是利用 RegExp 將檔名給 parse 出來，並在 node 上面新增一個 field 叫做 `slug`，也就是 URL 上面除了 domain 後面的 [`pathname`](https://nodejs.org/api/url.html) 部分。

```js
// gatsby-node.js
const BLOG_POST_FILENAME_REGEX = /([0-9]+)-([0-9]+)-([0-9]+)-(.+)\.md$/;

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;

  // 確定是 Markdown 檔再做操作
  if (node.internal.type === 'MarkdownRemark') {
    const { relativePath } = getNode(node.parent);

    const match = BLOG_POST_FILENAME_REGEX.exec(relativePath);
    const year = match[1];
    const month = match[2];
    const day = match[3];
    const filename = match[4];

    // 組出我們要的 slug pattern
    const slug = `/${year}/${month}/${day}/${filename}/`;

    // 在該 node 上面多增加一個欄位，未來可以 Query
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};
```

有了前述的 node 資料之後，我們在 Gatsby 創造這些 page，讓使用者在進入 `/YYYY/MM/DD/<blog-title>/` 這樣的 URL 可以順利取得文章內容。

### createPages

Gatsby 提供的另一個 API 叫做 `createPages`，此 API 就是你所有的 page 都需要透過該 API 來創造，如此一來 Gatsby 才可以正確的回傳該頁面。

```js
// gatsby-node.js
exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const allMarkdown = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug # 此處的 slug 就是上述 onCreateNode 時候加上去的
            }
          }
        }
      }
    }
  `);

  allMarkdown.data.allMarkdownRemark.edges.map(({ node }) => {
    const { slug } = node.fields;

    createPage({
      path: slug, // 告訴 Gatsby 這個 URL path
      // 這邊選用的 component，就可以在 pageQuery 使用 context 所傳進去的 slug
      component: path.resolve('./src/templates/post.js'),
      layout: 'index',
      context: {
        // Data passed to context is available in page queries as GraphQL variables.
        slug,
      },
    });
  });
};
```

-

## Page 設計

在 Gatsby 的架構內，每一個需要不同 URL 的頁面都需要自己創造一個 page，例如：首頁、每一篇文章、archive 頁面等等，底下列出此部落格需要的 URL：

- `/`: index page
- `/YYYY/MM/DD/<blog-title>/`: article page
- `/archives`: archives page
- `/tags/<tag>`: tags page

### index page

因為 Gatsby 底下會自動的把 `./src/pages/*.js` 自動 create page，所以我們在設計首頁的時候，就是去修改 `./src/pages/index.js` 此頁即可。

該頁最主要就是把所有的文章時間、title 等資料拿出來，GraphQL 的 query 如下：

```js
// src/pages/index.js
export const pageQuery = graphql`
  query BlogIndexQuery {
    # query 依照 date 排序
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          html # 需要把 html 拿回來 render
          frontmatter {
            title
            # 可以在此處就把 date format 成我們要的格式
            date(formatString: "MMM DD, YYYY")
            tags
          }
        }
      }
    }
  }
`;
```

上述的 `html` 也可以用 `excerpt` 去拿，但我選擇拿 html 再選擇我要的顯示在首頁部分內容。

### archives page

該頁面與 index page 大同小異，該 page 位於 `./src/pages/archives.js`，唯一不同的是因為 archives page 有一種整理的效果，因此我們只要拿 title、date、tags 即可。

### tags page

tags page 顧名思義就是每篇文章我會給一些 tag，寫在 Markdown 最上方，所以可以利用套件幫我們產生的 frontmatter 拿到每一篇的 tags 資料，但要怎樣擁有不同頁的 tag 呢？

此時就必須在 createPage 的時候就將所有的 tag 拿出來，然後產生每一個 tag 的 page。

```js
//
exports.createPages = async ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  const allMarkdown = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `);

  allMarkdown.data.allMarkdownRemark.edges.map(({ node }) => {
    const { tags } = node.frontmatter;

    tags.map((tag) => {
      createPage({
        path: `/tags/${tag}`, // 此處創造 tag URL
        component: path.resolve('./src/templates/tags.js'), // 選擇用 tags template
        layout: 'index',
        context: {
          tag, // 傳進去讓 tags template 的 pageQuery 可以使用該 tag 去 query
        },
      });
    });
  });
};
```

創造完每一頁 tag 的 page 之後，我們來看看 tags template 應該怎樣寫。

```js
// ./src/templates/tags.js
export const pageQuery = graphql`
  query PostByTag($tag: String!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          html
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMM DD, YYYY")
            tags
          }
        }
      }
    }
  }
`;
```

最關鍵的就是 Query 的參數了，利用 createPage 傳進來的 `$tag`，我們在 `allMarkdownRemark` 的參數就利用到了 `filter`、`sort` 等使用情境，拿回所有擁有這個 tag 的文章資料再去做 render。

## Favicon

當初設定 Favicon 也遇到一些問題，本來以為放在 `/static/favicon.ico` 就可以讓瀏覽器抓到，可是怎麼嘗試都不成功。
後來請教同事 [@jigsawye](https://github.com/jigsawye) 才發現原來是要利用 loader，也就是直接將 favicon file 給 `import` 到環境內，再利用 `react-helmet` 做操作。

```js
// ./src/layouts/Head.js
import Helmet from 'react-helmet';

import Favicon from '../assets/favicon.png';

const Head = ({ data }) => (
  <Helmet>
    <link rel="icon" type="image/png" sizes="30x30" href={Favicon} />
  </Helmet>
);

export default Head;
```

-

## Gatsby plugins & useful packages

推薦幾個在架設這個部落格用到的 Gatsby plugin

- `gatsby-plugin-react-next`: v1 還是內建 react v15，所以需要裝這套
- `gatsby-plugin-react-helmet`: 操作該頁面的 HTML meta 資料
- `gatsby-remark-prismjs`: 可以將 Markdown 內的程式碼做上色
- `gatsby-remark-autolink-headers`: 可以讓 Markdown 的 Heading 都自動加上 id，瀏覽更方便
- `gatsby-plugin-sitemap`：自動產生 Sitemap
- `gatsby-plugin-feed`：自動產生 RSS feed，production 才會輸出，輸出檔名為 `/rss.xml`
- `gatsby-plugin-google-analytics`: 可以載入 GA 使用
- `disqus-react`: Disqus 官方的 React 套件

## 結論

這次的搬家花了不少心力，其中最多的時間其實是在重新架構整個 layout，而搬家過後因為 client side render，整體速度提昇不少，也對於 Gatsby 的生態圈蠻看好，希望可以持續發展。

雖然現在市面上有很多撰寫文章的平台（例如：Medium），不過這種一手打造的部落格，擁有自己 content 的感覺，或許就是工程師的浪漫吧。
