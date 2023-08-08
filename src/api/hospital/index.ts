import request from "@/utils/request";
import  {HospitalTotalData} from './type'
enum API{
    HospitalDetailURL='/hosp/hospital/'
}

export const getHospitalDetail=(hoscode:string)=>{
    return request.get<any,{data:HospitalTotalData}>(API.HospitalDetailURL+hoscode)
}