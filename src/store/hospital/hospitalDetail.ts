import { defineStore } from 'pinia'
import {HospitalTotalData,HospitalDepartmentResponseData,HospitalDepartmentArr} from '@/api/hospital/type'
import {getHospitalDetail,getHospitalDepartment} from '@/api/hospital/index'
// 第一个参数是应用程序中 store 的唯一 id
export const useHospitalDetailStore = defineStore('hospitalDetail', {
     state:()=>({
        hospitalDetailInfo:({} as HospitalTotalData),
        hospitalDepartment:([] as HospitalDepartmentArr)
     }),
    actions:{
       async getHospitalDetailAction(hoscode:string){
             const res:{ data:HospitalTotalData} =await getHospitalDetail(hoscode)
            //  console.log(res.data.data)
             if(res.data.code===200){
                this.hospitalDetailInfo=res.data
             }
             
        },
        async getHospitalDepartmentAction(hoscode:string){
            const res:HospitalDepartmentResponseData=await getHospitalDepartment(hoscode)
            // console.log(res.data.data)  
           
            if(res.data.code===200){
               // alert(666)
               this.hospitalDepartment=res.data.data
            }
        }
     }
})