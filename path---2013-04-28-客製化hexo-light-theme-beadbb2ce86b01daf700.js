webpackJsonp([45350900534490],{358:function(e,t){e.exports={data:{site:{siteMetadata:{title:"kpman | code",siteUrl:"https://code.kpman.cc",disqusShortname:"kpmancode"}},markdownRemark:{id:"/Users/kpman/workspace/kpman.github.com/content/_posts/2013-04-28-客製化hexo-light-theme.md absPath of file >>> MarkdownRemark",html:'<p>分享一些目前知道的客製化 theme 技巧。<br>\n其實非常簡單，但是這些技巧如果沒有問過或是自己看過文件，<br>\n一時間也無法摸透，所以覺得應該值得把它記錄下來。</p>\n<!-- more -->\n<h3 id="一、增加-disqus-留言板"><a href="#%E4%B8%80%E3%80%81%E5%A2%9E%E5%8A%A0-disqus-%E7%95%99%E8%A8%80%E6%9D%BF" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>一、增加 Disqus 留言板</h3>\n<ul>\n<li>到<a href="http://disqus.com/">Disqus</a>申請帳號</li>\n<li>右上角的 Dashboard <code class="language-text">+Add</code> 申請一個新的帳號</li>\n<li>將網址、name、shortname 打好後，要把 <code class="language-text">shortname</code> 記住！\n_ 修改本機目錄下的 <code class="language-text">_confid.yml</code>\n_ 在 <code class="language-text">disqus_shortname</code> 貼上自己的 shortname</li>\n</ul>\n<p>完成～</p>\n<p>※ 後記：<br>\n若你在申請完 disqus 貼到自己的 blog 上面，發現出現很多不必要的連結，請到 disqus 的 dashboard 去修改。<br>\n右上方 <code class="language-text">Setting</code> -> <code class="language-text">Discovery</code> -> 將 Discovery level 拉到最右邊，如下圖<br>\n<img src="https://i.imgur.com/eeEjwka.png" alt="Discovery level"></p>\n<h3 id="二、增加右方側欄-widget"><a href="#%E4%BA%8C%E3%80%81%E5%A2%9E%E5%8A%A0%E5%8F%B3%E6%96%B9%E5%81%B4%E6%AC%84-widget" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>二、增加右方側欄 widget</h3>\n<p>在標題就已經破梗囉 XD<br>\n右方出現那些『Tag』『Tag Cloud』等欄位，其實就是修改 widget 過後得到的結果。<br>\n方法如下：</p>\n<ul>\n<li>找到 <code class="language-text">theme/light/layout/_widget</code> ，可以發現很多 <strong>ejs</strong> 檔</li>\n<li>有些是已經自訂好了，例如 <code class="language-text">category</code> <code class="language-text">recent_posts</code> 等</li>\n<li>在 <code class="language-text">theme/light/_config.yml</code> 內，修改<strong>widgets</strong>，在底下新增你要的 ejs 檔名即可～</li>\n</ul>\n<p>同樣方法可以自己寫 ejs 檔，一樣在<code class="language-text">theme/light/_config.yml</code>加上檔名就可以自訂。</p>\n<h3 id="三、增加上方自訂全域導覽列"><a href="#%E4%B8%89%E3%80%81%E5%A2%9E%E5%8A%A0%E4%B8%8A%E6%96%B9%E8%87%AA%E8%A8%82%E5%85%A8%E5%9F%9F%E5%B0%8E%E8%A6%BD%E5%88%97" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>三、增加上方自訂全域導覽列</h3>\n<p>預設為 Home、Archives 這兩個<br>\n當然得要自訂才爽 XD</p>\n<p>方法一樣很簡單如下：</p>\n<ul>\n<li>找到<code class="language-text">theme/light/_config.yml</code>裡面的第一行</li>\n<li>預設狀況應該只有 Home&#x26;Archives<br>\n<img src="https://i.imgur.com/reKRQw4.png" alt="menu"></li>\n<li>自訂自己的 menu，項目後面即為<strong>連結</strong>，可以直接使用<code class="language-text">http://google.com</code>之類的連結。</li>\n</ul>\n<h3 id="四、自訂-favicon"><a href="#%E5%9B%9B%E3%80%81%E8%87%AA%E8%A8%82-favicon" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>四、自訂 favicon</h3>\n<ul>\n<li>首先你要有一個 favicon.ico 檔或是.png 檔(這邊預設檔名為<code class="language-text">favicon.png</code>)</li>\n<li>將檔案放在 <code class="language-text">主目錄/source</code> 底下<br>\n<img src="https://i.imgur.com/Aar4ap9.png" alt="favicon path"></li>\n<li>找到 <code class="language-text">theme/light/layout/_partial/head.ejs</code>做修改</li>\n<li>在裡面加上 head.ejs 檔內確認有以下這行 code 即可擁有自己的 favicon</li>\n</ul>\n<div class="gatsby-highlight" data-language="text">\n      <pre class="language-text"><code class="language-text">&lt;link href=&quot;&lt;%- config.root %&gt;favicon.png&quot; rel=&quot;icon&quot;&gt;</code></pre>\n      </div>\n<p>以上介紹一些目前知道的自訂方法，<br>\n希望還有人可以跟我多介紹一些技巧，一起分享吧！</p>',excerpt:"分享一些目前知道的客製化 theme 技巧。 其實非常簡單，但是這些技巧如果沒有問過或是自己看過文件， 一時間也無法摸透，所以覺得應該值得把它記錄下來。 一、增加 Disqus 留言板 到 Disqus 申請帳號 右上角的 Dashboard…",fields:{slug:"/2013/04/28/客製化hexo-light-theme/"},frontmatter:{title:"客製化hexo light theme",date:"Apr 28, 2013",tags:["hexo","theme"]}}},pathContext:{slug:"/2013/04/28/客製化hexo-light-theme/"}}}});
//# sourceMappingURL=path---2013-04-28-客製化hexo-light-theme-beadbb2ce86b01daf700.js.map