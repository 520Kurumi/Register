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
         <div class="left"><img :src="`data:image/jpeg;base64,${hospitalDetailInfo.data.hospital.logoData}`" alt=""></div>
         <div class="right">
            <svg t="1691500022579" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6172" width="16" height="16"><path d="M596.8 994.4h-0.8c-9.6-0.8-18.4-7.2-20.8-16.8L457.6 551.2 29.6 432c-9.6-2.4-16-11.2-16.8-20.8-0.8-9.6 5.6-19.2 14.4-22.4L945.6 31.2c8.8-3.2 17.6-1.6 24 4.8 6.4 6.4 8.8 16 4.8 24l-356 920c-4 8.8-12 14.4-21.6 14.4zM107.2 406.4l375.2 104.8c8 2.4 13.6 8 16 16l102.4 372 313.6-806.4L107.2 406.4z" fill="" p-id="6173"></path><path d="M494.4 207.2h52.8v28.8h-52.8z" fill="" p-id="6174"></path></svg>
            <p>{{ hospitalDetailInfo.data.hospital.route }}</p>
         </div>
    </div>
    <div class="bottom" v-if="hospitalDetailInfo.data.hospital.intro">
            <h2>医院介绍</h2>
            <p>{{ hospitalDetailInfo.data.hospital.intro }}</p>
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
    width: 1000px;
    height: 80px;
    display: flex;
    align-items: center;
    .left{
        width: 80px;
        height: 80px;
        img{
            width: 80px;
            height: 80px;
        }
    }
    .right{
        display: flex;
        justify-content: space-between;
        margin: 10px 0 0 30px;
        width: 890px;
        height: 80px;
        p{
            font-size: 14px;
            color: #333;
            width: 843px;
        }
    }
  }

  .bottom{
    h2{
        margin-top: 40px;
        font-size: 16px;
        color:#333;
        font-weight: 700;
    }
    p{
        margin-top: 30PX;
        font-size: 12px;
        color: #666;
        width: 1000px;
        text-indent: 2em;
        line-height: 22px;
        letter-spacing: 1px;
    }
  }
}
</style>
