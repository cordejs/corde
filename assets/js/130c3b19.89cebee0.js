(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{124:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var a=n(0),o=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=o.a.createContext({}),b=function(e){var t=o.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=b(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,r=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),p=b(n),d=a,m=p["".concat(r,".").concat(d)]||p[d]||u[d]||i;return n?o.a.createElement(m,l(l({ref:t},s),{},{components:n})):o.a.createElement(m,l({ref:t},s))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,r=new Array(i);r[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,r[1]=l;for(var s=2;s<i;s++)r[s]=n[s];return o.a.createElement.apply(null,r)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},138:function(e,t,n){"use strict";n.r(t),t.default="data:image/png;base64,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"},74:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return b}));var a=n(3),o=n(7),i=(n(0),n(124)),r={id:"hooks",title:"Hooks",custom_edit_url:"https://github.com/lucasgmagalhaes/corde/blob/master/docs/Hooks.mdx"},l={unversionedId:"hooks",id:"hooks",isDocsHomePage:!1,title:"Hooks",description:"Hooks are functions triggered in different ocassions in corde tests executions.",source:"@site/../docs/Hooks.mdx",slug:"/hooks",permalink:"/docs/hooks",editUrl:"https://github.com/lucasgmagalhaes/corde/blob/master/docs/Hooks.mdx",version:"current",lastUpdatedBy:"Corde deployment script",lastUpdatedAt:1617134573,formattedLastUpdatedAt:"3/30/2021",sidebar:"docs",previous:{title:"Expect",permalink:"/docs/expect"},next:{title:"Clausures",permalink:"/docs/clausures"}},c=[{value:"<code>afterAll(function, timeout?)</code>",id:"afterallfunction-timeout",children:[]},{value:"<code>afterEach(function, timeout?)</code>",id:"aftereachfunction-timeout",children:[]},{value:"<code>beforeEach(function, timeout?)</code>",id:"beforeeachfunction-timeout",children:[]},{value:"<code>beforeStart(function, timeout?)</code>",id:"beforestartfunction-timeout",children:[]}],s={toc:c};function b(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"Hooks are functions triggered in different ocassions in corde tests executions.\nEach hook has a timeout parameter wich ",Object(i.b)("strong",{parentName:"p"},"overrides")," the timeout provided in config.\nAll hooks are available bellow:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/hooks#afterallfunction-timeout"},Object(i.b)("inlineCode",{parentName:"a"},"afterAll(function, timeout)"))),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/hooks#aftereachfunction-timeout"},Object(i.b)("inlineCode",{parentName:"a"},"afterEach(function, timeout)"))),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/hooks#beforeeachfunction-timeout"},Object(i.b)("inlineCode",{parentName:"a"},"beforeEach(function, timeout)"))),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"/docs/hooks#beforestartfunction-timeout"},Object(i.b)("inlineCode",{parentName:"a"},"beforeStart(functionm timeout)")))),Object(i.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(i.b)("div",{parentName:"div",className:"admonition-heading"},Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",{parentName:"h5",className:"admonition-icon"},Object(i.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(i.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(i.b)("div",{parentName:"div",className:"admonition-content"},Object(i.b)("p",{parentName:"div"},"These functions are valid for all tests executions. If you add some of then inside a ",Object(i.b)("inlineCode",{parentName:"p"},"group"),"\nor a ",Object(i.b)("inlineCode",{parentName:"p"},"test"),", corde will not add then to that scope. This feature will be released in the next version of corde."),Object(i.b)("p",{parentName:"div"},"This means that:"),Object(i.b)("pre",{parentName:"div"},Object(i.b)("code",{parentName:"pre",className:"language-typescript"},'group("test groups", () => {\n  beforeEeach(() => {\n    console.log("I\'ll back");\n  });\n\n  test("test 1", () => {\n    expect("hi").toReturn("hello");\n  });\n});\n\ntest("test 2", () => {\n  expect("hi").toReturn("hello");\n});\n')),Object(i.b)("p",{parentName:"div"},"Will work like:"),Object(i.b)("pre",{parentName:"div"},Object(i.b)("code",{parentName:"pre",className:"language-typescript"},"// I'll back\n// test 1\n// I'll back\n// test 2\n")))),Object(i.b)("h3",{id:"afterallfunction-timeout"},Object(i.b)("inlineCode",{parentName:"h3"},"afterAll(function, timeout?)")),Object(i.b)("p",null,"Use ",Object(i.b)("inlineCode",{parentName:"p"},"afterAll")," to execute something that you want to be executed after all tests run."),Object(i.b)("p",null,"Optionally, you can provide a ",Object(i.b)("inlineCode",{parentName:"p"},"timeout")," (in milliseconds) for specifying how long to wait before aborting.\n",Object(i.b)("em",{parentName:"p"},"Note: The default timeout is 5 seconds.")),Object(i.b)("p",null,"A good example of something to be executed after all tests is the logout of your testing\nbot."),Object(i.b)("p",null,"I.E:"),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-typescript"},"afterAll(() => {\n  bot.destroy();\n});\n")),Object(i.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(i.b)("div",{parentName:"div",className:"admonition-heading"},Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",{parentName:"h5",className:"admonition-icon"},Object(i.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(i.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(i.b)("div",{parentName:"div",className:"admonition-content"},Object(i.b)("p",{parentName:"div"},"As corde self make it's bot login, it's make their logout also. So there is no need\nto worry about it."))),Object(i.b)("h3",{id:"aftereachfunction-timeout"},Object(i.b)("inlineCode",{parentName:"h3"},"afterEach(function, timeout?)")),Object(i.b)("p",null,"Use ",Object(i.b)("inlineCode",{parentName:"p"},"afterEach")," to execute something after execution of a test case."),Object(i.b)("p",null,"Optionally, you can provide a ",Object(i.b)("inlineCode",{parentName:"p"},"timeout")," (in milliseconds) for specifying how long to wait before aborting.\n",Object(i.b)("em",{parentName:"p"},"Note: The default timeout is 5 seconds.")),Object(i.b)("p",null,"As metioned above, this function is not included to clausures like ",Object(i.b)("inlineCode",{parentName:"p"},"group")," and ",Object(i.b)("inlineCode",{parentName:"p"},"test"),",\nif you call it, this function will be included for all tests (yet)."),Object(i.b)("p",null,"A exemplification of usage of ",Object(i.b)("inlineCode",{parentName:"p"},"afterEach")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-typescript"},'afterEach(() => {\n  console.log("I\'m your father");\n});\n\ntest("test 1", () => {\n  expect("hi").toReturn("hello");\n});\n\ntest("test 2", () => {\n  expect("hi").toReturn("hello");\n});\n\n// Work like:\n// Run test 1\n// I\'m your father\n// Run test 2\n// I\'m your father\n// Done\n')),Object(i.b)("h3",{id:"beforeeachfunction-timeout"},Object(i.b)("inlineCode",{parentName:"h3"},"beforeEach(function, timeout?)")),Object(i.b)("p",null,"Use ",Object(i.b)("inlineCode",{parentName:"p"},"beforeEach")," to execute something before operation of each test case."),Object(i.b)("p",null,"Optionally, you can provide a ",Object(i.b)("inlineCode",{parentName:"p"},"timeout")," (in milliseconds) for specifying how long to wait before aborting.\n",Object(i.b)("em",{parentName:"p"},"Note: The default timeout is 5 seconds.")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-typescript"},'beforeEach(() => {\n  console.log("One ring to rule them all");\n});\n\ntest("test 1", () => {\n  expect("hi").toReturn("hello");\n});\n\ntest("test 2", () => {\n  expect("hi").toReturn("hello");\n});\n\n// Work like:\n// One ring to rule them all\n// Run test 1\n// One ring to rule them all\n// Run test 2\n// Done\n')),Object(i.b)("h3",{id:"beforestartfunction-timeout"},Object(i.b)("inlineCode",{parentName:"h3"},"beforeStart(function, timeout?)")),Object(i.b)("p",null,"Use ",Object(i.b)("inlineCode",{parentName:"p"},"beforeStart")," to execute some function before all tests begin."),Object(i.b)("p",null,"Optionally, you can provide a ",Object(i.b)("inlineCode",{parentName:"p"},"timeout")," (in milliseconds) for specifying how long to wait before aborting.\n",Object(i.b)("em",{parentName:"p"},"Note: The default timeout is 5 seconds.")),Object(i.b)("p",null,"This can be, for instance, the login of your bot."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-typescript"},"beforeStart(async () => {\n  await bot.login();\n});\n")),Object(i.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(i.b)("div",{parentName:"div",className:"admonition-heading"},Object(i.b)("h5",{parentName:"div"},Object(i.b)("span",{parentName:"h5",className:"admonition-icon"},Object(i.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(i.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),Object(i.b)("div",{parentName:"div",className:"admonition-content"},Object(i.b)("p",{parentName:"div"},"In corde tests lifecycle, all these functions are executed ",Object(i.b)("strong",{parentName:"p"},"after")," corde login, this\nbot. Functions to be executed before it will be created future versions of corde."))),Object(i.b)("p",null,"The image bellow ilustrate the operation of each hook:"),Object(i.b)("div",{style:{textAlign:"center"}},Object(i.b)("p",null,Object(i.b)("img",{alt:"image",src:n(138).default}))))}b.isMDXComponent=!0}}]);