import { defineStore } from 'pinia'
import {getPhoneCode,postUserLogin} from '@/api/user/index'
import {PhoneCodeResponseData,PhoneCodeTokenResponseData,PostUserLoginRequestData,DetailPhoneCodeResponseData} from '@/api/user/type'
import {setUserLoginInfoItem, getUserLoginInfoItem} from '@/utils/storage'
import { ElMessage } from 'element-plus'
export const useUserStore = defineStore('user', {
    state:()=>({
        isVisable:false,//用于是否展示登录框,
        phoneCode:'',
        nameAndToken:getUserLoginInfoItem()||({} as DetailPhoneCodeResponseData)
    }),
    actions:{
         async getPhoneCodeAction(phone:string){
            const res:{data:PhoneCodeResponseData}=await getPhoneCode(phone)
            // console.log(res.data)
            if(res.data.code===200){
                this.phoneCode=res.data.data
                return
            }
            if(res.data.data==null||res.data.code!==200)
            {
                return Promise.reject()
            }
        },

        async postUserLoginAction(obj:PostUserLoginRequestData){
            const res:PhoneCodeTokenResponseData=await postUserLogin(obj)
            if(res.data.code===200){
                this.nameAndToken=res.data.data
                setUserLoginInfoItem(res.data.data)
                return
            }
            if(res.data.data==null||res.data.code!==200)
            {
                return Promise.reject()
            }
        },

        queryState(){
            const timer=setInterval(()=>{
                const obj=getUserLoginInfoItem()
                if(obj){
                    ElMessage.success('登录成功！')      
                    this.isVisable=false
                    this.nameAndToken=obj
                    clearInterval(timer)
                }
            },1000)
        }
    }
})