<script setup lang="ts">
import {Edit,Delete} from '@element-plus/icons-vue'
import {MdedicalInfo} from '@/api/user/type'
import { ref } from 'vue';
interface Props{
  item:MdedicalInfo,
  index:number,
  currentIndex:number,
  isDeleteIcon:boolean
}
defineProps<Props>()

const emits= defineEmits(['goSelect','changeVistor','deleteVistor'])
const dialogVisible=ref<boolean>(false)
const select=(index:number)=>{
      emits('goSelect',index)
}
const change=(item:MdedicalInfo)=>{
  emits('changeVistor',item)
}
const deleteData=(id:number)=>{
  dialogVisible.value=false
  emits('deleteVistor',id)
}

</script>

<template>
 <div class="detail-container" @click="select(index)">
    <el-card class="box-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <div class="title">
           <span class="medical">{{ item.isInsure===1?'医保':'自费' }}</span>
           <span class="name">{{item.name}}</span>
        </div>
        <div class="button">
             <el-button type="primary" :icon="Edit" circle  @click="change(item)"/>
             <el-button type="danger" v-if="isDeleteIcon===true" :icon="Delete" circle @click="dialogVisible=true"></el-button>
        </div>

      </div>
    </template>

    <template #default>
        <ul>
          <li>证件类型：{{ item.param.certificatesTypeString }}</li>
          <li>证件号码：{{ item.certificatesNo }}</li>
          <li>用户性别：{{ item.sex===1?'男':'女' }}</li>
          <li>出生日期：{{ item.birthdate }}</li>
          <li>手机号码：{{ item.phone }}</li>
          <li>婚姻状况：{{ item.isMarry===1?'已婚':'未婚' }}</li>
          <li>当前住址：{{ item.param.cityString }}</li> 
          <li>详细地址：{{ item.param.fullAddress }}</li> 
        </ul>
    </template>
  </el-card>
  <div class="select" v-if="index==currentIndex">已选择</div>
 </div>
  <el-dialog
      v-model="dialogVisible"
      width="30%"
      title="请确认操作"
    >
    <h2>是否确认删除</h2>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteData(item.id)">
          确定
        </el-button>
      </span>
    </template>
    </el-dialog>
</template>

<style scoped lang="scss">
.detail-container{
  width:300px;
  margin:10px 5px;
  position: relative;
  .box-card{
    // width:30%;
    width:300px;
    :deep(.el-card__header){
       background-color: #999999;
    }
    .card-header{
      display:flex;
      justify-content:space-between;
      align-items: center;
      .title{
        width: 100px;
        display: flex;
        white-space: nowrap;
        .medical{
          color: #666;
          background-color: white;
          margin-right: 10px;
        }
      }
    }
    ul{
      width: 90%;
      height: 100%;
      li{
        margin:20px 10px ;
        white-space: nowrap;
      }
    }
  }
  .select{
    position: absolute;
    width: 200px;
    color:red;
    height: 200px;
    border-radius: 50%;
    border: 1px dashed red;
    text-align: center;
    line-height: 200px;
    z-index:2;
    top:130px;
    left: 60px;
    transform: rotate(45deg);
    opacity: 0.4;
  }
}
</style>
