import{a as y,j as s,F as S,b as k,d as I,e as D,r as b,u as R}from"./index-DvD1Hqk0.js";import{c as r,P as E,D as F}from"./Pagination-DblIY5qL.js";import{c as t,i as P,a as v,M as O}from"./AddWordForm-OwV95Qx6.js";import{c as T,a as W,u as w,o as A,C as _}from"./index.esm-DqUsmVAl.js";import{C as M}from"./CircularProgress-DFvELJop.js";const $="_wrapper_8pax4_1",L="_btn_8pax4_10",U="_btnIcon_8pax4_27",q="_list_8pax4_36",m={wrapper:$,btn:L,btnIcon:U,list:q},z=({setShowEditModal:d,onClose:l,id:j})=>{const{refresh:i,setRefresh:h}=y(c=>({getOwnWords:c.getOwnWords,refresh:c.refresh,setRefresh:c.setRefresh})),p=()=>{d(!0),l()},a=async()=>{await I(j),h(!i),l()};return s.jsx("div",{className:m.wrapper,children:s.jsxs("ul",{className:m.list,children:[s.jsx("li",{children:s.jsxs("button",{className:m.btn,onClick:p,children:[s.jsx(S,{className:m.btnIcon}),s.jsx("span",{children:"Edit"})]})}),s.jsx("li",{children:s.jsxs("button",{className:m.btn,onClick:a,children:[s.jsx(k,{className:m.btnIcon}),s.jsx("span",{children:"Delete"})]})})]})})},B=T({en:W().required(),ua:W().required()}),V=({id:d,en:l,ua:j,category:i,isIrregular:h,onClose:p})=>{var u,f;const{setRefresh:a,refresh:c}=y(n=>({refresh:n.refresh,setRefresh:n.setRefresh})),{control:x,handleSubmit:N,formState:{errors:o}}=w({resolver:A(B),defaultValues:{en:l,ua:j}}),g=async n=>{await D(d,{en:n.en,ua:n.ua,category:i,isIrregular:h}),a(!c),p()};return s.jsx("div",{className:t.modalWrapper,children:s.jsxs("form",{onSubmit:N(g),children:[s.jsxs("div",{className:t.inputWrapper,children:[s.jsxs("div",{children:[s.jsx(_,{name:"ua",control:x,render:({field:n})=>s.jsx("input",{type:"text",...n,className:t.input})}),o&&s.jsx("span",{className:t.errormessage,children:(u=o.ua)==null?void 0:u.message})]}),s.jsx("img",{src:P,alt:"Word"}),s.jsx("span",{children:"Ukrainian"})]}),s.jsxs("div",{className:t.inputWrapper,children:[s.jsxs("div",{children:[s.jsx(_,{name:"en",control:x,render:({field:n})=>s.jsx("input",{type:"text",...n,className:t.input})}),o&&s.jsx("span",{className:t.errormessage,children:(f=o.en)==null?void 0:f.message})]}),s.jsx("img",{src:v,alt:"Word"}),s.jsx("span",{children:"English"})]}),s.jsxs("div",{className:t.btnWrapper,children:[s.jsx("button",{type:"submit",className:t.btn,children:"Save"}),s.jsx("button",{type:"button",className:t.btnCancel,onClick:()=>p(),children:"Cancel"})]})]})})},G=()=>{const[d,l]=b.useState(!1),[j,i]=b.useState(!1),[h,p]=b.useState(null),{ownWords:a,category:c,page:x,refresh:N,keyword:o,isIrregular:g,getOwnWords:u,setPage:f}=y(e=>({category:e.category,isIrregular:e.isIrregular,page:e.page,refresh:e.refresh,keyword:e.keyword,ownWords:e.ownWords,setPage:e.setPage,getOwnWords:e.getOwnWords})),{isLogin:n}=R(e=>({isLogin:e.isLogin}));b.useEffect(()=>{n&&u({category:c||"",page:x.toString(),isIrregular:g.toString(),keyword:o||""})},[u,x,o,c,g,N,n]);const C=e=>{l(!d),p(e)};return s.jsxs("div",{children:[s.jsxs("table",{className:r.table,cellSpacing:0,children:[s.jsx("thead",{children:s.jsxs("tr",{className:r.headRow,children:[s.jsx("th",{children:s.jsxs("div",{className:r.thWrapper,children:[s.jsx("span",{children:"Word"}),s.jsx("img",{src:v,alt:"Word",className:r.flag})]})}),s.jsx("th",{children:s.jsxs("div",{className:r.thWrapper,children:[s.jsx("span",{children:"Translation"}),s.jsx("img",{src:P,alt:"Translation",className:r.flag})]})}),s.jsx("th",{className:r.category,children:"Category"}),s.jsx("th",{children:"Progress"}),s.jsx("th",{})]})}),s.jsx("tbody",{children:(a==null?void 0:a.results)&&(a==null?void 0:a.results.map(e=>s.jsxs("tr",{className:r.bodyRow,children:[s.jsx("td",{children:e.en}),s.jsx("td",{children:e.ua}),s.jsx("td",{className:r.category,children:e.category}),s.jsx("td",{children:s.jsxs("div",{className:r.progressWrapper,children:[s.jsxs("span",{className:r.category,children:[e.progress," %"]}),s.jsx(M,{size:26,strokeWidth:4,progress:e.progress,color1:"#2BD627",color2:"#D4F8D3",color3:"#D4F8D3"})]})}),s.jsxs("td",{className:r.lastTd,children:[s.jsx("button",{className:r.btnPopup,onClick:()=>C(e._id),children:"..."}),s.jsx("div",{className:r.popupWrapper,children:d&&h===e._id&&s.jsx(z,{setShowEditModal:i,onClose:()=>l(!1),id:e._id})}),j&&h===e._id&&s.jsx(O,{onClose:i,children:s.jsx(V,{onClose:()=>i(!1),id:e._id,en:e.en,ua:e.ua,category:e.category,isIrregular:e.isIrregular})})]})]},e._id)))})]}),s.jsx(E,{totalPages:(a==null?void 0:a.totalPages)||1,page:x,onPageChange:f})]})},Y=()=>s.jsxs("main",{className:"container",children:[s.jsx(F,{isAddWord:!0}),s.jsx(G,{})]});export{Y as default};
