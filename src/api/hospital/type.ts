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


//用于展示科室的医院介绍
export interface BaseMapInfoData{
  "workDateString":string,
  "releaseTime":string,
  "bigname":string,
  "stopTime":string,
  "depname":string,
  "hosname":string
}

//用于排班的信息
export type BookingScheduleInfo={
  "workDate":string,
  "workDateMd":string,
  "dayOfWeek":string,
  "docCount":number,
  "reservedNumber":number,
  "availableNumber":number,
  "status":number
}

//用于排班的信息的数组
export type BookingScheduleInfoArr=BookingScheduleInfo[]

//科室排班总数据
export interface BookingScheduleData{
  "total":number,
  "bookingScheduleList":BookingScheduleInfoArr,
  "baseMap":BaseMapInfoData
}

export interface BookingScheduleResponseData extends ResponseData{
     data:BookingScheduleData
}


//排班医生具体数据
export interface BookingDoctorInfo{
  "id":string,
  "createTime":string,
  "updateTime":string,
  "isDeleted":number,
  "param":{
    "dayOfWeek":string,
    "depname":string,
    "hosname":string
  },
  "hoscode":string,
  "depcode":string,
  "title":string,
  "docname":string,
  "skill":string,
  "workDate":string,
  "workTime":number,
  "reservedNumber":number,
  "availableNumber":number,
  "amount":number,
  "status":number,
  "hosScheduleId":string
}

//所有排班医生具体数据
export type BookingDoctorInfoArr=BookingDoctorInfo[]

export interface BookingDoctorResponseData extends ResponseData{
  "data":BookingDoctorInfoArr
}