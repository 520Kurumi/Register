<script setup lang="ts">
import {User} from '@element-plus/icons-vue'
import Register from '@/components/register/index.vue'
import {onMounted,ref,reactive,onBeforeUnmount} from 'vue'
import {getPatient,getCity,reqVistor,deleteVistor} from '@/api/user/index'
import {MdedicalInfoArr} from '@/api/user/type'
import type { CascaderProps } from 'element-plus'
const currentIndex=ref<number>(-1) //用于点击切换样式
const patient=ref<MdedicalInfoArr>([])
const isShow=ref<boolean>(true)
const userParams=reactive({
  name: "",
  certificatesType: "",
  certificatesNo: "",
  sex: 0,
  birthdate: "",
  phone: "",
  isMarry: 0,
  isInsure: 0,
  addressSelected: [],
  address: "",
  contactsName: "",
  contactsCertificatesType: "",
  contactsCertificatesNo: "",
  contactsPhone: "",
})
onBeforeUnmount(()=>{
    isShow.value=true
})
onMounted(async()=>{
    getPatientInfo()
})

const getPatientInfo=async()=>{
       const res=await getPatient()
   patient.value=res.data.data
   if(res.data.code===200) {
     patient.value=res.data.data
   }
}
const addVistor=()=>{
    reset()
    isShow.value=false
}


const props: CascaderProps = {
  lazy: true,
 async lazyLoad(node:any, resolve:any) {
    const res=await getCity(node.data.value||'86')

    setTimeout(() => {
      const nodes = res.data.data.map((item:any) => ({
        value: item.value,
        label: item.name,
        leaf: !item.hasChildren
      }))
      resolve(nodes)
    }, 100)
  },
}


const submit=async()=>{
    await reqVistor(userParams)
    getPatientInfo()
    isShow.value=true
}

const reset=()=>{
    Object.assign(userParams,{
    id:null,
    name:'',
    certificatesType:'',
    certificatesNo:'',
    birthdate:'',
    sex:'',
    phone:'',
    isMarry:'',
    isInsure:'',
    addressSelected:'',
    address:'',
    contactsName:'',
    contactsCertificatesType:'',
    contactsCertificatesNo:'',
    contactsPhone:''
})
}


const changeVistor=(item:any)=>{
    Object.assign(userParams,item)
    isShow.value=false
}

const deleteData=async(id:number)=>{
    await deleteVistor(id)
    getPatientInfo()
}
</script>

<template>
 <div class="container">
   <el-card class="box-card" shadow="always" v-show="isShow===true">
        <template #header>
        <div class="card-header">
            <span>救诊人管理</span>
            <el-button class="button" type="success" :icon="User" @click="addVistor">添加就诊人</el-button>
        </div>
        </template>
        <template #default>
            <div class="register">
                 <Register v-for="(item,index) in patient" 
                 :key="item.id" 
                  :item="item"  
                  :index="index" 
                  :isDeleteIcon="true" 
                  :currentIndex="currentIndex"
                  @changeVistor="changeVistor"
                  @deleteVistor="deleteData"
                  ></Register>
            </div>
        </template>
  </el-card>
    <div class="writeInfo" v-show="isShow===false">
        <el-divider content-position="left">就诊人信息</el-divider>
      <el-form style="width: 60%; margin: 10px auto">
        <el-form-item label="用户姓名">
          <el-input placeholder="请你输入用户姓名" v-model="userParams.name"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select
            placeholder="请你选择证件的类型"
            style="width: 100%"
            v-model="userParams.certificatesType"
          >
            <el-option label="身份证" value="10"></el-option>
            <el-option label="户口簿" value="20"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input
            placeholder="请你输入证件号码"
            v-model="userParams.certificatesNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="userParams.sex">
            <el-radio :label=1>男</el-radio>
            <el-radio :label=0>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-model="userParams.birthdate"
            value-format="YYYY-MM-DD"
            type="date"
            placeholder="请你选择日期"
          />
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            placeholder="请你输入用户手机号码"
            v-model="userParams.phone"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left"
        >建档信息（完善后部分医院首次就诊不排队建档）</el-divider
      >
      <el-form style="width: 60%; margin: 10px auto">
        <el-form-item label="婚姻状况">
          <el-radio-group v-model="userParams.isMarry">
            <el-radio :label=1>已婚</el-radio>
            <el-radio :label=0>未婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保">
          <el-radio-group v-model="userParams.isInsure">
            <el-radio :label=1>自费</el-radio>
            <el-radio :label=0>医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前的住址">
          <el-cascader :props="props" v-model="userParams.addressSelected" />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input
            placeholder="请你输入用户详细地址"
            v-model="userParams.address"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left">联系人信息（选填）</el-divider>
      <el-form style="width: 60%; margin: 10px auto" label-width="80">
        <el-form-item label="用户姓名">
          <el-input
            placeholder="请你输入用户姓名"
            v-model="userParams.contactsName"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select
            placeholder="请你选择证件的类型"
            style="width: 100%"
            v-model="userParams.contactsCertificatesType"
          >
            <el-option label="身份证" value="10"></el-option>
            <el-option label="户口簿" value="20"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码">
          <el-input
            placeholder="请你输入证件号码"
            v-model="userParams.contactsCertificatesNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            placeholder="请你输入用户手机号码"
            v-model="userParams.contactsPhone"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="submit">提交</el-button>
          <el-button type="primary" size="default" @click="reset">重写</el-button>
        </el-form-item>
      </el-form>
    </div>
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
