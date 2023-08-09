export interface ResponseData{
    "code": number,
    "message": string,
    "ok": boolean
}

export interface HospitalBookingRule{
    "cycle": number,
    "releaseTime": string,
    "stopTime": string,
    "quitDay": number,
    "quitTime": string,
    "rule": string[]
}

export interface HospitalDetailInfo{
    "id": string,
      "createTime": string,
      "updateTime": string,
      "isDeleted": number,
      "param": {
        "hostypeString": string,
        "fullAddress": string
      },
      "hoscode": string,
      "hosname": string,
      "hostype": string,
      "provinceCode": string,
      "cityCode": string,
      "districtCode": string,
      "address": string,
      "logoData": string,
      "intro": string,
      "route": string
      "status": number,
      "bookingRule": string
    }


export interface HospitalTotalData extends ResponseData{
        data:{
            "bookingRule":HospitalBookingRule,
            "hospital":HospitalDetailInfo
        }
}

//科室数据类型
export interface HospitalDepartment{
  "depcode": string,
  "depname": string,
  "children": HospitalDepartment[]
}

export type HospitalDepartmentArr=HospitalDepartment[]


export interface HospitalDepartmentResponseData extends ResponseData{
   data:{
      "code": number,
      "message": string,
      "ok": boolean,
      data:HospitalDepartmentArr
   }
}