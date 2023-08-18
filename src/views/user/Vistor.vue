<script setup lang="ts">
import {User,Delete} from '@element-plus/icons-vue'
import Register from '@/components/register/index.vue'
import {onMounted,ref} from 'vue'
import {getPatient} from '@/api/user/index'
import {MdedicalInfoArr} from '@/api/user/type'
const currentIndex=ref<number>(-1) //用于点击切换样式
const patient=ref<MdedicalInfoArr>([])
onMounted(async()=>{
   const res=await getPatient()
   patient.value=res.data.data
   if(res.data.code===200) {
     patient.value=res.data.data
   }

})
</script>

<template>
 <div>
   <el-card class="box-card" shadow="always">
        <template #header>
        <div class="card-header">
            <span>救诊人管理</span>
            <el-button class="button" type="success" :icon="User">添加就诊人</el-button>
        </div>
        </template>
        <template #default>
            <div class="register">
                 <Register v-for="(item,index) in patient" :key="item.id"  :item="item" :index="index" :isDeleteIcon="true" :currentIndex="currentIndex"></Register>
            </div>
        </template>
  </el-card>
 </div>

</template>

<style scoped lang="scss">
    .box-card{
        margin: 20px;
        width: 1000px;
        .card-header{
            display: flex;
            justify-content: space-between;
        }
        .register{
            cursor: pointer;
            width: 1000px;
            display: flex;
            flex-wrap: wrap;
            // justify-content: space-around;
            // flex-direction: column;
        }
    }
</style>
