(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{109:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"metadata",(function(){return l})),t.d(n,"toc",(function(){return b})),t.d(n,"default",(function(){return c}));var a=t(3),r=t(7),o=(t(0),t(124)),i={id:"permissions",title:"Permissions",custom_edit_url:"https://github.com/lucasgmagalhaes/corde/blob/master/docs/Permissions.mdx"},l={unversionedId:"permissions",id:"permissions",isDocsHomePage:!1,title:"Permissions",description:"Permissions are used by roles to manage users access and actions inside a guild.",source:"@site/../docs/Permissions.mdx",slug:"/permissions",permalink:"/docs/permissions",editUrl:"https://github.com/lucasgmagalhaes/corde/blob/master/docs/Permissions.mdx",version:"current",lastUpdatedBy:"Corde deployment script",lastUpdatedAt:1617134573,formattedLastUpdatedAt:"3/30/2021",sidebar:"docs",previous:{title:"Colors",permalink:"/docs/colors"}},b=[{value:"CREATE_INSTANT_INVITE",id:"create_instant_invite",children:[]},{value:"KICK_MEMBERS",id:"kick_members",children:[]},{value:"BAN_MEMBERS",id:"ban_members",children:[]},{value:"ADMINISTRATOR",id:"administrator",children:[]},{value:"MANAGE_CHANNELS",id:"manage_channels",children:[]},{value:"MANAGE_GUILD",id:"manage_guild",children:[]},{value:"ADD_REACTIONS",id:"add_reactions",children:[]},{value:"VIEW_AUDIT_LOG",id:"view_audit_log",children:[]},{value:"VIEW_CHANNEL",id:"view_channel",children:[]},{value:"SEND_MESSAGES",id:"send_messages",children:[]},{value:"SEND_TTS_MESSAGES",id:"send_tts_messages",children:[]},{value:"MANAGE_MESSAGES",id:"manage_messages",children:[]},{value:"EMBED_LINKS",id:"embed_links",children:[]},{value:"ATTACH_FILES",id:"attach_files",children:[]},{value:"READ_MESSAGE_HISTORY",id:"read_message_history",children:[]},{value:"MENTION_EVERYONE",id:"mention_everyone",children:[]},{value:"USE_EXTERNAL_EMOJIS",id:"use_external_emojis",children:[]},{value:"CONNECT",id:"connect",children:[]},{value:"SPEAK",id:"speak",children:[]},{value:"MUTE_MEMBERS",id:"mute_members",children:[]},{value:"DEAFEN_MEMBERS",id:"deafen_members",children:[]},{value:"MOVE_MEMBERS",id:"move_members",children:[]},{value:"USE_VAD",id:"use_vad",children:[]},{value:"PRIORITY_SPEAKER",id:"priority_speaker",children:[]},{value:"CHANGE_NICKNAME",id:"change_nickname",children:[]},{value:"MANAGE_NICKNAMES",id:"manage_nicknames",children:[]},{value:"MANAGE_ROLES",id:"manage_roles",children:[]},{value:"MANAGE_WEBHOOKS",id:"manage_webhooks",children:[]},{value:"MANAGE_EMOJIS",id:"manage_emojis",children:[]},{value:"STREAM",id:"stream",children:[]},{value:"VIEW_GUILD_INSIGHTS",id:"view_guild_insights",children:[]}],s={toc:b};function c(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Permissions are used by roles to manage users access and actions inside a guild."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},'import { Permission, RolePermission } from "corde";\n')),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-typescript"},'type RolePermission =\n  | "CREATE_INSTANT_INVITE"\n  | "KICK_MEMBERS"\n  | "BAN_MEMBERS"\n  | "ADMINISTRATOR"\n  | "MANAGE_CHANNELS"\n  | "MANAGE_GUILD"\n  | "ADD_REACTIONS"\n  | "VIEW_AUDIT_LOG"\n  | "PRIORITY_SPEAKER"\n  | "STREAM"\n  | "VIEW_CHANNEL"\n  | "SEND_MESSAGES"\n  | "SEND_TTS_MESSAGES"\n  | "MANAGE_MESSAGES"\n  | "EMBED_LINKS"\n  | "ATTACH_FILES"\n  | "READ_MESSAGE_HISTORY"\n  | "MENTION_EVERYONE"\n  | "USE_EXTERNAL_EMOJIS"\n  | "VIEW_GUILD_INSIGHTS"\n  | "CONNECT"\n  | "SPEAK"\n  | "MUTE_MEMBERS"\n  | "DEAFEN_MEMBERS"\n  | "MOVE_MEMBERS"\n  | "USE_VAD"\n  | "CHANGE_NICKNAME"\n  | "MANAGE_NICKNAMES"\n  | "MANAGE_ROLES"\n  | "MANAGE_WEBHOOKS"\n  | "MANAGE_EMOJIS";\n\nenum Permission {\n  CREATE_INSTANT_INVITE = 0x00000001,\n  KICK_MEMBERS = 0x00000002,\n  BAN_MEMBERS = 0x00000004,\n  ADMINISTRATOR = 0x00000008,\n  MANAGE_CHANNELS = 0x00000010,\n  MANAGE_GUILD = 0x00000020,\n  ADD_REACTIONS = 0x00000040,\n  VIEW_AUDIT_LOG = 0x00000080,\n  VIEW_CHANNEL = 0x00000400,\n  SEND_MESSAGES = 0x00000800,\n  SEND_TTS_MESSAGES = 0x00001000,\n  MANAGE_MESSAGES = 0x00002000,\n  EMBED_LINKS = 0x00004000,\n  ATTACH_FILES = 0x00008000,\n  READ_MESSAGE_HISTORY = 0x00010000,\n  MENTION_EVERYONE = 0x00020000,\n  USE_EXTERNAL_EMOJIS = 0x00040000,\n  CONNECT = 0x00100000,\n  SPEAK = 0x00200000,\n  MUTE_MEMBERS = 0x00400000,\n  DEAFEN_MEMBERS = 0x00800000,\n  MOVE_MEMBERS = 0x01000000,\n  USE_VAD = 0x02000000,\n  PRIORITY_SPEAKER = 0x00000100,\n  CHANGE_NICKNAME = 0x04000000,\n  MANAGE_NICKNAMES = 0x08000000,\n  MANAGE_ROLES = 0x10000000,\n  MANAGE_WEBHOOKS = 0x20000000,\n  MANAGE_EMOJIS = 0x40000000,\n  STREAM = 0x00000200,\n  VIEW_GUILD_INSIGHTS = 0x00080000,\n}\n')),Object(o.b)("h3",{id:"create_instant_invite"},"CREATE_INSTANT_INVITE"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00000001"))),Object(o.b)("p",null,"Allows creation of instant invites\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Text")," and ",Object(o.b)("strong",{parentName:"p"},"Voice")," Channel"),Object(o.b)("h3",{id:"kick_members"},"KICK_MEMBERS"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00000002"))),Object(o.b)("p",null,"Allows kicking members.\nIndifferent of channel"),Object(o.b)("h3",{id:"ban_members"},"BAN_MEMBERS"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: `",Object(o.b)("inlineCode",{parentName:"strong"},"0x00000004"))),Object(o.b)("p",null,"Allows banning members.\nIndifferent of channel."),Object(o.b)("h3",{id:"administrator"},"ADMINISTRATOR"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00000008"))),Object(o.b)("p",null,"Allows all permissions and bypasses channel permission overwrites.\nIndifferent of channel"),Object(o.b)("h3",{id:"manage_channels"},"MANAGE_CHANNELS"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00000010"))),Object(o.b)("p",null,"Allows management and editing of channels.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Text")," and ",Object(o.b)("strong",{parentName:"p"},"Voice")," Channel"),Object(o.b)("h3",{id:"manage_guild"},"MANAGE_GUILD"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00000020"))),Object(o.b)("p",null,"Allows management and editing of the guild.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Text")," and ",Object(o.b)("strong",{parentName:"p"},"Voice")," Channel."),Object(o.b)("h3",{id:"add_reactions"},"ADD_REACTIONS"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00000040"))),Object(o.b)("p",null,"Allows for the addition of reactions to messages.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Text")," Channel only."),Object(o.b)("h3",{id:"view_audit_log"},"VIEW_AUDIT_LOG"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00000080"))),Object(o.b)("p",null,"Allows for viewing of audit logs.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Text")," and ",Object(o.b)("strong",{parentName:"p"},"Voice")," Channel."),Object(o.b)("h3",{id:"view_channel"},"VIEW_CHANNEL"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00000400"))),Object(o.b)("p",null,"llows guild members to view a channel, which includes reading messages in text channels.\nIndifferent of channel."),Object(o.b)("h3",{id:"send_messages"},"SEND_MESSAGES"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00000800"))),Object(o.b)("p",null,"Allows for sending messages in a channel.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Text")," Channel only."),Object(o.b)("h3",{id:"send_tts_messages"},"SEND_TTS_MESSAGES"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00001000"))),Object(o.b)("p",null,"Allows for sending of /tts messages.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Text")," Channel only."),Object(o.b)("h3",{id:"manage_messages"},"MANAGE_MESSAGES"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00002000"))),Object(o.b)("p",null,"Allows for deletion of other users messages.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Text")," Channel only."),Object(o.b)("h3",{id:"embed_links"},"EMBED_LINKS"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00004000"))),Object(o.b)("p",null,"Links sent by users with this permission will be auto-embedded.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Text")," Channel only."),Object(o.b)("h3",{id:"attach_files"},"ATTACH_FILES"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00008000"))),Object(o.b)("p",null,"Allows for uploading images and files.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Text")," Channel only."),Object(o.b)("h3",{id:"read_message_history"},"READ_MESSAGE_HISTORY"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00010000"))),Object(o.b)("p",null,"Allows for reading of message history.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Text")," Channel only."),Object(o.b)("h3",{id:"mention_everyone"},"MENTION_EVERYONE"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00020000"))),Object(o.b)("p",null,"Allows for using the @everyone tag to notify all users in a channel,\nand the @here tag to notify all online users in a channel\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Text")," Channel only."),Object(o.b)("h3",{id:"use_external_emojis"},"USE_EXTERNAL_EMOJIS"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00040000"))),Object(o.b)("p",null,"Allows the usage of custom emojis from other servers.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Text")," Channel only."),Object(o.b)("h3",{id:"connect"},"CONNECT"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00100000"))),Object(o.b)("p",null,"Allows for joining of a voice channel.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Voice")," Channel only."),Object(o.b)("h3",{id:"speak"},"SPEAK"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00200000"))),Object(o.b)("p",null,"Allows for speaking in a voice channel.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Voice")," Channel only."),Object(o.b)("h3",{id:"mute_members"},"MUTE_MEMBERS"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00400000"))),Object(o.b)("p",null,"Allows for muting members in a voice channel.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Voice")," Channel only."),Object(o.b)("h3",{id:"deafen_members"},"DEAFEN_MEMBERS"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00800000"))),Object(o.b)("p",null,"Allows for deafening of members in a voice channel.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Voice")," Channel only."),Object(o.b)("h3",{id:"move_members"},"MOVE_MEMBERS"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x01000000"))),Object(o.b)("p",null,"Allows for moving of members between voice channels.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Voice")," Channel only."),Object(o.b)("h3",{id:"use_vad"},"USE_VAD"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x02000000"))),Object(o.b)("p",null,"Allows for using voice-activity-detection in a voice channel.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Voice")," Channel only."),Object(o.b)("h3",{id:"priority_speaker"},"PRIORITY_SPEAKER"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00000100"))),Object(o.b)("p",null,"Allows for using priority speaker in a voice channel.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Voice")," Channel only."),Object(o.b)("h3",{id:"change_nickname"},"CHANGE_NICKNAME"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x04000000"))),Object(o.b)("p",null,"Allows for modification of own nickname.\nIndifferent of channel."),Object(o.b)("h3",{id:"manage_nicknames"},"MANAGE_NICKNAMES"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x08000000"))),Object(o.b)("p",null,"Allows for modification of other users nicknames.\nIndifferent of channel."),Object(o.b)("h3",{id:"manage_roles"},"MANAGE_ROLES"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x10000000"))),Object(o.b)("p",null,"Allows management and editing of roles.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Text")," and ",Object(o.b)("strong",{parentName:"p"},"Voice")," Channel."),Object(o.b)("h3",{id:"manage_webhooks"},"MANAGE_WEBHOOKS"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x20000000"))),Object(o.b)("p",null,"Allows management and editing of webhooks.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Text")," and ",Object(o.b)("strong",{parentName:"p"},"Voice")," Channel."),Object(o.b)("h3",{id:"manage_emojis"},"MANAGE_EMOJIS"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x40000000"))),Object(o.b)("p",null,"Allows management and editing of emojis.\nIndifferent of channel."),Object(o.b)("h3",{id:"stream"},"STREAM"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00000200"))),Object(o.b)("p",null,"Allows the user to go live.\nUsed in ",Object(o.b)("strong",{parentName:"p"},"Voice")," Channel only."),Object(o.b)("h3",{id:"view_guild_insights"},"VIEW_GUILD_INSIGHTS"),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Code: ",Object(o.b)("inlineCode",{parentName:"strong"},"0x00080000"))),Object(o.b)("p",null,"Allows for viewing guild insights.\nIndifferent of channel."))}c.isMDXComponent=!0},124:function(e,n,t){"use strict";t.d(n,"a",(function(){return d})),t.d(n,"b",(function(){return m}));var a=t(0),r=t.n(a);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function b(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=r.a.createContext({}),c=function(e){var n=r.a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},d=function(e){var n=c(e.components);return r.a.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},O=r.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,s=b(e,["components","mdxType","originalType","parentName"]),d=c(t),O=a,m=d["".concat(i,".").concat(O)]||d[O]||p[O]||o;return t?r.a.createElement(m,l(l({ref:n},s),{},{components:t})):r.a.createElement(m,l({ref:n},s))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=O;var l={};for(var b in n)hasOwnProperty.call(n,b)&&(l[b]=n[b]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var s=2;s<o;s++)i[s]=t[s];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,t)}O.displayName="MDXCreateElement"}}]);