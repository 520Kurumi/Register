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
