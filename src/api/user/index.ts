import request from "@/utils/request";
import {PhoneCodeResponseData,PostUserLoginRequestData, QRCodeResponseData} from './type'

enum API{
    USERLOGINURL='/sms/send/',
    POSTLOGINURL='/user/login',
    getQRCode_URL='/user/weixin/getLoginParam/'
}

export const getPhoneCode=(phone:string)=>{ //输入手机号返回手机验证码
    return request.get<any,{data:PhoneCodeResponseData}>(API.USERLOGINURL+phone)
}

export const postUserLogin=(obj:PostUserLoginRequestData)=>{   //提交手机号还有验证码
    return request.post(API.POSTLOGINURL,obj)
}

export const getQRCode=(wxRedirectUri:string)=>{    //获取二维码信息
    return request.get<any,{data:QRCodeResponseData}>(API.getQRCode_URL+`?wxRedirectUri=${wxRedirectUri}`)
}

