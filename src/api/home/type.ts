

export interface ResponseData{
    code: number,
    message: string,
    ok: boolean
}

//已选详细医院
export interface Hospital{
    "id": string,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {
        "hostypeString": string,//
        "fullAddress": string
    },
    "hoscode": string,
    "hosname": string,//
    "hostype": string,
    "provinceCode": string,
    "cityCode": string,
    "districtCode": string,
    "address": string,
    "logoData": string,
    "intro": string,
    "route": string,
    "status": number,
    "bookingRule": {
        "cycle": number,
        "releaseTime": string,//
        "stopTime": string,
        "quitDay": number,
        "quitTime": string,
        "rule": string[]
    }
}

//所有详细的医院信息
export type Content=Hospital[]

export interface HospitalResponseData extends ResponseData{
    data:{
    data: {
        content: Content,
        "pageable": {
            "sort": {
                "sorted": boolean,
                "unsorted": boolean,
                "empty": boolean
            },
            "pageNumber": number,
            "pageSize": number,
            "offset": number,
            "paged": boolean,
            "unpaged": boolean
        },
        "totalPages": number,
        "totalElements": number,
        "last": boolean,
        "first": boolean,
        "sort": {
            "sorted": boolean,
            "unsorted": boolean,
            "empty": boolean
        },
        "numberOfElements": number,
        "size": number,
        "number": number,
        "empty": boolean
    }
}
}

export type renderHosHomeData={  //用于渲染home页数据
    "hosname": string,//
    "releaseTime": string,//
    "hostypeString": string,//
    "imgSrc":string,
    "hoscode":string
}


//以下为等级、地区分类的的医院信息
export interface HospitalLevelAndRegion{
    "id": number,
    "createTime": string,
    "updateTime": string,
    "isDeleted": number,
    "param": {},
    "parentId": number,
    "name": string,
    "value": string,
    "dictCode": string,
    "hasChildren": boolean
}

export type HospitalLevelAndRegionArr=HospitalLevelAndRegion[]

export  interface HospitalLevelAndRegionResponseData extends ResponseData{
    data:{
        data:HospitalLevelAndRegionArr
    }
    
}


//通过搜索医院名得到结果
export interface SearchHospitalData extends ResponseData{
    data:{
        data:Content
    }
}


//搜索框点击传递的类型
export interface clickSearchData{
    value:string,
    hoscode:string
}