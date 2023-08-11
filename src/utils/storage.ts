import {DetailPhoneCodeResponseData} from '@/api/user/type'

const USERLOGININFO='user_login_info'

export const setUserLoginInfoItem=(userInfo:DetailPhoneCodeResponseData)=>{
    localStorage.setItem(USERLOGININFO,JSON.stringify(userInfo))
}

export const removeUserLoginInfoItem=()=>{
    localStorage.removeItem(USERLOGININFO)
}

export const getUserLoginInfoItem=()=>{
   return JSON.parse(localStorage.getItem(USERLOGININFO) as string) 
}

//上方用于登录用户信息操作
