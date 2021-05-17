(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3676],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return c},kt:function(){return A}});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(n),A=o,u=m["".concat(l,".").concat(A)]||m[A]||d[A]||r;return n?a.createElement(u,i(i({ref:t},c),{},{components:n})):a.createElement(u,i({ref:t},c))}));function A(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var p=2;p<r;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4643:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return i},metadata:function(){return s},toc:function(){return l},default:function(){return c}});var a=n(2122),o=n(9756),r=(n(7294),n(3905)),i={id:"getting-started",title:"Getting Started",custom_edit_url:"https://github.com/cordejs/corde/blob/master/website/versioned_docs/version-2.0.0/GettingStarted.md",slug:"/"},s={unversionedId:"getting-started",id:"version-2.x/getting-started",isDocsHomePage:!1,title:"Getting Started",description:"Install Corde using yarn:",source:"@site/versioned_docs/version-2.x/GettingStarted.mdx",sourceDirName:".",slug:"/",permalink:"/docs/2.x/",editUrl:"https://github.com/cordejs/corde/blob/master/website/versioned_docs/version-2.0.0/GettingStarted.md",version:"2.x",lastUpdatedBy:"Lucas Magalh\xe3es",lastUpdatedAt:1620951688,formattedLastUpdatedAt:"5/13/2021",frontMatter:{id:"getting-started",title:"Getting Started",custom_edit_url:"https://github.com/cordejs/corde/blob/master/website/versioned_docs/version-2.0.0/GettingStarted.md",slug:"/"},sidebar:"version-2.x/someSidebar",next:{title:"CLI",permalink:"/docs/2.x/cli"}},l=[],p={toc:l};function c(e){var t=e.components,i=(0,o.Z)(e,["components"]);return(0,r.kt)("wrapper",(0,a.Z)({},p,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Install Corde using ",(0,r.kt)("a",{parentName:"p",href:"https://yarnpkg.com/en/package/corde"},(0,r.kt)("inlineCode",{parentName:"a"},"yarn")),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add --dev corde\n")),(0,r.kt)("p",null,"Or ",(0,r.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/corde"},(0,r.kt)("inlineCode",{parentName:"a"},"npm")),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npm install --save-dev corde\n")),(0,r.kt)("p",null,"Note: Corde documentation uses ",(0,r.kt)("inlineCode",{parentName:"p"},"yarn")," commands, but ",(0,r.kt)("inlineCode",{parentName:"p"},"npm")," will also work. You can compare ",(0,r.kt)("inlineCode",{parentName:"p"},"yarn")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"npm")," commands in the ",(0,r.kt)("a",{parentName:"p",href:"https://yarnpkg.com/en/docs/migrating-from-npm#toc-cli-commands-comparison"},"yarn docs, here"),"."),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"This example uses ",(0,r.kt)("a",{parentName:"p",href:"https://discord.js.org/#/"},"Discord.js")," in the bot showcase."))),(0,r.kt)("p",null,"Let's get started writing a simple test for a bot that sends just send a simple message."),(0,r.kt)("p",null,"First, we need the ",(0,r.kt)("inlineCode",{parentName:"p"},"corde")," config file. The fastest way to do that is by calling corde CLI with the following command:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"yarn corde --init\n")),(0,r.kt)("p",null,"This command will create the ",(0,r.kt)("inlineCode",{parentName:"p"},"corde.config.json")," file in the root of your project. For more details about the ",(0,r.kt)("inlineCode",{parentName:"p"},"init")," command\ncheck the CLI documentation here."),(0,r.kt)("p",null,"This file will have the following structure:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'{\n  "cordeBotToken":  "",\n  "botTestId":  "",\n  "botToken":  "",\n  "guildId":  "",\n  "channelId":  "",\n  "botPrefix":  "+",\n  "testFiles":  ["./test"]\n}\n')),(0,r.kt)("p",null,"With the config file created, we need to put the necesary data to getting started with tests.\nCheck configurations for details about each option."),(0,r.kt)("p",null,"Okay, after have the options setted, Let's create or first test."),(0,r.kt)("p",null,"Let's supose that we have a file called ",(0,r.kt)("inlineCode",{parentName:"p"},"bot.js")," (our bot) and it's have the following structure:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript",metastring:'title="bot.js"',title:'"bot.js"'},"const Discord = require('discord.js');\nclient.on('message', async (message) => {\n  if (command === 'hello') {\n    await message.channel.send('Hello!!');\n  }\n}\n\nfunction loginBot() {\n  client.login(config.token);\n}\n\nexports.client = client;\nexports.loginBot = loginBot;\n")),(0,r.kt)("p",null,"Then let's create a ",(0,r.kt)("inlineCode",{parentName:"p"},"test")," folder in the root of your aplication and then a file called for example: ",(0,r.kt)("inlineCode",{parentName:"p"},"bot.test.js"),".\nBy doing this, we have the following structure of files"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},".\n\u251c\u2500\u2500 bot.js\n\u251c\u2500\u2500 test\n|   \u251c\u2500\u2500 bot.test.js\n\u251c\u2500\u2500 _site\n\u251c\u2500\u2500 corde.json\n")),(0,r.kt)("p",null,"This bot have just a simple task: Send a fixed message when the users send ",(0,r.kt)("strong",{parentName:"p"},"hello"),"."),(0,r.kt)("p",null,"So, we need to create a test to ensure that the bot will always send the fixed message (",(0,r.kt)("strong",{parentName:"p"},"Hello!!"),") when\nthe user call ",(0,r.kt)("strong",{parentName:"p"},"!hello")," (",(0,r.kt)("inlineCode",{parentName:"p"},"!")," is the prefix for bot. Always use a prefix for your bot)."),(0,r.kt)("p",null,"Let's implement the ",(0,r.kt)("inlineCode",{parentName:"p"},"bot.test.js"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript",metastring:'title="./tests/bot.test.js"',title:'"./tests/bot.test.js"'},'const { group, test, command, beforeStart, afterAll, expect } = require("corde");\n// You can also import const corde = require("corde"); This is a default export with all others\n// functions.\nconst { client, loginBot } = require("..");\n\nbeforeStart(() => {\n  loginBot();\n});\n\ngroup("main commands", () => {\n  test("hello command should return \'Hello!!\'", () => {\n    expect("hello").toReturn("Hello!!");\n  });\n});\n\nafterAll(() => {\n  client.destroy();\n});\n')),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"Corde does not have global function. We pretend to create then in the future."))),(0,r.kt)("p",null,"So, what we got here?"),(0,r.kt)("p",null,"The first thing that we do is call ",(0,r.kt)("inlineCode",{parentName:"p"},"beforeStart")," function. This function is mainly used to\ninit our bot connection (remember the ",(0,r.kt)("inlineCode",{parentName:"p"},"loginBot()"),"?)."),(0,r.kt)("p",null,"Then we can declare the ",(0,r.kt)("inlineCode",{parentName:"p"},"group")," function. Be clare that ",(0,r.kt)("inlineCode",{parentName:"p"},"group")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"test")," functions are optional.\nYou can use just the ",(0,r.kt)("inlineCode",{parentName:"p"},"expect")," function. That is what make the magic happens. (uuuh)"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"expect")," wait for the ",(0,r.kt)("em",{parentName:"p"},"command name"),". Pay attemtion that we do not put the bot prefix. Corde already do it\nfor us. If we put it, we will se Corde sending ",(0,r.kt)("inlineCode",{parentName:"p"},"!!hello")," to Discord (we do not want this)."),(0,r.kt)("p",null,"After that, we call ",(0,r.kt)("inlineCode",{parentName:"p"},"toReturn")," with the parameter ",(0,r.kt)("inlineCode",{parentName:"p"},"Hello!!"),". So, we are telling Corde that we expect that after sending ",(0,r.kt)("inlineCode",{parentName:"p"},"!hello"),",\nour bot should send ",(0,r.kt)("inlineCode",{parentName:"p"},"Hello!!"),". And that is it."),(0,r.kt)("p",null,"To execute this test, we just need to call:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"yarn corde\n")),(0,r.kt)("p",null,"It will run all tests and print the result like follow:"),(0,r.kt)("div",{style:{textAlign:"center"}},(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Result code",src:n(3985).Z}))),(0,r.kt)("p",null,"And that is it."))}c.isMDXComponent=!0},3985:function(e,t){"use strict";t.Z="data:image/png;base64,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"}}]);