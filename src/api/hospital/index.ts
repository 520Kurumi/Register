import request from "@/utils/request";
import  {HospitalTotalData,HospitalDepartmentResponseData,BookingScheduleResponseData,BookingDoctorResponseData} from './type'
enum API{
    HospitalDetailURL='/hosp/hospital/',
    HOSPITALDEPARMENT='/hosp/hospital/department/',
    ENTERBOOK_URL='/hosp/hospital/auth/getBookingScheduleRule/',
    BOOKINGDOCTOR_URL='/hosp/hospital/auth/findScheduleList/'
}

export const getHospitalDetail=(hoscode:string)=>{
    return request.get<any,{data:HospitalTotalData}>(API.HospitalDetailURL+hoscode)
}

export const getHospitalDepartment=(hoscode:string)=>{
    return request.get<any,HospitalDepartmentResponseData>(API.HOSPITALDEPARMENT+hoscode)
}


//用于得到具体医院中的科室挂号信息
export const getEnterBook=(page:number,limit:number,hoscode:string,depcode:string)=>{
    return request.get<any,{data:BookingScheduleResponseData}>(API.ENTERBOOK_URL+`${page}/${limit}/${hoscode}/${depcode}`)
}

export const getBookingDoctor=(hoscode:string,depcode:string,workDate:string)=>{
    return request.get<any,{data:BookingDoctorResponseData}>(API.BOOKINGDOCTOR_URL+`${hoscode}/${depcode}/${workDate}`)
}