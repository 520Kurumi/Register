import { defineStore } from 'pinia'
import {HospitalTotalData} from '@/api/hospital/type'
import {getHospitalDetail} from '@/api/hospital/index'
// 第一个参数是应用程序中 store 的唯一 id
export const useHospitalDetailStore = defineStore('hospitalDetail', {
     state:()=>({
        hospitalDetailInfo:({} as HospitalTotalData)
     }),
    actions:{
       async getHospitalDetailAction(hoscode:string){
             const res:{ data:HospitalTotalData} =await getHospitalDetail(hoscode)
            //  console.log(res.data.data)
             if(res.data.code===200){
                this.hospitalDetailInfo=res.data
             }
             
        }
     }
})