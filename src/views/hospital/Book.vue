<script setup lang="ts">
import {useHospitalDetailStore} from '@/store/hospital/hospitalDetail'
import {storeToRefs} from 'pinia'
const hospitalDetail=useHospitalDetailStore()
const {hospitalDetailInfo}=storeToRefs(hospitalDetail)
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
}
</style>
