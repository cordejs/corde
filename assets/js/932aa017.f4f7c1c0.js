(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{124:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return A}));var a=n(0),o=n.n(a);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=o.a.createContext({}),b=function(e){var t=o.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=b(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},m=o.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=b(n),m=a,A=p["".concat(i,".").concat(m)]||p[m]||d[m]||r;return n?o.a.createElement(A,c(c({ref:t},s),{},{components:n})):o.a.createElement(A,c({ref:t},s))}));function A(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var s=2;s<r;s++)i[s]=n[s];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},130:function(e,t,n){"use strict";n.r(t),t.default="data:image/png;base64,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"},98:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return b}));var a=n(3),o=n(7),r=(n(0),n(124)),i={id:"getting-started",title:"Getting Started",custom_edit_url:"https://github.com/lucasgmagalhaes/corde/blob/master/website/versioned_docs/version-1.0.0/GettingStarted.md",slug:"/"},c={unversionedId:"getting-started",id:"version-1.x/getting-started",isDocsHomePage:!1,title:"Getting Started",description:"Install Corde using yarn:",source:"@site/versioned_docs/version-1.x/GettingStarted.mdx",slug:"/",permalink:"/docs/1.x/",editUrl:"https://github.com/lucasgmagalhaes/corde/blob/master/website/versioned_docs/version-1.0.0/GettingStarted.md",version:"1.x",lastUpdatedBy:"Lucas Gomes",lastUpdatedAt:1616675602,formattedLastUpdatedAt:"3/25/2021",sidebar:"version-1.x/sidebar",next:{title:"CLI",permalink:"/docs/1.x/cli"}},l=[],s={toc:l};function b(e){var t=e.components,i=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},s,i,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Install Corde using ",Object(r.b)("a",{parentName:"p",href:"https://yarnpkg.com/en/package/corde"},Object(r.b)("inlineCode",{parentName:"a"},"yarn")),":"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"yarn add --dev corde\n")),Object(r.b)("p",null,"Or ",Object(r.b)("a",{parentName:"p",href:"https://www.npmjs.com/package/corde"},Object(r.b)("inlineCode",{parentName:"a"},"npm")),":"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"npm install --save-dev corde\n")),Object(r.b)("p",null,"Note: Corde documentation uses ",Object(r.b)("inlineCode",{parentName:"p"},"yarn")," commands, but ",Object(r.b)("inlineCode",{parentName:"p"},"npm")," will also work. You can compare ",Object(r.b)("inlineCode",{parentName:"p"},"yarn")," and ",Object(r.b)("inlineCode",{parentName:"p"},"npm")," commands in the ",Object(r.b)("a",{parentName:"p",href:"https://yarnpkg.com/en/docs/migrating-from-npm#toc-cli-commands-comparison"},"yarn docs, here"),"."),Object(r.b)("div",{className:"admonition admonition-info alert alert--info"},Object(r.b)("div",{parentName:"div",className:"admonition-heading"},Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",{parentName:"h5",className:"admonition-icon"},Object(r.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(r.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(r.b)("div",{parentName:"div",className:"admonition-content"},Object(r.b)("p",{parentName:"div"},"This example uses ",Object(r.b)("a",{parentName:"p",href:"https://discord.js.org/#/"},"Discord.js")," in the bot showcase."))),Object(r.b)("p",null,"Let's get started writing a simple test for a bot that sends just send a simple message."),Object(r.b)("p",null,"First, we need the ",Object(r.b)("inlineCode",{parentName:"p"},"corde")," config file. The fastest way to do that is by calling corde CLI with the following command:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"yarn corde --init\n")),Object(r.b)("p",null,"This command will create the ",Object(r.b)("inlineCode",{parentName:"p"},"corde.json")," file in the root of your project. For more details about the ",Object(r.b)("inlineCode",{parentName:"p"},"init")," command\ncheck the CLI documentation here."),Object(r.b)("p",null,"This file will have the following structure:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-javascript"},'{\n  "cordeTestToken":  "",\n  "botTestId":  "",\n  "botTestToken":  "",\n  "guildId":  "",\n  "channelId":  "",\n  "botPrefix":  "+",\n  "testFiles":  ["./test"]\n}\n')),Object(r.b)("p",null,"With the config file created, we need to put the necesary data to getting started with tests.\nCheck configurations for details about each option."),Object(r.b)("p",null,"Okay, after have the options setted, Let's create or first test."),Object(r.b)("p",null,"Let's supose that we have a file called ",Object(r.b)("inlineCode",{parentName:"p"},"bot.js")," (our bot) and it's have the following structure:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-javascript",metastring:'title="bot.js"',title:'"bot.js"'},"const Discord = require('discord.js');\nclient.on('message', async (message) => {\n  if (command === 'hello') {\n    await message.channel.send('Hello!!');\n  }\n}\n\nfunction loginBot() {\n  client.login(config.token);\n}\n\nexports.client = client;\nexports.loginBot = loginBot;\n")),Object(r.b)("p",null,"Then let's create a ",Object(r.b)("inlineCode",{parentName:"p"},"test")," folder in the root of your aplication and then a file called for example: ",Object(r.b)("inlineCode",{parentName:"p"},"bot.test.js"),".\nBy doing this, we have the following structure of files"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre"},".\n\u251c\u2500\u2500 bot.js\n\u251c\u2500\u2500 test\n|   \u251c\u2500\u2500 bot.test.js\n\u251c\u2500\u2500 _site\n\u251c\u2500\u2500 corde.json\n")),Object(r.b)("p",null,"This bot have just a simple task: Send a fixed message when the users send ",Object(r.b)("strong",{parentName:"p"},"hello"),"."),Object(r.b)("p",null,"So, we need to create a test to ensure that the bot will always send the fixed message (",Object(r.b)("strong",{parentName:"p"},"Hello!!"),") when\nthe user call ",Object(r.b)("strong",{parentName:"p"},"!hello")," (",Object(r.b)("inlineCode",{parentName:"p"},"!")," is the prefix for bot. Always use a prefix for your bot)."),Object(r.b)("p",null,"Let's implement the ",Object(r.b)("inlineCode",{parentName:"p"},"bot.test.js"),":"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-javascript",metastring:'title="./tests/bot.test.js"',title:'"./tests/bot.test.js"'},'const { group, test, command, beforeStart, afterAll } = require("corde");\nconst { client, loginBot } = require("..");\n\nbeforeStart(() => {\n  loginBot();\n});\n\ngroup("main commands", () => {\n  test("hello command should return \'Hello!!\'", () => {\n    command("hello").mustReturn("Hello!!");\n  });\n});\n\nafterAll(() => {\n  client.destroy();\n});\n')),Object(r.b)("div",{className:"admonition admonition-info alert alert--info"},Object(r.b)("div",{parentName:"div",className:"admonition-heading"},Object(r.b)("h5",{parentName:"div"},Object(r.b)("span",{parentName:"h5",className:"admonition-icon"},Object(r.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(r.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(r.b)("div",{parentName:"div",className:"admonition-content"},Object(r.b)("p",{parentName:"div"},"Corde does not have global function. We pretend to create then in the future."))),Object(r.b)("p",null,"So, what we got here?"),Object(r.b)("p",null,"The first thing that we do is call ",Object(r.b)("inlineCode",{parentName:"p"},"beforeStart")," function. This function is mainly used to\ninit our bot connection (remember the ",Object(r.b)("inlineCode",{parentName:"p"},"loginBot()"),"?)."),Object(r.b)("p",null,"Then we can declare the ",Object(r.b)("inlineCode",{parentName:"p"},"group")," function. Be clare that ",Object(r.b)("inlineCode",{parentName:"p"},"group")," and ",Object(r.b)("inlineCode",{parentName:"p"},"test")," functions are optional.\nYou can use just the ",Object(r.b)("inlineCode",{parentName:"p"},"command")," function. That is what make the magic happens. (uuuh)"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"command")," wait for the ",Object(r.b)("em",{parentName:"p"},"command name"),". Pay attemtion that we do not put the bot prefix. Corde already do it\nfor us. If we put it, we will se Corde sending ",Object(r.b)("inlineCode",{parentName:"p"},"!!hello")," to Discord (we do not want this)."),Object(r.b)("p",null,"After that, we call ",Object(r.b)("inlineCode",{parentName:"p"},"mustReturn")," with the parameter ",Object(r.b)("inlineCode",{parentName:"p"},"Hello!!"),". So, we are telling Corde that we expect that after sending ",Object(r.b)("inlineCode",{parentName:"p"},"!hello"),",\nour bot should send ",Object(r.b)("inlineCode",{parentName:"p"},"Hello!!"),". And that is it."),Object(r.b)("p",null,"To execute this test, we just need to call:"),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-bash"},"yarn corde\n")),Object(r.b)("p",null,"It will run all tests and print the result like follow:"),Object(r.b)("div",{style:{textAlign:"center"}},Object(r.b)("p",null,Object(r.b)("img",{alt:"Result code",src:n(130).default}))),Object(r.b)("p",null,"And that is it."))}b.isMDXComponent=!0}}]);