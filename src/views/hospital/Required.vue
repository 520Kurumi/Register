<script setup lang="ts">
import {useHospitalDetailStore} from '@/store/hospital/hospitalDetail'
import {storeToRefs} from 'pinia'
const hospitalDetail=useHospitalDetailStore()
const {hospitalDetailInfo}=storeToRefs(hospitalDetail)
</script>

<template>
 <div class="container" v-if="hospitalDetailInfo.data">
  <div class="title">
   <h2>{{ hospitalDetailInfo.data.hospital.hosname }}预约挂号须知</h2>
   <p>为方便您早日就医康复，请您认真阅读预约挂号须知：</p>
 </div>

  <div class="one">
   <h4>一、预约实名制：</h4>
   <p>统一平台电话预约和网上预约挂号均采取实名制注册预约，请您如实提供就诊人员的真实姓名、有效证件号（身份证、护照）、性别、手机号码、社保卡号等基本信息。</p>
  </div>

  <div class="two">
   <h4>二、预约挂号：</h4>
   <p>按照北京市卫健委统一平台要求，预约挂号规则如下：</p>
   <ul>
    <li>在同一自然日，同一医院，同一科室，同一就诊单元，同一就诊人，可以预约最多1个号源；</li>
    <li>在同一自然周，同一就诊人，可以预约最多8个号源；</li>
    <li>在同一自然月，同一就诊人，可以预约最多12个号源；</li>
    <li>在同一自然季度，同一就诊人，可以预约最多24个号源。</li>
   </ul>
  </div>

  <div class="three">
    <h4>三、取消预约：</h4>
    <p>已完成预约的号源，如需办理退号，至少在就诊前一工作日14:00前通过网站、微信公众号、114电话等平台预约渠道进行取消预约。</p>
  </div>

  <div class="four">
    <h4>四、爽约处理：</h4>
    <p>如预约成功后患者未能按时就诊且不办理取消预约号视为爽约，同一患者在自然年内爽约规则如下：</p>
    <ul>
      <li>累计爽约3次，自3次爽约日起，90天内不允许通过114平台进行预约挂号；</li>
      <li>累计爽约6次，自6次爽约日起，180天内不允许通过114平台进行预约挂号。</li>
    </ul>
  </div>

</div>

</template>

<style scoped lang="scss">
.container{
  h4{
    color: #333;
    font-size: 14px;
    font-weight: bold;
    margin:18px 0;
  }
    p{
      color: #666;
      font-size: 14px;
      margin: 14px 0;
      text-indent: 2em;
    }
    ul{
      margin-left: 24px;
        li{
          color: #666;
          font-size: 14px;
          list-style-type:disc;
          margin: 5px 0 5px 14px;
        }
    }

  .title{
    width: 1000px;
    h2{
      color: #333;
      text-justify: center;
      font-size: 21px;
      text-align: center;
      font-weight: bold;
    }

  }

}
</style>
