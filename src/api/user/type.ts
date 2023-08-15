export interface ResponseData{
    "code": number,
    "message": string,
    "ok": boolean
}


export interface PhoneCodeResponseData extends ResponseData{ //获取手机验证码相关的数据
    "data":string,
}


export interface PostUserLoginRequestData{
        "code": string,
        "phone": string   
}


export interface DetailPhoneCodeResponseData{
        "name":string,
        "token":string
}

export interface PhoneCodeTokenResponseData{
        "data": {
            "data":DetailPhoneCodeResponseData,
            "code": number,
            "message": string,
            "ok": boolean
        },

}


//获取二维码data中的数据类型
export interface QRCodeDetailData{
        "redirectUri": string,
      "appid": string,
      "scope": string,
      "state": string
}

//获取二维码登录get的数据类型
export interface QRCodeResponseData extends ResponseData{
    "data": QRCodeDetailData
}


//获取当前账号挂号信息
export type MdedicalInfo={
        "id": number,
        "createTime": string,
        "updateTime": string,
        "isDeleted": number,
        "param": {
            "certificatesTypeString": string,
            "contactsCertificatesTypeString": string,
            "cityString": string,
            "fullAddress": string,
            "districtString": string,
            "provinceString": string
        },
        "userId": number,
        "name": string,
        "certificatesType": string,
        "certificatesNo": string,
        "sex": number,
        "birthdate": string,
        "phone": string,
        "isMarry": number,
        "provinceCode": string,
        "cityCode": string,
        "districtCode": string,
        "address": string,
        "contactsName": string,
        "contactsCertificatesType": string,
        "contactsCertificatesNo": string,
        "contactsPhone": string,
        "isInsure": number,
        "cardNo": string,
        "status": string
    
}

////获取当前账号挂号信息的数组
export type MdedicalInfoArr=MdedicalInfo[]

export interface MdedicalInfoResponseData extends ResponseData{
    data:MdedicalInfoArr
}


//获取当前选择项的挂号信息
export interface ScheduleInfo{
    
        "id": string,
        "createTime": string,
        "updateTime": string,
        "isDeleted": number,
        "param": {
            "dayOfWeek": string,
            "depname": string,
            "hosname":string
        },
        "hoscode": string,
        "depcode": string,
        "title": string,
        "docname": string,
        "skill": string,
        "workDate": string,
        "workTime": number,
        "reservedNumber": number,
        "availableNumber": number,
        "amount": number,
        "status": number,
        "hosScheduleId": string
    
}

export interface ScheduleInfoResponseData extends ResponseData{
    data:ScheduleInfo
}


export interface OrderIdResponseData extends ResponseData{
     data:number
}


export interface OrderInfo{  //订单具体信息
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
      "orderStatusString": string
    },
    "userId": number,
    "outTradeNo": string,
    "hoscode": string,
    "hosname": string,
    "depcode": string,
    "depname": string,
    "scheduleId": string,
    "title": string,
    "reserveDate": string,
    "reserveTime": number,
    "patientId": number,
    "patientName": string,
    "patientPhone": string,
    "hosRecordId": string,
    "number": number,
    "fetchTime": string,
    "fetchAddress": string,
    "amount": number,
    "quitTime": string,
    "orderStatus": number
}

export interface OrderInfoResponseData extends ResponseData{
    data:OrderInfo
}