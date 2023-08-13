<script setup lang="ts">
import {ref} from 'vue'
import {useHospitalDetailStore} from '@/store/hospital/hospitalDetail'
import {storeToRefs} from 'pinia'
import { useRouter,useRoute } from 'vue-router';
const hospitalDetail=useHospitalDetailStore()
const {hospitalDetailInfo,hospitalDepartment}=storeToRefs(hospitalDetail)
const currentIndex=ref<number>(0)
const name=ref([])
const $router=useRouter()
const $route=useRoute()
const selectDepart=(index:number)=>{
  currentIndex.value=index
  // console.log(name.value[0])
  const dom=name.value[index] as HTMLLIElement
   dom.scrollIntoView({
     behavior:'smooth',
     block:'start'
   })
}

const enterBook=(depcode:string)=>{
   $router.push({
      path:'/hospital/enterbook',
      query:{
        "depcode":depcode,
        "hoscode":$route.query.hoscode
      }
   })
}
</script>

<template>
  <div class="container" v-if="hospitalDetailInfo.data">
    <div class="head">
       <span class="title">{{ hospitalDetailInfo.data.hospital.hosname }}</span>
       <div>
          <svg t="1691497256414" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4188" width="16" height="16"><path d="M192.07 447.3m63.63 0l0 0q63.63 0 63.63 63.63l0 192.14q0 63.63-63.63 63.63l0 0q-63.63 0-63.63-63.63l0-192.14q0-63.63 63.63-63.63Z" fill="#999999" p-id="4189"></path><path d="M449.43 320.29m63.63 0l0 0q63.63 0 63.63 63.63l0 319.16q0 63.63-63.63 63.63l0 0q-63.63 0-63.63-63.63l0-319.16q0-63.63 63.63-63.63Z" fill="#999999" p-id="4190"></path><path d="M703.34 193.2m63.63 0l0 0q63.63 0 63.63 63.63l0 446.24q0 63.63-63.63 63.63l0 0q-63.63 0-63.63-63.63l0-446.24q0-63.63 63.63-63.63Z" fill="#999999" p-id="4191"></path></svg>
          <span class="level">{{ hospitalDetailInfo.data.hospital.param.hostypeString }}</span>
       </div>
    </div>
    <div class="main">
        <div class="left">
          <img :src="`data:image/jpeg;base64,${hospitalDetailInfo.data.hospital.logoData}`" alt="">
        </div>
        <div class="right">
             <h3>挂号规则</h3>
             <div class="line">
               <span>预约周期:</span>  <span class="special">{{ hospitalDetailInfo.data.bookingRule.cycle }}天</span>
               <span>放号时间:</span>  <span class="special">{{ hospitalDetailInfo.data.bookingRule.releaseTime }}</span>
               <span>停挂时间:</span>  <span class="special">{{ hospitalDetailInfo.data.bookingRule.stopTime }}</span>
             </div>
             <div class="line">
              <span>退号时间:</span> <span class="special">就诊前一工作日{{hospitalDetailInfo.data.bookingRule.quitTime}}前取消</span>
             </div>
             <h3>医院预约规则</h3>
             <ol v-for="item in hospitalDetailInfo.data.bookingRule.rule">
                <li  class="common">{{ item}}</li>

             </ol>
        </div>
    </div>
<h2 v-if="hospitalDepartment">选择科室</h2>
    <div class="bottom" v-if="hospitalDepartment">
        
        <div class="bottom-left">
           <ul>
              <li v-for="(item,index) in hospitalDepartment" :class="{active:currentIndex===index}" @click="selectDepart(index)">{{ item.depname }}</li>
           </ul>
        </div>
        <div class="bottom-right">
              <div class="detailDepart" v-for="item in hospitalDepartment" >
                      <h2 ref="name">{{ item.depname }}</h2>
                      <ul>
                         <li v-for="detail in item.children" @click="enterBook(detail.depcode)">{{ detail.depname }}</li>
                      </ul>
              </div>
        </div>
    </div>

  </div>

</template>

<style scoped lang="scss">
.container{
  width: 1000px;
  height: 196px;
  .head{
    width: 1000px;
    height: 46px;
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    .title{
      font-size: 20px;
      color:#333;
      margin-right: 15px;
    }
    div{
      display: flex;
      align-items: center;
      .level{
        font-size: 14px;
        color:#999;
      }
    }
  }
  .main{
    display: flex;
    .left{
      width: 80px;
      margin-right: 30px;
      img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
    }
    .right{
      width: 890px;
      height: 196px;
      h3{
        margin-top: 10px;
        font-size: 16px;
        color: #333;
      }
      .line{
        margin-top: 8px;
        margin-bottom: 8px;
        font-size: 12px;
        color: #999;
      }
      .special{
        font-size: 12px;
        color:#333;
        margin-right: 60px;
        line-height: 12px;
      }
      ol{
        list-style-type: roman;
        .common{
          margin-top: 10px;
          margin-left: 12px;
          font-size: 12px;
          color: #999;
          line-height: 12px;

        }
      }
    }
  }
    h2{
      color: #333;
      font-size: 16px;
      font-weight: 700;
      margin: 10px 30px;
    }
  .bottom{
    width: 1000px;
    display: flex;

    .bottom-left{
      width: 170px;
      ul{
        background: #f4f9ff;
        width: 170px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      li{
        width: 100%;
        background: #f4f9ff;
        font-size: 14px;
        color:#333;
        margin: 2px 0;
        text-align: center;
        height: 40px;
        line-height:40px;
        cursor: pointer;
        &.active{
          background-color: #fff;
          font-size: 16px;
          font-weight: 700;
          border-left: 1px red solid;
        }
      }
    }

    .bottom-right{
      width: 780px;
      height: 600px;
      overflow-y: auto;
      &::-webkit-scrollbar{
        display: none;
      }
      .detailDepart{
        display: flex;
        flex-wrap: wrap;
        width: 780px;
        margin: 0 0 20px 30px;
        h2{
          width: 100%;
        }
        ul{
          display: flex;
          flex-wrap: wrap;
          // justify-content: space-around;
          li{
            font-size: 14px;
            color:#666;
            margin-right: 40px;
            margin-top: 5px;
            width: 200px;
            height: 20px;
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
