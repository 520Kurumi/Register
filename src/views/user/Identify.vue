<script setup lang="ts">
import {InfoFilled,Plus} from '@element-plus/icons-vue'
import {reactive,onMounted,ref} from 'vue'
import {getUserInfo} from '@/api/user/index'
import {UserInfo} from '@/api/user/type'
const ruleForm=reactive({
  name:'',
  type:'',
  no:''
})
const userInfo=ref<UserInfo>()
onMounted(async()=>{
   const resUserInfo=await getUserInfo()
  //  console.log(resUserInfo)
  if(resUserInfo.data.code===200){
     userInfo.value=resUserInfo.data.data
  }
  
})

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
                    
                  >
                    <el-form-item label="用户姓名" prop="name">
                        <el-input clearable v-model="ruleForm.name" placeholder="请输入用户姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="证件类型" prop="type">
                      <el-select
                        v-model="ruleForm.type"
                        placeholder="请选择证件类型"
                        clearable
                        style="width: 500px;"
                      >
                          <el-option label="身份证" value="id" />
                          <el-option label="户口簿" value="book" />
                      </el-select>
                    </el-form-item>

                    <el-form-item label="证件号码" prop="no">
                        <el-input  clearable v-model="ruleForm.no" placeholder="请输入证件号码"></el-input>
                    </el-form-item>

                    <el-form-item label="上传证件">
                          <el-upload
                            v-model:file-list="fileList"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                          >
                            <el-icon><Plus /></el-icon>
                          </el-upload>

                          <el-dialog v-model="dialogVisible">
                            <img w-full :src="dialogImageUrl" alt="Preview Image" />
                          </el-dialog>
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
