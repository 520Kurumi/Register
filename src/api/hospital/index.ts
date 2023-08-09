import request from "@/utils/request";
import  {HospitalTotalData,HospitalDepartmentResponseData} from './type'
enum API{
    HospitalDetailURL='/hosp/hospital/',
    HOSPITALDEPARMENT='/hosp/hospital/department/'
}

export const getHospitalDetail=(hoscode:string)=>{
    return request.get<any,{data:HospitalTotalData}>(API.HospitalDetailURL+hoscode)
}

export const getHospitalDepartment=(hoscode:string)=>{
    return request.get<any,HospitalDepartmentResponseData>(API.HOSPITALDEPARMENT+hoscode)
}