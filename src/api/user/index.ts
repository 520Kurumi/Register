import request from "@/utils/request";
import {PhoneCodeResponseData,PostUserLoginRequestData, QRCodeResponseData,MdedicalInfoResponseData,ScheduleInfoResponseData} from './type'

enum API{
    USERLOGINURL='/sms/send/',
    POSTLOGINURL='/user/login',
    getQRCode_URL='/user/weixin/getLoginParam/',
    getPTIENT_URL='/user/patient/auth/findAll',
    getSCHEDULE_URL='/hosp/hospital/getSchedule/' //挂号信息
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
export const getPatient=()=>{ //获取当前账号挂号信息
    return request.get<any,{data:MdedicalInfoResponseData}>(API.getPTIENT_URL)
}

export const getSchedule=(scheduleId:string)=>{
    return request.get<any,{data:ScheduleInfoResponseData}>(API.getSCHEDULE_URL+scheduleId)
}

