import{g as $,M as D,h as p,k as G,N as T,r,o as h,c as w,a as e,w as t,e as c,i as C,z as H,j as _,t as V,O as X,G as g,P as Z,p as J,d as K,_ as L}from"./index-e9f8ae92.js";const E=f=>(J("data-v-f6f20820"),f=f(),K(),f),Q=E(()=>c("div",{class:"card-header"},[c("span",null,"实名信息")],-1)),W={class:"infoId",style:{color:"#7f7f7f"}},Y={class:"intro"},ee=E(()=>c("span",null,"完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。",-1)),te={key:0,class:"hasIdentify"},le={key:1,class:"noIdentify"},ae=["src"],oe=$({__name:"Identify",setup(f){const s=D({certificatesNo:"",certificatesType:"",certificatesUrl:"",name:""}),m=p(!1),d=p(),b=p(),v=p();G(async()=>{const n=await T();n.data.code===200&&(d.value=n.data.data)});const k=()=>{s.certificatesUrl=""},S=()=>{m.value=!0},q=n=>{v.value.clearValidate("certificatesUrl"),s.certificatesUrl=n.data},F=()=>{g.error("最多只能上传一张图片")},P=()=>{b.value.clearFiles(),Object.assign(s,{certificatesNo:"",certificatesType:"",certificatesUrl:"",name:""})},B=async()=>{await v.value.validate();try{await Z(s),g.success("认证成功"),await T(),location.reload()}catch{g.error("认证失败")}},M={name:[{required:!0,validator:(n,l,o)=>{/[\u4e00-\u9fa5]/.test(l)?o():o(new Error("请输入正确的姓名"))}}],certificatesType:[{required:!0,validator:(n,l,o)=>{l==="10"||l==="20"?o():o(new Error("请选择证件"))}}],certificatesUrl:[{required:!0,validator:(n,l,o)=>{l!==""?o():o(new Error("请上传图片"))}}],certificatesNo:[{required:!0,validator:(n,l,o)=>{const i=/^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/,y=/^[a-zA-Z0-9]{3,21}$/;i.test(l)||y.test(l)?o():o(new Error("请输入正确的证件号"))}}]};return(n,l)=>{const o=r("el-icon"),i=r("el-descriptions-item"),y=r("el-descriptions"),I=r("el-input"),u=r("el-form-item"),U=r("el-option"),R=r("el-select"),j=r("el-upload"),z=r("el-dialog"),x=r("el-button"),A=r("el-form"),O=r("el-card");return h(),w("div",null,[e(O,{class:"box-card"},{header:t(()=>[Q]),default:t(()=>{var N;return[c("div",W,[c("div",Y,[e(o,null,{default:t(()=>[e(C(H))]),_:1}),ee]),((N=d.value)==null?void 0:N.authStatus)===1?(h(),w("div",te,[e(y,{column:1,border:""},{default:t(()=>[e(i,{label:"用户姓名"},{default:t(()=>{var a;return[_(V((a=d.value)==null?void 0:a.name),1)]}),_:1}),e(i,{label:"证件类型"},{default:t(()=>{var a;return[_(V(((a=d.value)==null?void 0:a.certificatesType)==="10"?"身份证":"户口簿"),1)]}),_:1}),e(i,{label:"证件号码"},{default:t(()=>{var a;return[_(V((a=d.value)==null?void 0:a.certificatesNo),1)]}),_:1})]),_:1})])):(h(),w("div",le,[e(A,{ref_key:"ruleFormRef",ref:v,model:s,rules:M},{default:t(()=>[e(u,{label:"用户姓名",prop:"name"},{default:t(()=>[e(I,{clearable:"",modelValue:s.name,"onUpdate:modelValue":l[0]||(l[0]=a=>s.name=a),placeholder:"请输入用户姓名"},null,8,["modelValue"])]),_:1}),e(u,{label:"证件类型",prop:"certificatesType"},{default:t(()=>[e(R,{modelValue:s.certificatesType,"onUpdate:modelValue":l[1]||(l[1]=a=>s.certificatesType=a),placeholder:"请选择证件类型",clearable:"",style:{width:"500px"}},{default:t(()=>[e(U,{label:"身份证",value:"10"}),e(U,{label:"户口簿",value:"20"})]),_:1},8,["modelValue"])]),_:1}),e(u,{label:"证件号码",prop:"certificatesNo"},{default:t(()=>[e(I,{clearable:"",modelValue:s.certificatesNo,"onUpdate:modelValue":l[2]||(l[2]=a=>s.certificatesNo=a),placeholder:"请输入证件号码"},null,8,["modelValue"])]),_:1}),e(u,{label:"上传证件",prop:"certificatesUrl"},{default:t(()=>[e(j,{action:"/api/oss/file/fileUpload?fileHost=userAuah","list-type":"picture-card",limit:1,ref_key:"upload",ref:b,"on-remove":k,"on-preview":S,"on-success":q,"on-exceed":F},{default:t(()=>[e(o,null,{default:t(()=>[e(C(X))]),_:1})]),_:1},512),e(z,{modelValue:m.value,"onUpdate:modelValue":l[3]||(l[3]=a=>m.value=a)},{default:t(()=>[c("img",{"w-full":"",src:s.certificatesUrl,alt:"Preview Image",style:{width:"100%",height:"100%"}},null,8,ae)]),_:1},8,["modelValue"])]),_:1}),e(u,null,{default:t(()=>[e(x,{type:"primary",onClick:B},{default:t(()=>[_("提交")]),_:1}),e(x,{type:"primary",onClick:P},{default:t(()=>[_("重置")]),_:1})]),_:1})]),_:1},8,["model"])]))])]}),_:1})])}}});const re=L(oe,[["__scopeId","data-v-f6f20820"]]);export{re as default};
