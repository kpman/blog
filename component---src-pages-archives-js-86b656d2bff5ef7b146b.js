webpackJsonp([0x61134f733b1f],{147:function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.pageQuery=void 0;var s=r(2),u=n(s),f=r(33),i=n(f),c=r(34),p=n(c),d=r(35),h=n(d),m=function(e){function t(){return o(this,t),a(this,e.apply(this,arguments))}return l(t,e),t.prototype.render=function(){return this.props.errors&&this.props.errors.length?(this.props.errors.forEach(function(e){var t=e.message;console.error("ArchivePage render errr: "+t)}),u.default.createElement("h1",null,"Errors found: Check the console for details")):u.default.createElement(s.Fragment,null,this.props.data.allMarkdownRemark.edges.map(function(e){var t=e.node;return u.default.createElement("article",{id:t.frontmatter.title,className:"post",key:t.frontmatter.title},u.default.createElement(i.default,{slug:t.fields.slug,date:t.frontmatter.date}),u.default.createElement(p.default,{slug:t.fields.slug,title:t.frontmatter.title}),u.default.createElement(h.default,{tags:t.frontmatter.tags}))}))},t}(s.Component);t.default=m;t.pageQuery="** extracted graphql fragment **"}});
//# sourceMappingURL=component---src-pages-archives-js-86b656d2bff5ef7b146b.js.map