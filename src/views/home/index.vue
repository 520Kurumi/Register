<script setup lang="ts">
import Carousel from '@/views/home/Carousel.vue'
import Search from '@/views/home/Search.vue'
import Level  from  '@/views/home/Level.vue'
import Region from '@/views/home/Region.vue'
import Card from '@/views/home/Card.vue'
import Tip from '@/views/home/Tip.vue'
import {ref,onMounted} from 'vue'
import {getHospitalHome} from '@/api/home/index'
import {Content} from '@/api/home/type'  //导入类型声明
const currentPage=ref<number>(1)
const pageSize=ref<number>(15)
const total=ref<number>(0)
const hosHomeList=ref<Content>()
const hostype=ref<string>('')
const districtCode=ref<string>('')
onMounted(() => {
  getHospitalHomeRes()
})
const getHospitalHomeRes=async()=>{
 const res=await getHospitalHome(currentPage.value,pageSize.value,hostype.value,districtCode.value)
 hosHomeList.value=res.data.data.content
 total.value=res.data.data.totalElements
//  console.log(hosHomeList.value)
}

const handleSizeChange=(now:number)=>{
  currentPage.value=1
  pageSize.value=now
  getHospitalHomeRes()
  // console.log(now)
}

const handleCurrentChange=(now:number)=>{
  currentPage.value=now
  getHospitalHomeRes()
  // console.log(now)
}

const selectLevel=(value:string)=>{  //级别选择
  currentPage.value=1
  hostype.value=value
  getHospitalHomeRes()
}

const selectRegion=(value:string)=>{
  currentPage.value=1
  districtCode.value=value
  getHospitalHomeRes()
}
</script>

<template>
    <div class="home">
        <Carousel></Carousel>
        <Search></Search>
        <div class="content">
            <div class="left">
                <div class="title">医院</div>
                <div class="select">
                  <Level @selectLevel="selectLevel"></Level>
                  <Region @selectRegion="selectRegion"></Region>
                </div>
                <div class="detail">
                  <Card v-for="item in hosHomeList" 
                   :hosname="item.hosname"
                   :releaseTime="item.bookingRule.releaseTime"
                   :hostypeString="item.param.hostypeString"
                   :imgSrc="item.logoData"
                   :key="item.id"
                   :hoscode="item.hoscode"
                   ></Card>

                  <el-pagination
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-sizes="[15,20,25]"
                    :disabled="false"
                    :background="true"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                  />
                </div>
            </div>

            <div class="right">
              <Tip></Tip>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.home{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  .content{
     margin-top: 22px;
     min-width: 1200px;
     display: flex;
     .left{
        width: 1000px;
        .title{
          font-size: 16px;
          color: #333;
          width: 920px;
          height: 21px;
          font-weight: 700;
          margin:30px 0;
        }
        .select{
          width: 920px;
          height: 87px;
        }
        .detail{
          width: 910px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
            .el-pagination{
              width: 1000px;
              margin-top: 10px;
            }
        }
     }

     .right{
      margin-top: 70px;
        width: 200px;
     }
  }
}
</style>