---
title: GraphQL colocated pattern
date: 2021-12-26 00:20:15
tags:
  - graphql
  - fragment
  - codegen
  - typescript
---

本篇文章介紹 GraphQL fragment 與 React component 對應的 colocated 整理方法，也會提到如何利用 codegen 讓 fragment 自動產生出該 component 對應 TypeScript 的 type。

![GraphQL + React](https://i.imgur.com/4Cchl8a.jpg)

<!-- more -->

## GraphQL Fragment

對於 GraphQL 熟悉的朋友，對於 fragment 應該不陌生。如果不太熟的朋友，讓我們一起研究下去。

Fragment 最大的特點就是 reusable，只要在一個檔案定義好對應的 fields，其他會用到的地方就可以 import 該檔案拿去用。有了 fragment 的幫助，我們可以在 Query 和 Mutation 共用同樣的部分，不僅好管理，也不用重複的撰寫那些 fields。

基於這樣的特性，fragment 本身就帶有點 component 的概念，因為 component 也是在一個檔案先寫好，其他需要用到的地方再 import 去用。

這邊直接引用官方的 sample code 稍微感受一下：

```ts
{
  leftComparison: hero(episode: EMPIRE) {
    ...comparisonFields
  }
  rightComparison: hero(episode: JEDI) {
    ...comparisonFields
  }
}

fragment comparisonFields on Character {
  name
  appearsIn
  friends {
    name
  }
}
```

有興趣的人可以到[官方網站](https://graphql.org/learn/queries/#fragments)了解更多。

## React component and GraphQL

Component 化是現代前端框架、套件都不陌生的管理方式，一個個 component 不僅在 codebase 好管理，也可以針對單一檔案做測試，可以說是優點不少。

當使用 React component 搭配 GraphQL 時候，在每一個 component 需要資料去 render 畫面時，就可以善用 GraphQL 的特性，將底下的子 component 需要用到的 fields 都收集組裝出一個大的 query，再由上層的 component 去取得後端資料後，往下利用 props 傳遞讓子 component 去做 render 的動作。

- Get Data

![collect-fragments-to-query](https://i.imgur.com/kXkfEqY.png)

- Passing Props

![passing-data-to-props](https://i.imgur.com/HmSRVMN.png)

## GraphQL colocated fragments

根據 [Apollo 文件](https://www.apollographql.com/docs/react/data/fragments/#creating-colocated-fragments)，colocated fragments 是指該 fragment 是針對某特定 component 而生的，因此最好的管理方式就是將該 fragment 直接擺在此 component 附近，這個動作就叫做 colocated。

你可以選擇直接將 fragment 寫在該 component 的 tsx 檔裡面（Apollo 官方也是如此），而我個人習慣的管理方式是，創一個同名且帶有 `fragments.ts` 的後綴檔案跟 component 放在一起。如下面表示：

```
- components
  - post.tsx
  - post.fragments.ts
```

這樣的管理方式有幾個好處，

1. fragment 檔案就在該 component 同層位置，管理上面非常方便
2. 如果 component 需要的資料有更動，只要修改該 fragment 檔案，就可以依賴上層 component 一次性的 query 就拿回需要的資料。

然而這樣的方式會有一些不方便的地方，就是在 component 的 props 的 type 定義，每次如果有修正相關的 fragment fields，都需要再次手動去改動該 component 的 type，會有點惱人。

基於都是利用型別推斷的方式，GraphQL Code Generator 就可以來協助我們自動化的做到這件事情。

## GraphQL Code Generator

接下來會用官方範例的縮寫 `codegen` 來稱呼這套 CLI。

上面段落提到，今天如果改了一個 colocated fragment 的 fields，而每次都要手動去修改 component props 的 type 會有點麻煩，而 codegen 就可以自動化做到這件事情。

我們要用到的 plugin 就是這套 [near-operation-file-preset](https://www.graphql-code-generator.com/plugins/near-operation-file-preset)。

以下直接分享我習慣的設定，與官方範例略有不同，各位可以參考然後調整適合自己的版本。

```yml
overwrite: true
schema: 'schema.graphql'
generates:
  types/graphql.ts:
    plugins:
      - typescript
    config:
      namingConvention: keep
  ./:
    plugins:
      - typescript-operations
      - typescript-react-apollo
    preset: near-operation-file
    presetConfig:
      baseTypesPath: types/graphql.ts
      extension: .generated.tsx
    config:
      namingConvention: keep
    documents:
      - '**/*.fragments.ts'
      - '**/*.query.ts'
      - '**/*.mutation.ts'
      - '**/*.subscription.ts'
```

這邊簡單說明一下原理，codegen 第一件事需要拿我們 GraphQL 的 `schema.graphql` 檔去產生出對應的 type 檔，這邊我們指定 build 出來的檔案放在 `types/graphql.ts`。

接著 codegen 會根據這個 baseTypesPath 搭配相關的 plugin，找到 documents 所列的檔案，自動的去產生相對應的 generated 檔。然而因為我們有用到 typescript-react-apollo 的 plugin，因此 apollo react 的 useQuery 和 useMutation 它都會自動的 build 出來，我們就可以直接拿來使用，而不用自己再重新寫一次，非常方便。

今天假設我們有一個 `Comment.tsx` 的 component，且有定義好 `Comment.fragments.ts` 和 `Comment.mutation.ts` 檔案，當跑完 codegen 後的用法會類似以下：

```ts
import { CommentFragment } from './Comment.fragments.generated';
import { useDeleteCommentMutation } from './Comment.mutation.generated';

type Props = {
  comment: CommentFragment;
};

const Comment = ({ comment }: Props) => {
  const [deleteComment] = useDeleteCommentMutation({
    onError,
    onCompleted,
  });

  // you can use `comment` or call `deleteComment` to mutate the data
};

export default Comment;
```

上層有用到這個 `<Comment />` 的地方，只要確定有將 Comment.fragments 正確的 import 到，然後跟後端拿到資料後，利用 `<Comment comment={comment} />` 往下傳遞就可以善用到 GraphQL colocated 的特性。

## 結論

React Component 與 GraphQL 的搭配寫起來很舒服，在這個 TypeScript 盛行的年代，搭配 GraphQL SDL 的特性，利用 colocated pattern 來管理對應的 fragments，再加上 codegen 的自動化幫忙，讓開發體驗更上一層樓。

內文若有錯誤，還請不吝讓我知道，我有看到的話會馬上更正。如果你也有相關的 GraphQL 管理經驗，也歡迎一同分享交流。

## Reference

- [GraphQL official doc - Fragments](https://graphql.org/learn/queries/#fragments)
- [Apollo Docs - Fragments](https://www.apollographql.com/docs/react/data/fragments/#creating-colocated-fragments)
- [GraphQL Code Generator](https://www.graphql-code-generator.com/)
