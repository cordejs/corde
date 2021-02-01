(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{105:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return u}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=a.a.createContext({}),l=function(e){var t=a.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=l(e.components);return a.a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},O=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,b=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),s=l(n),O=r,u=s["".concat(b,".").concat(O)]||s[O]||d[O]||o;return n?a.a.createElement(u,i(i({ref:t},p),{},{components:n})):a.a.createElement(u,i({ref:t},p))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,b=new Array(o);b[0]=O;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:r,b[1]=i;for(var p=2;p<o;p++)b[p]=n[p];return a.a.createElement.apply(null,b)}return a.a.createElement.apply(null,n)}O.displayName="MDXCreateElement"},78:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return b})),n.d(t,"metadata",(function(){return i})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return l}));var r=n(3),a=n(7),o=(n(0),n(105)),b={id:"configurations",title:"Configuring Corde",custom_edit_url:"https://github.com/lucasgmagalhaes/corde/blob/master/website/docs/Configuration.md"},i={unversionedId:"configurations",id:"configurations",isDocsHomePage:!1,title:"Configuring Corde",description:"Corde's configuration can be defined through a corde.js|json|ts file. This file must be in the root of your application,",source:"@site/docs\\Configuration.mdx",slug:"/configurations",permalink:"/docs/configurations",editUrl:"https://github.com/lucasgmagalhaes/corde/blob/master/website/docs/Configuration.md",version:"current",lastUpdatedBy:"Lucas Gomes",lastUpdatedAt:1612057489,sidebar:"someSidebar",previous:{title:"CLI",permalink:"/docs/cli"},next:{title:"Creating a Discord bot",permalink:"/docs/creatingdiscordbot"}},c=[{value:"Configuration Options",id:"configuration-options",children:[{value:"<code>cordeTestToken</code>",id:"cordetesttoken",children:[]},{value:"<code>botTestId</code>",id:"bottestid",children:[]},{value:"<code>botTestToken</code>",id:"bottesttoken",children:[]},{value:"<code>guildId</code>",id:"guildid",children:[]},{value:"<code>channelId</code>",id:"channelid",children:[]},{value:"<code>botPrefix</code>",id:"botprefix",children:[]},{value:"<code>testFiles</code>",id:"testfiles",children:[]},{value:"<code>timeOut</code>",id:"timeout",children:[]}]}],p={toc:c};function l(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Corde's configuration can be defined through a ",Object(o.b)("inlineCode",{parentName:"p"},"corde.js|json|ts")," file. This file must be in the root of your application,\nor you can declare a custom path for it with the cli option ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"/docs/cli#--config"}),"--config"),"."),Object(o.b)("p",null,"This is the full config file for Corde:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-javascript"}),'{\n    "cordeTestToken":  "YOUR_TESTING_BOT_TOKEN_HERE",\n    "botTestId":  "YOUR_TESTING_BOT_ID_HERE",\n    "botTestToken":  "YOUR_BOT_TOKEN_HERE",\n    "guildId":  "THE_GUID_OF_BOT_HERE",\n    "channelId":  "CHANNELS_ID_HERE",\n    "botPrefix":  "+",\n    "testFiles":  ["./test"],\n    "timeOut": 1000\n}\n')),Object(o.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(o.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(r.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(r.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(o.b)("path",Object(r.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(o.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"both ",Object(o.b)("inlineCode",{parentName:"p"},"cordeTestToken")," and ",Object(o.b)("inlineCode",{parentName:"p"},"botTestToken")," can be found in ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://discord.com/developers/applications"}),"Discord Developers portal")))),Object(o.b)("h2",{id:"configuration-options"},"Configuration Options"),Object(o.b)("h3",{id:"cordetesttoken"},Object(o.b)("inlineCode",{parentName:"h3"},"cordeTestToken")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Required: ",Object(o.b)("inlineCode",{parentName:"strong"},"true")),Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("strong",{parentName:"p"},"Type: ",Object(o.b)("inlineCode",{parentName:"strong"},"string")),Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("strong",{parentName:"p"},"Example: ",Object(o.b)("inlineCode",{parentName:"strong"},"YaA4MDMiOTY2O4I2MjAwODMy.X2iRwg.Rf3-TqLExWuPQjxnVaDCGv9V7cB"))),Object(o.b)("p",null,"The bot token that Corde will use to simulate a user."),Object(o.b)("hr",null),Object(o.b)("h3",{id:"bottestid"},Object(o.b)("inlineCode",{parentName:"h3"},"botTestId")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Required: ",Object(o.b)("inlineCode",{parentName:"strong"},"true")),Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("strong",{parentName:"p"},"Type: ",Object(o.b)("inlineCode",{parentName:"strong"},"string")),Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("strong",{parentName:"p"},"Example: ",Object(o.b)("inlineCode",{parentName:"strong"},"514212632960122287894"))),Object(o.b)("p",null,"Your bot's id."),Object(o.b)("hr",null),Object(o.b)("h3",{id:"bottesttoken"},Object(o.b)("inlineCode",{parentName:"h3"},"botTestToken")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Required: ",Object(o.b)("inlineCode",{parentName:"strong"},"true")),Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("strong",{parentName:"p"},"Type: ",Object(o.b)("inlineCode",{parentName:"strong"},"string")),Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("strong",{parentName:"p"},"Example: ",Object(o.b)("inlineCode",{parentName:"strong"},"YaA4MDMiOTY2O4I2MjAwODMy.X2iRwg.Rf3-TqLExWuPQjxnVaDCGv9V7cB"))),Object(o.b)("p",null,"Your bot's Token."),Object(o.b)("hr",null),Object(o.b)("h3",{id:"guildid"},Object(o.b)("inlineCode",{parentName:"h3"},"guildId")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Required: ",Object(o.b)("inlineCode",{parentName:"strong"},"true")),Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("strong",{parentName:"p"},"Type: ",Object(o.b)("inlineCode",{parentName:"strong"},"string")),Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("strong",{parentName:"p"},"Example: ",Object(o.b)("inlineCode",{parentName:"strong"},"514212632960122287894"))),Object(o.b)("p",null,"The id of the ",Object(o.b)("inlineCode",{parentName:"p"},"guild")," where both bots are."),Object(o.b)("hr",null),Object(o.b)("h3",{id:"channelid"},Object(o.b)("inlineCode",{parentName:"h3"},"channelId")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Required: ",Object(o.b)("inlineCode",{parentName:"strong"},"true")),Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("strong",{parentName:"p"},"Type: ",Object(o.b)("inlineCode",{parentName:"strong"},"string")),Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("strong",{parentName:"p"},"Example: ",Object(o.b)("inlineCode",{parentName:"strong"},"514212632960122287894"))),Object(o.b)("p",null,"The id of the ",Object(o.b)("inlineCode",{parentName:"p"},"channel")," where both bots are."),Object(o.b)("hr",null),Object(o.b)("h3",{id:"botprefix"},Object(o.b)("inlineCode",{parentName:"h3"},"botPrefix")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Required: ",Object(o.b)("inlineCode",{parentName:"strong"},"true")),Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("strong",{parentName:"p"},"Type: ",Object(o.b)("inlineCode",{parentName:"strong"},"string")),Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("strong",{parentName:"p"},"Example: ",Object(o.b)("inlineCode",{parentName:"strong"},"!"))),Object(o.b)("p",null,"Prefix for call your bot."),Object(o.b)("hr",null),Object(o.b)("h3",{id:"testfiles"},Object(o.b)("inlineCode",{parentName:"h3"},"testFiles")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Required: ",Object(o.b)("inlineCode",{parentName:"strong"},"true")),Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("strong",{parentName:"p"},"Type: ",Object(o.b)("inlineCode",{parentName:"strong"},"string")),Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("strong",{parentName:"p"},"Example: ",Object(o.b)("inlineCode",{parentName:"strong"},"[./tests]"))),Object(o.b)("p",null,"Array with the path of test folders | files."),Object(o.b)("hr",null),Object(o.b)("h3",{id:"timeout"},Object(o.b)("inlineCode",{parentName:"h3"},"timeOut")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Required: ",Object(o.b)("inlineCode",{parentName:"strong"},"false")),Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("strong",{parentName:"p"},"Type: ",Object(o.b)("inlineCode",{parentName:"strong"},"number")),Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("strong",{parentName:"p"},"Example: ",Object(o.b)("inlineCode",{parentName:"strong"},"1000")),Object(o.b)("br",{parentName:"p"}),"\n",Object(o.b)("strong",{parentName:"p"},"Default: ",Object(o.b)("inlineCode",{parentName:"strong"},"5000"))),Object(o.b)("p",null,"Timeout for each test. Value mesuared in miliseconds."))}l.isMDXComponent=!0}}]);