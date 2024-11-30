import{c,a as r,b as g,w as b,d as m,r as C,o as a,e as y,f as x,F as A,g as E,t as p,n as N,h as O,v as L,i as M,j as P,k as D,l as Q,m as T}from"./vue-vendor-Cu4Fr_3q.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function i(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(t){if(t.ep)return;t.ep=!0;const s=i(t);fetch(t.href,s)}})();const V=(n,e)=>{const i=n.__vccOpts||n;for(const[l,t]of e)i[l]=t;return i},B={},F={class:"app-container"};function I(n,e){const i=C("router-link"),l=C("router-view");return a(),c("div",F,[e[5]||(e[5]=r("h1",null,"JAVAEE复习",-1)),r("nav",null,[g(i,{to:"/choice"},{default:b(()=>e[0]||(e[0]=[m("选择题")])),_:1}),e[3]||(e[3]=m(" | ")),g(i,{to:"/short-answer"},{default:b(()=>e[1]||(e[1]=[m("简答题")])),_:1}),e[4]||(e[4]=m(" | ")),g(i,{to:"/programming"},{default:b(()=>e[2]||(e[2]=[m("程序题")])),_:1})]),g(l)])}const S=V(B,[["render",I],["__scopeId","data-v-d095f102"]]);function H(n){const e=[];let i=null,l=null;const t=n.split(`
`).map(s=>s.trim());for(let s=0;s<t.length;s++){const u=t[s];if(!u||u==="---")continue;if(u.startsWith("第")&&u.includes("章")){i={id:`chapter${e.length+1}`,title:u,questions:[]},e.push(i);continue}const v=u.match(/^(\d+)\. (.+)/);if(v&&i){l={id:v[1],content:v[2],options:{},answer:"",isVisible:!1,showAnswer:!1},i.questions.push(l);continue}const w=u.match(/^([A-D])\. (.+)/);if(w&&l){l.options[w[1]]=w[2];continue}const o=u.match(/^答案：\s*([A-D])/);o&&l&&(l.answer=o[1])}return e}async function J(){try{const n=await fetch("/JAVA-EE/data/questions.txt");if(!n.ok)throw console.error("HTTP Error:",n.status,n.statusText),new Error(`Failed to load questions: ${n.status}`);const e=await n.text();if(!e)throw console.error("Empty response data"),new Error("No data received");return e}catch(n){throw console.error("Error loading questions:",n),n}}const W={class:"choice-container"},j={class:"outline"},z=["onClick"],K={class:"content"},R={key:0,class:"loading"},q={key:1,class:"error"},G={key:2},U=["id"],X=["onClick"],Y={class:"toggle-icon"},Z={class:"question-content"},ee={class:"options"},te={class:"answer-section"},oe=["onClick"],se={key:0,class:"answer"},ne={__name:"ChoiceView",setup(n){const e=y([]),i=y(""),l=y(!0),t=y(null),s=async()=>{try{l.value=!0,t.value=null,console.log("开始加载题目...");const o=await J();if(console.log("题目数据加载完成，长度:",o==null?void 0:o.length),!o)throw new Error("没有加载到题目数据");const f=H(o);if(console.log("解析后的章节数:",f==null?void 0:f.length),console.log("解析后的章节:",f),e.value=f,!e.value||e.value.length===0)throw new Error("解析题目数据失败");e.value.forEach((h,d)=>{console.log(`章节 ${d+1}:`,h.title),console.log("题目数量:",h.questions.length),h.questions.forEach(_=>{_.isVisible=!1,_.showAnswer=!1})}),e.value.length>0&&(i.value=e.value[0].id)}catch(o){console.error("加载题目失败:",o),t.value=o.message}finally{l.value=!1}},u=o=>{const f=document.getElementById(o);f&&(f.scrollIntoView({behavior:"smooth"}),i.value=o)},v=o=>{o.isVisible=!o.isVisible},w=o=>{o.showAnswer=!o.showAnswer};return x(()=>{s()}),(o,f)=>(a(),c("div",W,[r("div",j,[f[0]||(f[0]=r("h3",null,"章节导航",-1)),r("ul",null,[(a(!0),c(A,null,E(e.value,h=>(a(),c("li",{key:h.id,onClick:d=>u(h.id),class:N({active:i.value===h.id})},p(h.title),11,z))),128))])]),r("div",K,[l.value?(a(),c("div",R," 加载中... ")):t.value?(a(),c("div",q,p(t.value),1)):(a(),c("div",G,[(a(!0),c(A,null,E(e.value,h=>(a(),c("div",{key:h.id,id:h.id,class:"chapter"},[r("h2",null,p(h.title),1),(a(!0),c(A,null,E(h.questions,d=>(a(),c("div",{key:d.id,class:"question-card"},[r("div",{class:"question-header",onClick:_=>v(d)},[r("span",Y,p(d.isVisible?"▼":"▶"),1),r("strong",null,p(d.id)+". "+p(d.content),1)],8,X),O(r("div",Z,[r("div",ee,[(a(!0),c(A,null,E(d.options,(_,k)=>(a(),c("div",{key:k,class:"option"},p(k)+". "+p(_),1))),128))]),r("div",te,[r("button",{onClick:M(_=>w(d),["stop"])},p(d.showAnswer?"隐藏答案":"显示答案"),9,oe),d.showAnswer?(a(),c("span",se," 答案："+p(d.answer),1)):P("",!0)])],512),[[L,d.isVisible]])]))),128))],8,U))),128))]))])]))}},re=V(ne,[["__scopeId","data-v-3cafcbb4"]]),ie={},le={class:"short-answer-container"};function ce(n,e){return a(),c("div",le,e[0]||(e[0]=[r("h2",null,"简答题",-1),r("p",null,"这里是简答题内容",-1)]))}const ae=V(ie,[["render",ce]]),ue={},de={class:"programming-container"};function he(n,e){return a(),c("div",de,e[0]||(e[0]=[r("h2",null,"程序题",-1),r("p",null,"这里是程序题内容",-1),m(" 活下来 ")]))}const fe=V(ue,[["render",he]]),pe=[{path:"/",redirect:"/choice"},{path:"/choice",name:"choice",component:re},{path:"/short-answer",name:"shortAnswer",component:ae},{path:"/programming",name:"programming",component:fe}],_e=D({history:Q("/JAVA-EE/"),routes:pe}),$=T(S);$.use(_e);$.mount("#app");