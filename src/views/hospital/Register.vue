<script setup lang="ts">
import {User} from '@element-plus/icons-vue'
import Register from '@/components/register/index.vue'
import {onMounted,ref} from 'vue'
import {getPatient,getSchedule} from '@/api/user/index'
import {MdedicalInfoArr} from '@/api/user/type'
import { useRoute } from 'vue-router'
import {ScheduleInfo} from '@/api/user/type'
import { ElMessage } from 'element-plus'
const currentIndex=ref<number>(-1) //用于点击切换样式
const $route=useRoute()
const patient=ref<MdedicalInfoArr>()
const schedule=ref<ScheduleInfo>()
onMounted(async()=>{
   const res=await getPatient()
   patient.value=res.data.data
   if(res.data.code===200) {
     patient.value=res.data.data
   }
   const resSchedule= await getSchedule($route.query.id as string)  
    if(resSchedule.data.code===200) {
        schedule.value=resSchedule.data.data
    }
    console.log(resSchedule.data.data)
})

const goSelect=(index:number)=>{
    if(currentIndex.value===index){
        currentIndex.value=-1
        return
    }
    currentIndex.value=index
}
</script>

<template>
 <div class="register-container">
      <h2 class="title">确认挂号信息</h2>
      <el-card class="box-card" shadow="always">
        <template #header>
        <div class="card-header">
            <span>请点击选择就诊人</span>
            <el-button class="button" type="success" :icon="User">添加就诊人</el-button>
        </div>
        </template>
        <template #default>
            <div class="register">
                 <Register v-for="(item,index) in patient" :key="item.id"  :item="item" :index="index" @goSelect="goSelect" :currentIndex="currentIndex"></Register>
            </div>
        </template>
  </el-card>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号信息</span>
      </div>
    </template>
    <template #default>
        <div class="table">
            <el-descriptions  :column="2" border>
                <el-descriptions-item   align="left" width="200px" label="就诊日期：">{{ schedule?.workDate }}</el-descriptions-item>
                <el-descriptions-item   align="left" width="200px" label="就诊医院：">{{schedule?.param.hosname}}</el-descriptions-item>
                <el-descriptions-item   align="left" width="200px" label="就诊科室：">{{ schedule?.param.depname }}</el-descriptions-item>
                <el-descriptions-item   align="left" width="200px" label="医生名字：">{{schedule?.docname}}</el-descriptions-item>
                <el-descriptions-item   align="left" width="200px" label="医生职称：">{{schedule?.title}}</el-descriptions-item>
                <el-descriptions-item   align="left" width="200px" label="医生专长：">{{schedule?.skill}}</el-descriptions-item>
                <el-descriptions-item   align="left" width="200px" label="医生服务费：">{{schedule?.amount}}</el-descriptions-item>
            </el-descriptions>
        </div>
    </template>
  </el-card>
    <div class="button">
        <el-button type="primary" v-if="currentIndex!==-1"  @click="ElMessage.success('预约成功')">点击预约</el-button>
        <el-button type="info" v-else @click="ElMessage.error('请选择就诊人')">点击预约</el-button>
    </div> 
 </div>
  
</template>

<style scoped lang="scss">
  .register-container{
    width: 1000px;
    margin-left: 20px;
    margin-bottom: 100px;
    .title{
        color:#333;
        font-size:16px;
        font-weight: 700;
    }
    .box-card{
        margin: 20px;
        width: 1000px;
        .card-header{
            display: flex;
            justify-content: space-between;
        }
        .register{
            width: 1000px;
            display: flex;
            flex-wrap: wrap;
            // justify-content: space-around;
            // flex-direction: column;
        }
    }

    .button{
        position: relative;
        left:450px;
    }
  }
</style>
