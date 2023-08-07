import request from "@/utils/request";
import  {HospitalResponseData,HospitalLevelAndRegionResponseData,SearchHospitalData} from './type'
enum API{
    HOSPITAL_HOME='/hosp/hospital/',
    HOSPITAL_LEVELANDREGION='/cmn/dict/findByDictCode/',
    HOSPITAL_SEARCH='/hosp/hospital/findByHosname/'
}

//得到医院列表
export const getHospitalHome=(page:number,limit:number,hostype:string,districtCode:string)=>{
    return request.get<any,HospitalResponseData>(API.HOSPITAL_HOME+`${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`)
}

//得到分类级别名或者地区名
export const getHospitalLevelAndRegion=(dictCode:string)=>{
    return request.get<any,HospitalLevelAndRegionResponseData>(API.HOSPITAL_LEVELANDREGION+dictCode)
}

//得到搜索结果
export const getSearchHospital=(hosName:string)=>{
    return request.get<any,SearchHospitalData>(API.HOSPITAL_SEARCH+hosName)
}