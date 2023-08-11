<script setup lang="ts">
import {useUserStore} from '@/store/user/user'
import {ref, reactive, computed} from 'vue'
import {User,Lock} from '@element-plus/icons-vue'
import type {  FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import {getQRCode} from '@/api/user/index'
const user=useUserStore()
const isLogin=ref<boolean>(true)
const isGetCode=ref<boolean>(true)
const loginForm=ref<HTMLFormElement>()
const count=ref<number>(0)
const loginInfo=reactive({
    phone:'',
    code:''
})


const isRight =computed(()=>{
    if(/^1[3-9]\d{9}$/.test(loginInfo.phone)){
        return true
    }
    return false
})
const getCode= async ()=>{
    try{
       await user.getPhoneCodeAction(loginInfo.phone)
    }catch(err){
        ElMessage.error('错误，获取验证码失败')
    }finally{
         loginInfo.code=user.phoneCode
    }

    count.value=5;
    isGetCode.value=false
    const timer=setInterval(()=>{
        count.value--;
        if(count.value<=0){
            isGetCode.value=true
            clearInterval(timer)
        }
    },1000)
}
const validatorPhone=(_rule:any, value:string, callback:Function)=>{
    // console.log(rule)
    const reg=/^1[3-9]\d{9}$/
    if(reg.test(value)){
        return callback()
    }
   return new Error('请输入正确的手机号') 

}
const rules=reactive<FormRules<typeof loginInfo>>({
    phone:[
        { required: true, message: '手机号不能为空', trigger: 'blur' },
    {
      validator:validatorPhone, trigger: 'change'
    }],
    code:[{
        required: true, message: '验证码不能为空', trigger: 'blur' 
    }]
})

const submit=()=>{
    if((isRight.value ===false)||(loginInfo.code.length<6)){
        return
    }

    loginForm?.value?.validate(async(isValid:boolean, invalidFields:[])=>{
        if(isValid){
            try {
             await  user.postUserLoginAction(loginInfo)
             user.isVisable=false   
             ElMessage.success('登录成功！')             
            } catch (error) {
                ElMessage.error('错误，获取验证码失败')
            }finally{
                console.log(user.nameAndToken)
            }

            console.log('通过验证')
        }else{
            console.log('未通过',invalidFields)
        }
    })

}
const close=()=>{    //关闭dialog后触发
    Object.assign(loginInfo,{ phone:'',code:''})
    loginForm.value?.resetFields()
}

const wxLogin=async()=>{  //微信登陆
    isLogin.value=false
    const redirect_URL = encodeURIComponent(window.location.origin + "/wxlogin");
    const res=await getQRCode(redirect_URL)
    console.log(res.data)
  //发请求获取微信扫码二维码需要参数
  //获取微信扫码登录页面参数
  //还需要携带一个参数:告诉学校服务器用户授权成功以后重定向项目某一个页面
    const styleUrl='LmltcG93ZXJCb3h7CiB3aWR0aDogMjMwcHg7CiBoZWlnaHQ6IDIzMHB4OwogIGRpc3BsYXk6YmxvY2s7CiAgbWFyZ2luLXJpZ2h0OiA1MHB4Owp9Ci5pbXBvd2VyQm94IC5xcmNvZGUgewogYm9yZGVyOiBub25lOwogd2lkdGg6IDIwMHB4OwogaGVpZ2h0OiAyMDBweDsKfQoKcHsKICBkaXNwbGF5Om5vbmU7Cn0='
    //@ts-ignore
    new WxLogin({
    self_redirect: true, //true:手机点击确认登录后可以在 iframe 内跳转到 redirect_uri
    id: "login_container", //显示二维码容器设置
    appid: res.data.data.appid, //应用位置标识appid
    scope: "snsapi_login", //当前微信扫码登录页面已经授权了
    redirect_uri: res.data.data.redirectUri, //填写授权回调域路径,就是用户授权成功以后，微信服务器向公司后台推送code地址
    state: res.data.data.state, //state就是学校服务器重定向的地址携带用户信息
    style: "black",
    href:'data:text/css;base64,'+styleUrl //样式 通过编码方式给予
  });
  user.queryState()
}

</script>

<template>
 <div class="container">
        <el-dialog
         v-model="user.isVisable"
         title="用户登录"
         align-center
         @close="close"
        >
        <el-row>
            <el-col :span="12" v-show="isLogin">
                <div class="left">
                        <div class="login-phone">
                            <div class="login-form">
                             <el-form :model="loginInfo" :rules="rules"  ref="loginForm">
                                  <el-form-item label="手机号" prop="phone" error>
                                      <el-input placeholder="请输入手机号码"  v-model="loginInfo.phone" maxlength="11" style="width: 400px" :prefix-icon="User"></el-input>
                                  </el-form-item>
                                  <el-form-item label="验证码" prop="code">
                                      <el-input placeholder="请输入手机验证码" v-model="loginInfo.code" maxlength="6" style="width: 180px" :prefix-icon="Lock"></el-input>
                                  </el-form-item>
                                  <el-form-item>
                                  <el-button type="primary" v-show="count<=0" :disabled="(isGetCode&&isRight)?false:true" @click="getCode">获取验证码</el-button>
                                  <el-button type="primary" v-show="count>0" :disabled="true">获取验证码({{ count }})</el-button>
                                  </el-form-item>

                             </el-form>                           
                        </div>
                         <el-button type="primary" style="width: 90%" @click="submit" :disabled="(isRight===false)||(loginInfo.code.length<6)">用户登录</el-button>
                         <span @click="wxLogin">微信扫码登录</span>
                         <svg @click="wxLogin" t="1691576674864" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4068" width="32" height="32"><path d="M183.379592 699.559184c-4.179592 0-8.359184-1.044898-11.493878-3.657143-6.269388-4.702041-9.404082-12.016327-7.836734-19.330612l13.061224-77.322449C136.881633 553.273469 114.938776 496.326531 114.938776 437.289796 114.938776 292.571429 246.073469 175.020408 408.032653 175.020408c76.8 0 149.420408 26.644898 204.8 74.710204 55.379592 48.587755 86.726531 113.893878 88.293878 183.379592 0 5.746939-2.089796 10.971429-6.269388 14.628572s-9.404082 5.746939-15.151021 5.746938c-5.22449-0.522449-9.404082-0.522449-13.583673-0.522449-112.326531 0-203.232653 79.934694-203.232653 178.677551 0 13.583673 1.567347 27.167347 5.22449 40.751021 1.567347 5.746939 0.522449 11.493878-2.612245 16.195918-3.134694 4.702041-8.359184 7.836735-14.106123 8.881633-14.106122 2.089796-28.734694 3.134694-43.363265 3.134694-52.767347 0-104.489796-12.538776-149.420408-36.571429l-65.828572 34.481633c-3.134694 0-6.269388 1.044898-9.404081 1.044898z" fill="#0B9682" p-id="4069"></path><path d="M303.542857 352.653061m-35.004081 0a35.004082 35.004082 0 1 0 70.008163 0 35.004082 35.004082 0 1 0-70.008163 0Z" fill="#DCFFFA" p-id="4070"></path><path d="M512 352.653061m-35.004082 0a35.004082 35.004082 0 1 0 70.008164 0 35.004082 35.004082 0 1 0-70.008164 0Z" fill="#DCFFFA" p-id="4071"></path><path d="M849.502041 849.502041c-3.134694 0-6.269388-0.522449-9.404082-2.089796l-52.244898-27.167347c-37.093878 19.330612-78.889796 29.779592-122.253061 29.779592-134.269388 0-242.938776-98.220408-242.938776-218.383674S531.853061 412.734694 665.6 412.734694 909.061224 510.955102 909.061224 631.118367c0 48.065306-17.763265 95.085714-50.677551 133.22449l10.44898 61.64898c1.044898 7.314286-1.567347 15.15102-7.836735 19.330612-3.134694 3.134694-7.314286 4.179592-11.493877 4.179592z" fill="#16C4AF" p-id="4072"></path><path d="M576.261224 575.738776m-29.779591 0a29.779592 29.779592 0 1 0 59.559183 0 29.779592 29.779592 0 1 0-59.559183 0Z" fill="#DCFFFA" p-id="4073"></path><path d="M755.461224 575.738776m-29.779591 0a29.779592 29.779592 0 1 0 59.559183 0 29.779592 29.779592 0 1 0-59.559183 0Z" fill="#DCFFFA" p-id="4074"></path></svg>
                    </div>
                </div>
            </el-col>

            <el-col :span="12" v-show="!isLogin">
                <div class="left">
                    <div class="login-code">
                             <!-- <h2>微信登录</h2> -->
                            <div class="img-code" >
                                <div id="login_container"></div>
                                <!-- <img src="../../assets/images/code_login_wechat.png" alt=""> -->
                            </div>
                            <!-- <span>使用微信扫一扫登录</span> -->
                            <div class="icon">
                              <svg t="1691578481980" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5575" width="16" height="16"><path d="M341.333333 896H256V128h512v768H341.333333z m0-85.333333h341.333334V213.333333H341.333333v597.333334z m85.333334-42.666667v-85.333333h170.666666v85.333333h-170.666666z" fill="#444444" p-id="5576"></path></svg>
                              <span @click="isLogin=true">手机短信验证码登录</span>
                            </div>
                    </div>
                </div>
            </el-col>

            <el-col :span="12">
                <div class="right">
                     <div class="follow">
                         <img src="../../assets/images/code_login_wechat.png" alt="">
                         <svg t="1691577065742" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4058" width="16" height="16"><path d="M668.8 366.8c10.3 0 20.5 0.7 30.6 1.9C671.9 241 535.1 146.3 379 146.3 204.4 146.3 61.4 265 61.4 415.6c0 87 47.6 158.4 127.1 213.8l-31.8 95.2 111-55.5C307.5 677 339.4 685 379 685c10 0 19.8-0.5 29.6-1.2-6.2-21.2-9.8-43.4-9.8-66.4 0-138.3 119.2-250.6 270-250.6zM498.1 281c23.9 0 39.7 15.7 39.7 39.5 0 23.7-15.8 39.6-39.7 39.6-23.8 0-47.7-15.9-47.7-39.6 0-23.8 23.8-39.5 47.7-39.5z m-222.3 79.1c-23.8 0-47.9-15.9-47.9-39.6 0-23.8 24-39.5 47.9-39.5 23.8 0 39.6 15.7 39.6 39.5 0.1 23.6-15.7 39.6-39.6 39.6z m0 0" p-id="4059"></path><path d="M958.7 613.6c0-126.6-127-229.8-269.7-229.8-151.1 0-270.1 103.2-270.1 229.8 0 126.8 119 229.8 270.1 229.8 31.6 0 63.6-7.9 95.2-15.9l87.1 47.6-23.8-79.1c63.7-47.7 111.2-111 111.2-182.4zM601.4 574c-15.8 0-31.8-15.7-31.8-31.7 0-15.8 16-31.7 31.8-31.7 24 0 39.7 15.9 39.7 31.7 0 16-15.7 31.7-39.7 31.7z m174.7 0c-15.7 0-31.5-15.7-31.5-31.7 0-15.8 15.8-31.7 31.5-31.7 23.8 0 39.7 15.9 39.7 31.7 0 16-15.9 31.7-39.7 31.7z m0 0" p-id="4060"></path></svg>
                         <span>微信扫一扫关注</span>
                         <span>“快速预约挂号”</span>
                     </div>

                     <div class="download">
                        <img src="../../assets//images/code_app.png" alt="">
                        <svg t="1691577151915" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5167" width="16" height="16"><path d="M341.333333 896H298.666667V170.666667h469.333333v725.333333H341.333333z m0-42.666667h384V213.333333H341.333333v640z m128-42.666666v-42.666667h128v42.666667h-128z" fill="#444444" p-id="5168"></path></svg>
                        <span>扫一扫下载</span>
                        <span>“预约挂号”APP</span>
                     </div>
                      <div class="info">
                         <h2>官方指定平台</h2>
                          <h2>快速挂号 安全放心</h2>
                      </div>
                </div>            
            </el-col>
        </el-row>





        </el-dialog>
 </div>

</template>

<style scoped lang="scss">
:deep(.el-dialog__header){
    border-bottom: 1px solid;
}

// .qrcode,.wrp_code{
//     width: 200px;
//     height: 200px;
//     margin-bottom: 10px;
// }   

.container{

    .left{
        width: 440px;
        height: 450px;
        overflow: hidden;
        .login-phone{
            display: flex;
            // flex-wrap: wrap;
            // justify-content: center;
            flex-direction: column;
            align-items: center;
            margin-top: 30px;
            width: 440px;
            height: 400px;
            border: 1px solid;
            .login-form{
                margin: 20px;
                margin-bottom: 40px;
            }
            span{
                margin-top: 20px;
                cursor: pointer;
            }
        }

        .login-code{
            display: flex;
            flex-direction: column;
            align-items: center;
            // justify-content: center;
            margin-top: 30px;
            width: 440px;
            height: 400px;
            border: 1px solid;
            h2{
                text-align: center;
                width: 300px;
                height: 32px;
                font-size: 20px;
                color:#373737;
                line-height: 32px;
                margin-bottom: 10px;
                
            }
            .img-code{
                width: 200px;
                height: 200px;
                margin-bottom: 10px;
                img{
                    width: 200px;
                     height: 200px;
                }

            }
            span{
                color: #606266;
                font-size: 14px;
                margin-bottom: 10px;
            }
            .icon{
                cursor: pointer;
                margin-top: 60px;
            }
        }
    }

    .right{
        margin-top: 30px;
        width: 440px;
        height: 450px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        .follow{
            width: 140px;
            height: 228px;
            img{
                width: 140px;
                height: 140px;
            }
        }

        .download{
            width: 140px;
            height: 228px;
            img{
                width: 140px;
                height: 140px;
            }
        }

        .info{
            width: 200px;
            margin-top: -50px;
            h2{
                margin-bottom: 20px;
                 font-size: 20px;
                 font-weight: 300;
                 color:#000;
            }
        }
    }
}
</style>
