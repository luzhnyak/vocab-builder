import{a as g,r as h,j as s,c as x}from"./index-DAQWS7bo.js";import{c as a,P as j,D as m}from"./Pagination-Bt35yzV6.js";import{a as p,i as u,b as y}from"./ua-C_iFZk7-.js";import"./index.esm-DkWQ9A9y.js";const b=()=>{const{allWords:e,category:d,page:t,keyword:i,isIrregular:c,getAllWords:l,setPage:n}=g(r=>({allWords:r.allWords,category:r.category,isIrregular:r.isIrregular,page:r.page,keyword:r.keyword,getAllWords:r.getAllWords,setPage:r.setPage}));h.useEffect(()=>{l({category:d||"",page:t.toString(),isIrregular:c.toString(),keyword:i||""})},[l,t,i,d,c]);const o=r=>{x(r)};return s.jsxs("div",{children:[s.jsxs("table",{className:a.table,cellSpacing:0,children:[s.jsx("thead",{children:s.jsxs("tr",{className:a.headRow,children:[s.jsx("th",{children:s.jsxs("div",{className:a.thWrapper,children:[s.jsx("span",{children:"Word"}),s.jsx("img",{src:p,alt:"Word"})]})}),s.jsx("th",{children:s.jsxs("div",{className:a.thWrapper,children:[s.jsx("span",{children:"Translation"}),s.jsx("img",{src:u,alt:"Translation"})]})}),s.jsx("th",{children:"Category"}),s.jsx("th",{})]})}),s.jsx("tbody",{children:e==null?void 0:e.results.map(r=>s.jsxs("tr",{className:a.bodyRow,children:[s.jsx("td",{children:r.en}),s.jsx("td",{children:r.ua}),s.jsx("td",{children:r.category}),s.jsx("td",{className:a.lastTd,children:s.jsxs("button",{className:a.btnAdd,onClick:()=>o(r._id),children:["Add to dictionary",s.jsx("img",{src:y,alt:""})]})})]},r._id))})]}),s.jsx(j,{totalPages:(e==null?void 0:e.totalPages)||1,page:t,onPageChange:n})]})},k=()=>s.jsxs("main",{className:"container",children:[s.jsx(m,{}),s.jsx(b,{})]});export{k as default};