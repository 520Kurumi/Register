<script setup lang="ts">
import {Search} from '@element-plus/icons-vue'
import {SearchHospitalData,Hospital,clickSearchData} from '@/api/home/type'
import {ref} from 'vue'
import {getSearchHospital} from '@/api/home/index'
import { useRouter } from 'vue-router'
const data=ref<string>('')
const $router=useRouter()
const querySearch=async(value:string,cb:any)=>{
  if(value===''){
    return
  }

 const res:SearchHospitalData=await getSearchHospital(value)
   const searchList=res.data.data.map((item:Hospital)=>{
      return {
        value:item.hosname, //存储医院名字
        hoscode:item.hoscode //存在医院编码
      }
   })
   cb(searchList)
}

const handleSelect=(item:clickSearchData)=>{
  // console.log(item)
  $router.push({
    path:'/hospital',
    query:{
      hoscode:item.hoscode
    }
  })
}
</script>

<template>
    <div class="searchList">
          <el-autocomplete
        v-model="data"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-50"
        placeholder="点击输入医院名称"
        @select="handleSelect"
        :icon="Search"
        trigger-on-focus=""
      />
      <el-button type="primary" :icon="Search" size="large">搜索</el-button>
    </div>


</template>

<style scoped lang="scss">
.searchList{
  margin-top: 20px;

:deep(.el-input__wrapper){
  width: 800px;
  height: 40px;
}
}

</style>
