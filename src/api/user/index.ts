import request from "@/utils/request";
import {PhoneCodeResponseData,PostUserLoginRequestData} from './type'

enum API{
    USERLOGINURL='/sms/send/',
    POSTLOGINURL='/user/login'
}

export const getPhoneCode=(phone:string)=>{
    return request.get<any,{data:PhoneCodeResponseData}>(API.USERLOGINURL+phone)
}

export const postUserLogin=(obj:PostUserLoginRequestData)=>{
    return request.post(API.POSTLOGINURL,obj)
}

