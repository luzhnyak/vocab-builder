import{r as j,u as h,j as s,L as g}from"./index-DAQWS7bo.js";import{c as e,e as N,a as w,H as f}from"./Hero-x8zKKz-l.js";import{c as b,a as n,u as y,C as i,o as S}from"./index.esm-DkWQ9A9y.js";const v=b({name:n().min(2).required(),email:n().email().required(),password:n().min(6).max(30).required()}),P=()=>{var l,m,c;const[o,p]=j.useState(!1),{signup:d}=h(a=>({signup:a.signup})),{control:t,handleSubmit:u,formState:{errors:r}}=y({resolver:S(v),defaultValues:{name:"",email:"",password:""}}),x=async a=>{d(a)};return s.jsxs("div",{className:e.wrapper,children:[s.jsx("h3",{className:e.title,children:"Register"}),s.jsx("p",{className:e.text,children:"To start using our services, please fill out the registration form below. All fields are mandatory:"}),s.jsxs("form",{onSubmit:u(x),children:[s.jsxs("div",{className:e.inputWrapper,children:[s.jsx(i,{name:"email",control:t,render:({field:a})=>s.jsx("input",{type:"text",...a,className:e.input})}),r&&s.jsx("span",{className:e.errormessage,children:(l=r.name)==null?void 0:l.message})]}),s.jsxs("div",{className:e.inputWrapper,children:[s.jsx(i,{name:"email",control:t,render:({field:a})=>s.jsx("input",{type:"text",...a,className:e.input})}),r&&s.jsx("span",{className:e.errormessage,children:(m=r.email)==null?void 0:m.message})]}),s.jsxs("div",{className:e.inputWrapper,children:[s.jsx(i,{name:"password",control:t,render:({field:a})=>s.jsx("input",{type:"text",...a,className:e.input})}),r&&s.jsx("span",{className:e.errormessage,children:(c=r.password)==null?void 0:c.message}),s.jsx("button",{type:"button",className:e.btnShowPassword,onClick:()=>p(!o),children:s.jsx("img",{src:o?N:w,alt:"ShowPassword"})})]}),s.jsx("button",{className:e.btn,type:"submit",children:"Register"})]}),s.jsx(g,{className:e.register,to:"/login",children:"Login"})]})},L=()=>s.jsx("main",{className:"container",children:s.jsx(f,{children:s.jsx(P,{})})});export{L as default};
