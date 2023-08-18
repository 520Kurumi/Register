import request from "@/utils/request";
import {PhoneCodeResponseData,PostUserLoginRequestData, QRCodeResponseData,
    MdedicalInfoResponseData,ScheduleInfoResponseData,OrderIdResponseData,OrderInfoResponseData,QRCodeImgResponseData,
    QRCodeImgStatusResponseData,UserInfoResponseData,UserParams,UserOrderResponseData,OrderStatusResponseData} from './type'

enum API{
    USERLOGINURL='/sms/send/',
    POSTLOGINURL='/user/login',
    getQRCode_URL='/user/weixin/getLoginParam/',
    getPTIENT_URL='/user/patient/auth/findAll',
    getSCHEDULE_URL='/hosp/hospital/getSchedule/' ,//挂号信息,
    postORDER_URL='/order/orderInfo/auth/submitOrder/',
    getORDERINFO_URL='/order/orderInfo/auth/getOrderInfo/',
    getCANCELORDER_URL='/order/orderInfo/auth/cancelOrder/',
    getQRCODEIMG_URL='/order/weixin/createNative/',
    getQRCODEIMGSTATUS_URL='/order/weixin/queryPayStatus/',
    getUSERINFO_URL='/user/auth/getUserInfo',
    postIDENTIFY_URL='/user/auth/userAuah',
    getUSERORDER_URL='/order/orderInfo/auth/', //用于得到登录用户订单信息
    getORDERSTATUS_URL='/order/orderInfo/auth/getStatusList' //用于得到订单状态
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

export const postOrder=(hoscode:string,scheduleId:string,patientId:string)=>{  //提交订单
    return request.post<any,{data:OrderIdResponseData}>(API.postORDER_URL+`${hoscode}/${scheduleId}/${patientId}`)
}

export const getOrderInfo=(id:number)=>{
        return  request.get<any,{data:OrderInfoResponseData}>(API.getORDERINFO_URL+id)
}

export const getCancelOrder=(orderId:number)=>{
    return request.get(API.getCANCELORDER_URL+orderId)
}

export const getQRCodeImg=(orderId:number)=>{
    return request.get<any,{data:QRCodeImgResponseData}>(API.getQRCODEIMG_URL+orderId)
}

export const getQRCodeImgStatus=(orderId:number)=>{
    return request.get<any,{data:QRCodeImgStatusResponseData}>(API.getQRCODEIMGSTATUS_URL+orderId)
}

export const getUserInfo=()=>{
    return request.get<any,{data:UserInfoResponseData}>(API.getUSERINFO_URL)
}


//用于提交实名认证
export const postIdentify=(UserParams:UserParams)=>{
    return request.post<any,any>(API.postIDENTIFY_URL,UserParams)
}

export const getUserOrder=(page:number,limit:number,patientId:string,orderStatus:string)=>{
     return request.get<any,{data:UserOrderResponseData}>(API.getUSERORDER_URL+`${page}/${limit}/${patientId}/${orderStatus}`)
}


export const getorderStatus=()=>{
    return request.get<any,{data:OrderStatusResponseData}>(API.getORDERSTATUS_URL)
}
  


