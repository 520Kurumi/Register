import{g as B,h as m,m as $,u as D,k as N,H as V,I as E,r as f,o as i,c as y,a,w as t,e as o,l as g,i as w,G as k,J as F,j as s,F as G,b as M,t as r,p as j,d as H,_ as J}from"./index-1b06a687.js";import{R as L}from"./index-c754065a.js";const x=_=>(j("data-v-a6ea8354"),_=_(),H(),_),P={class:"register-container"},T=x(()=>o("h2",{class:"title"},"确认挂号信息",-1)),z={class:"card-header"},A=x(()=>o("span",null,"请点击选择就诊人",-1)),K={class:"register"},O=x(()=>o("div",{class:"card-header"},[o("span",null,"挂号信息")],-1)),Q={class:"table"},U={class:"button"},W=B({__name:"Register",setup(_){const u=m(-1),h=$(),I=D(),p=m([]),l=m();N(async()=>{const n=await V();p.value=n.data.data,n.data.code===200&&(p.value=n.data.data);const d=await E(h.query.scheduleId);d.data.code===200&&(l.value=d.data.data)});const S=n=>{if(u.value===n){u.value=-1;return}u.value=n},R=()=>{k.success("预约成功"),I.push({path:"/user",query:{scheduleId:h.query.scheduleId,hoscode:h.query.hoscode,patientId:p.value[u.value].id}})};return(n,d)=>{const v=f("el-button"),b=f("el-card"),c=f("el-descriptions-item"),C=f("el-descriptions");return i(),y("div",P,[T,a(b,{class:"box-card",shadow:"always"},{header:t(()=>[o("div",z,[A,a(v,{class:"button",type:"success",icon:w(F),onClick:d[0]||(d[0]=()=>{})},{default:t(()=>[s("添加就诊人")]),_:1},8,["icon"])])]),default:t(()=>[o("div",K,[(i(!0),y(G,null,M(p.value,(e,q)=>(i(),g(L,{key:e.id,isDeleteIcon:!1,item:e,index:q,onGoSelect:S,currentIndex:u.value},null,8,["item","index","currentIndex"]))),128))])]),_:1}),a(b,{class:"box-card"},{header:t(()=>[O]),default:t(()=>[o("div",Q,[a(C,{column:2,border:""},{default:t(()=>[a(c,{align:"left",width:"200px",label:"就诊日期："},{default:t(()=>{var e;return[s(r((e=l.value)==null?void 0:e.workDate),1)]}),_:1}),a(c,{align:"left",width:"200px",label:"就诊医院："},{default:t(()=>{var e;return[s(r((e=l.value)==null?void 0:e.param.hosname),1)]}),_:1}),a(c,{align:"left",width:"200px",label:"就诊科室："},{default:t(()=>{var e;return[s(r((e=l.value)==null?void 0:e.param.depname),1)]}),_:1}),a(c,{align:"left",width:"200px",label:"医生名字："},{default:t(()=>{var e;return[s(r((e=l.value)==null?void 0:e.docname),1)]}),_:1}),a(c,{align:"left",width:"200px",label:"医生职称："},{default:t(()=>{var e;return[s(r((e=l.value)==null?void 0:e.title),1)]}),_:1}),a(c,{align:"left",width:"200px",label:"医生专长："},{default:t(()=>{var e;return[s(r((e=l.value)==null?void 0:e.skill),1)]}),_:1}),a(c,{align:"left",width:"200px",label:"医生服务费："},{default:t(()=>{var e;return[s(r((e=l.value)==null?void 0:e.amount),1)]}),_:1})]),_:1})])]),_:1}),o("div",U,[u.value!==-1?(i(),g(v,{key:0,type:"primary",onClick:R},{default:t(()=>[s("点击预约")]),_:1})):(i(),g(v,{key:1,type:"info",onClick:d[1]||(d[1]=e=>w(k).error("请选择就诊人"))},{default:t(()=>[s("点击预约")]),_:1}))])])}}});const Z=J(W,[["__scopeId","data-v-a6ea8354"]]);export{Z as default};