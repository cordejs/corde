(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[446],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return d},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},d=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),u=s(n),m=o,k=u["".concat(l,".").concat(m)]||u[m]||c[m]||a;return n?r.createElement(k,i(i({ref:t},d),{},{components:n})):r.createElement(k,i({ref:t},d))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=u;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p.mdxType="string"==typeof e?e:o,i[1]=p;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1737:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return i},metadata:function(){return p},toc:function(){return l},default:function(){return d}});var r=n(2122),o=n(9756),a=(n(7294),n(3905)),i={id:"configurations",title:"Configuring Corde",custom_edit_url:"https://github.com/cordejs/corde/blob/master/website/docs/Configuration.md"},p={unversionedId:"configurations",id:"version-2.x/configurations",isDocsHomePage:!1,title:"Configuring Corde",description:"Corde's configuration can be defined through a corde.js|json|ts file. This file must be in the root of your application,",source:"@site/versioned_docs/version-2.x/Configuration.mdx",sourceDirName:".",slug:"/configurations",permalink:"/docs/2.x/configurations",editUrl:"https://github.com/cordejs/corde/blob/master/website/docs/Configuration.md",version:"2.x",lastUpdatedBy:"Lucas Magalh\xe3es",lastUpdatedAt:1620951688,formattedLastUpdatedAt:"5/13/2021",frontMatter:{id:"configurations",title:"Configuring Corde",custom_edit_url:"https://github.com/cordejs/corde/blob/master/website/docs/Configuration.md"},sidebar:"version-2.x/someSidebar",previous:{title:"CLI",permalink:"/docs/2.x/cli"},next:{title:"Creating a Discord bot",permalink:"/docs/2.x/creatingdiscordbot"}},l=[{value:"Configuration Options",id:"configuration-options",children:[{value:"<code>cordeBotToken</code>",id:"cordebottoken",children:[]},{value:"<code>botTestId</code>",id:"bottestid",children:[]},{value:"<code>botToken</code>",id:"bottoken",children:[]},{value:"<code>guildId</code>",id:"guildid",children:[]},{value:"<code>channelId</code>",id:"channelid",children:[]},{value:"<code>botPrefix</code>",id:"botprefix",children:[]},{value:"<code>testFiles</code>",id:"testfiles",children:[]},{value:"<code>timeOut</code>",id:"timeout",children:[]}]}],s={toc:l};function d(e){var t=e.components,n=(0,o.Z)(e,["components"]);return(0,a.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Corde's configuration can be defined through a ",(0,a.kt)("inlineCode",{parentName:"p"},"corde.js|json|ts")," file. This file must be in the root of your application,\nor you can declare a custom path for it with the cli option ",(0,a.kt)("a",{parentName:"p",href:"/docs/2.x/cli#--config"},"--config"),"."),(0,a.kt)("p",null,"This is the full config file for Corde:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},'{\n    "cordeBotToken":  "YOUR_TESTING_BOT_TOKEN_HERE",\n    "botTestId":  "YOUR_TESTING_BOT_ID_HERE",\n    "botToken":  "YOUR_BOT_TOKEN_HERE",\n    "guildId":  "THE_GUID_OF_BOT_HERE",\n    "channelId":  "CHANNELS_ID_HERE",\n    "botPrefix":  "+",\n    "testFiles":  ["./test"],\n    "timeOut": 1000\n}\n')),(0,a.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"both ",(0,a.kt)("inlineCode",{parentName:"p"},"cordeBotToken")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"botToken")," can be found in ",(0,a.kt)("a",{parentName:"p",href:"https://discord.com/developers/applications"},"Discord Developers portal")))),(0,a.kt)("h2",{id:"configuration-options"},"Configuration Options"),(0,a.kt)("h3",{id:"cordebottoken"},(0,a.kt)("inlineCode",{parentName:"h3"},"cordeBotToken")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Required: ",(0,a.kt)("inlineCode",{parentName:"strong"},"true")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Type: ",(0,a.kt)("inlineCode",{parentName:"strong"},"string")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Example: ",(0,a.kt)("inlineCode",{parentName:"strong"},"YaA4MDMiOTY2O4I2MjAwODMy.X2iRwg.Rf3-TqLExWuPQjxnVaDCGv9V7cB"))),(0,a.kt)("p",null,"The bot token that Corde will use to simulate a user."),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"bottestid"},(0,a.kt)("inlineCode",{parentName:"h3"},"botTestId")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Required: ",(0,a.kt)("inlineCode",{parentName:"strong"},"true")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Type: ",(0,a.kt)("inlineCode",{parentName:"strong"},"string")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Example: ",(0,a.kt)("inlineCode",{parentName:"strong"},"514212632960122287894"))),(0,a.kt)("p",null,"Your bot's id."),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"bottoken"},(0,a.kt)("inlineCode",{parentName:"h3"},"botToken")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Required: ",(0,a.kt)("inlineCode",{parentName:"strong"},"true")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Type: ",(0,a.kt)("inlineCode",{parentName:"strong"},"string")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Example: ",(0,a.kt)("inlineCode",{parentName:"strong"},"YaA4MDMiOTY2O4I2MjAwODMy.X2iRwg.Rf3-TqLExWuPQjxnVaDCGv9V7cB"))),(0,a.kt)("p",null,"Your bot's Token."),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"guildid"},(0,a.kt)("inlineCode",{parentName:"h3"},"guildId")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Required: ",(0,a.kt)("inlineCode",{parentName:"strong"},"true")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Type: ",(0,a.kt)("inlineCode",{parentName:"strong"},"string")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Example: ",(0,a.kt)("inlineCode",{parentName:"strong"},"514212632960122287894"))),(0,a.kt)("p",null,"The id of the ",(0,a.kt)("inlineCode",{parentName:"p"},"guild")," where both bots are."),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"channelid"},(0,a.kt)("inlineCode",{parentName:"h3"},"channelId")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Required: ",(0,a.kt)("inlineCode",{parentName:"strong"},"true")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Type: ",(0,a.kt)("inlineCode",{parentName:"strong"},"string")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Example: ",(0,a.kt)("inlineCode",{parentName:"strong"},"514212632960122287894"))),(0,a.kt)("p",null,"The id of the ",(0,a.kt)("inlineCode",{parentName:"p"},"channel")," where both bots are."),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"botprefix"},(0,a.kt)("inlineCode",{parentName:"h3"},"botPrefix")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Required: ",(0,a.kt)("inlineCode",{parentName:"strong"},"true")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Type: ",(0,a.kt)("inlineCode",{parentName:"strong"},"string")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Example: ",(0,a.kt)("inlineCode",{parentName:"strong"},"!"))),(0,a.kt)("p",null,"Prefix for call your bot."),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"testfiles"},(0,a.kt)("inlineCode",{parentName:"h3"},"testFiles")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Required: ",(0,a.kt)("inlineCode",{parentName:"strong"},"true")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Type: ",(0,a.kt)("inlineCode",{parentName:"strong"},"string")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Example: ",(0,a.kt)("inlineCode",{parentName:"strong"},"[./tests]"))),(0,a.kt)("p",null,"Array with the path of test folders | files."),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"timeout"},(0,a.kt)("inlineCode",{parentName:"h3"},"timeOut")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Required: ",(0,a.kt)("inlineCode",{parentName:"strong"},"false")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Type: ",(0,a.kt)("inlineCode",{parentName:"strong"},"number")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Example: ",(0,a.kt)("inlineCode",{parentName:"strong"},"1000")),(0,a.kt)("br",{parentName:"p"}),"\n",(0,a.kt)("strong",{parentName:"p"},"Default: ",(0,a.kt)("inlineCode",{parentName:"strong"},"5000"))),(0,a.kt)("p",null,"Timeout for each test. Value mesuared in miliseconds."))}d.isMDXComponent=!0}}]);