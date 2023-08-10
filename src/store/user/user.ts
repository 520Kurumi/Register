import { defineStore } from 'pinia'
import {getPhoneCode,postUserLogin} from '@/api/user/index'
import {PhoneCodeResponseData,PhoneCodeTokenResponseData,PostUserLoginRequestData,DetailPhoneCodeResponseData} from '@/api/user/type'
export const useUserStore = defineStore('user', {
    state:()=>({
        isVisable:false,//用于是否展示登录框,
        phoneCode:'',
        nameAndToken:({} as DetailPhoneCodeResponseData)
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
                return
            }
            if(res.data.data==null||res.data.code!==200)
            {
                return Promise.reject()
            }
        }
    }
})