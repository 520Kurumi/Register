<script setup lang="ts">
import {InfoFilled,Plus} from '@element-plus/icons-vue'
import {reactive,onMounted,ref} from 'vue'
import {getUserInfo,postIdentify} from '@/api/user/index'
import {UserInfo} from '@/api/user/type'
import { ElMessage } from 'element-plus';
const ruleForm=reactive({
    "certificatesNo": "",
    "certificatesType": "",
    "certificatesUrl": "",
    "name": ""
})
const dialogVisible=ref<boolean>(false)
const userInfo=ref<UserInfo>()
const upload=ref()
const ruleFormRef=ref()
onMounted(async()=>{
   const resUserInfo=await getUserInfo()
  //  console.log(resUserInfo)
  if(resUserInfo.data.code===200){
     userInfo.value=resUserInfo.data.data
  }
  
})

const handleRemove=()=>{
  ruleForm.certificatesUrl=''
}

const handlePictureCardPreview=()=>{
  dialogVisible.value=true
}

const successhandler=(response: any)=>{
  ruleFormRef.value.clearValidate('certificatesUrl')

  ruleForm.certificatesUrl=response.data
  
}

const exceedhandler=()=>{
  ElMessage.error('最多只能上传一张图片')
}

const reset=()=>{
  upload.value.clearFiles()
  Object.assign(ruleForm, {
    "certificatesNo": "",
    "certificatesType": "",
    "certificatesUrl": "",
    "name": ""
  });
}

const submit=async()=>{
  await ruleFormRef.value.validate();
  try{
    await postIdentify(ruleForm)
    ElMessage.success('认证成功')
     await getUserInfo()
     location.reload()
  }catch(err){
    ElMessage.error('认证失败')
  }
}
const rules={
  name:[
    {
      required:true,validator:(_rule: any, value: any, callback: any)=>{
            const reg=/[\u4e00-\u9fa5]/
            if(reg.test(value)){
              callback()
            }else{
              callback(new Error('请输入正确的姓名'))
            }
    }
  }],
  certificatesType:[
    {
      required:true,validator:(_rule: any, value: any, callback: any)=>{
               if(value==='10'||value==='20'){
                  callback()
               }else{
                callback(new Error('请选择证件'))
               }
      }
    }
  ],
  certificatesUrl:[
    {
      required:true,validator:(_rule: any, value: any, callback: any)=>{
           if(value!==''){
            callback()
           }else{
            callback(new Error('请上传图片'))
           }
      }
  }],
  certificatesNo:[
    {
      
        required:true,validator:(_rule: any, value: any, callback: any)=>{
         const reg1=/^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/
         const reg2=/^[a-zA-Z0-9]{3,21}$/
         if(reg1.test(value)||reg2.test(value)){
          callback()
         }else{
          callback(new Error('请输入正确的证件号'))
         }
      }
    }
  ]
}
    


</script>

<template>
 <div>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>实名信息</span>
      </div>
    </template>
     <template #default>
          <div class="infoId" style="color:#7f7f7f">
            <div class="intro">
               <el-icon><InfoFilled /></el-icon> 
               <span>完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。</span>
            </div>
              <div class="hasIdentify" v-if="userInfo?.authStatus===1">
                  <el-descriptions :column="1" border >
                    <el-descriptions-item label="用户姓名" >{{ userInfo?.name }}</el-descriptions-item>
                    <el-descriptions-item label="证件类型" >{{ userInfo?.certificatesType==='10'?'身份证':'户口簿' }}</el-descriptions-item>
                    <el-descriptions-item label="证件号码" >{{ userInfo?.certificatesNo }}</el-descriptions-item>
                  </el-descriptions>
              </div>
              <div class="noIdentify" v-else>
                  <el-form
                    ref="ruleFormRef"
                    :model="ruleForm"
                    :rules="rules"
                  >
                    <el-form-item label="用户姓名" prop="name">
                        <el-input clearable v-model="ruleForm.name" placeholder="请输入用户姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="证件类型" prop="certificatesType">
                      <el-select
                        v-model="ruleForm.certificatesType"
                        placeholder="请选择证件类型"
                        clearable
                        style="width: 500px;"
                      >
                          <el-option label="身份证" value="10" />
                          <el-option label="户口簿" value="20" />
                      </el-select>
                    </el-form-item>

                    <el-form-item label="证件号码" prop="certificatesNo">
                        <el-input  clearable v-model="ruleForm.certificatesNo" placeholder="请输入证件号码"></el-input>
                    </el-form-item>

                    <el-form-item label="上传证件" prop="certificatesUrl">
                          <el-upload
                          action="/api/oss/file/fileUpload?fileHost=userAuah"
                            list-type="picture-card"
                            :limit="1"
                            ref="upload"
                            :on-remove="handleRemove"
                            :on-preview="handlePictureCardPreview"
                            :on-success="successhandler"
                            :on-exceed="exceedhandler"
                          >
                            <el-icon><Plus /></el-icon>
                          </el-upload>

                          <el-dialog v-model="dialogVisible">
                            <img w-full :src="ruleForm.certificatesUrl" alt="Preview Image" style="width: 100%; height: 100%"/>
                          </el-dialog>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submit">提交</el-button>
                         <el-button type="primary" @click="reset">重置</el-button>
                    </el-form-item>


                  </el-form>
              </div>
          </div>
     </template>
  </el-card>
 </div>

</template>

<style scoped lang="scss">
.box-card{
  .card-header{
    span{
      font-weight: 700;
    }
  }
  .infoId{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    .intro{
      color:#999;
      font-size: 14px;
      display: flex;
      justify-content: center;
    }
    .hasIdentify{
        width: 500px;
        margin-top: 20px;
    }
    .noIdentify{
      margin-top: 20px;
      width: 500px;
    }
  }
}

.box-card .hasIdentify :deep(.el-descriptions__label){
  width: 200px;
  text-align: center;
}
</style>
