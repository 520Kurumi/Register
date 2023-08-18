<script setup lang="ts">
import {getUserOrder,getPatient,getorderStatus} from '@/api/user/index'
import { onMounted,ref } from 'vue';
import {UserOrderArr,UserOrder,MdedicalInfoArr,OrderStatusArr} from '@/api/user/type'
const userOrderData=ref<UserOrderArr>([])
const nowPage=ref<number>(1)
const pageSize=ref<number>(10)
const patientId=ref<string>('')
const orderStatus=ref<string>('')
const total=ref<number>(0)
const PatientData=ref<MdedicalInfoArr>()
const orderStatusData=ref<OrderStatusArr>()
onMounted(()=>{
    getUserOrderMethod()
    getStatusMethod()
    getPatientMethod()

})
const getStatusMethod=async()=>{
    const resStatus=await getorderStatus()
    if(resStatus.data.code===200){
        orderStatusData.value=resStatus.data.data
        console.log(orderStatusData.value)
    }
}

const getPatientMethod=async()=>{
     const resPatient=await getPatient()
    if(resPatient.data.code===200){
     PatientData.value=resPatient.data.data
   }
}
const getUserOrderMethod=async()=>{
  const resUserOrder=await getUserOrder(nowPage.value,pageSize.value,patientId.value,orderStatus.value)
  const resUserOrderData= resUserOrder.data.data
 
  if(resUserOrder.data.code===200){
    userOrderData.value=resUserOrderData.records
    total.value=resUserOrderData.total
  }
}
const showDetail=(row:UserOrder)=>{  //展示详细
    console.log(row)
}
const handleSizeChange=(size:number)=>{
    pageSize.value=size
    getUserOrderMethod()
}
const handleCurrentChange=(currentPage:number)=>{
   nowPage.value=currentPage
   getUserOrderMethod()
}

const selectPatient=(id:string)=>{
    patientId.value=id
    getUserOrderMethod()
}
const selectStatus=(status:string)=>{
    orderStatus.value=status
    getUserOrderMethod()
}
</script>

<template>
 <div class="container">
    <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号订单</span>
      </div>
    </template>
    <template #default>
        <el-form :inline="true">
            <el-form-item label="就诊人">
                <el-select placeholder="请选择就诊人" v-model="patientId">
                    <el-option label="选择所有就诊人" value=""  @click="selectPatient('')"/>
                    <el-option :label="item.name" :value="item.id" v-for="item in PatientData" :key="item.id" @click="selectPatient(item.id+'')"/>
                </el-select>
            </el-form-item>

            <el-form-item label="请选择订单状态">
                <el-select  placeholder="请选择订单状态" v-model="orderStatus">
                    <el-option  label="选择所有订单" value=""  @click="selectStatus('')" select/>
                    <el-option :label="item.comment" :value="item.status" v-for="item in orderStatusData" :key="item.status" @click="selectStatus(item.status+'')"/>
                </el-select>
            </el-form-item>
        </el-form>
        <el-table :data="userOrderData" style="width: 100%">
            <el-table-column prop="reserveDate" label="就诊时间" />
            <el-table-column prop="hosname" label="医院"  />
            <el-table-column prop="depname" label="科室" />
            <el-table-column prop="title" label="医生" />
            <el-table-column prop="amount" label="医生服务费" />
            <el-table-column prop="patientName" label="就诊人" />
            <el-table-column prop="param.orderStatusString" label="订单状态" />
            <el-table-column label="操作">
                <template #="{row}">
                    <el-button type="primary" @click="showDetail(row)">详细</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            v-model:current-page="nowPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout=" prev, pager, next,jumper, ->, sizes,total"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            />
    </template>
  </el-card>

</div>

</template>

<style scoped lang="scss">
.container{
    width: 1000px;
}
</style>
