<script setup lang="ts">
import {getOrderInfo,getCancelOrder,getQRCodeImg,getQRCodeImgStatus} from '@/api/user/index'
import {onMounted,ref} from 'vue'
import {OrderInfo} from '@/api/user/type'
import QRCode from 'qrcode'
import { ElMessage } from 'element-plus';
interface Prop{
  orderId:number
}
const props=defineProps<Prop>()
const info=ref<OrderInfo>()
const status=ref<number>(0)  //0代表预约成功，待支付  1代表已取消  2代表取消失败 3代表支付成功
const dialogVisible=ref<boolean>(false)
const imgUrl=ref<string>()
let timer=ref<any>()//定时器
onMounted(async()=>{
  const res=await getOrderInfo(props.orderId)
  info.value=res.data.data
  // console.log(props.orderId)
})

const goCancel=async()=>{
  const res=await getCancelOrder(props.orderId)
  // console.log(res)
  if(res.data.code===225){
    status.value=2
  }else if(res.data.code===200){
    status.value=1
  }
}

const openDialog=async()=>{
  dialogVisible.value=true
  const res=await getQRCodeImg(props.orderId)
  clearInterval(timer.value)
  QRCode.toDataURL(res.data.data.codeUrl).then((result:string) =>{
   imgUrl.value=result
   timer.value=setInterval(async()=>{
      const resStatus=await getQRCodeImgStatus(props.orderId)
      if(resStatus.data.data){
          clearInterval(timer.value)
          dialogVisible.value=false
          status.value=3
          ElMessage.success('支付成功')
      }
   },4000)
  }).catch((err:string)=>{
    console.log(err)
  })
  
}

const closeDialog=()=>{
  clearInterval(timer.value)
}
</script>

<template>
 <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号详细</span>
      </div>
    </template>

    <template #default>
        <div class="top">
          <el-tag class="ml-2" type="success" v-if="status===0">预约成功，待支付</el-tag>
          <el-tag class="ml-2" type="success" v-else-if="status===1">已取消</el-tag>
          <el-tag class="ml-2" type="error" v-else-if="status===2">取消失败</el-tag>
          <el-tag class="ml-2" type="success" v-else>支付成功</el-tag>
           <div class="imgInfo">
              <img src="../../../assets/images/code_app.png">
              <div class="info">
                 <p>微信关注“北京114预约挂号”</p>
                 <p>快速挂号，轻松就医</p>
              </div>
           </div>
        </div>
        <div class="bottom">
              <div class="left">
                  <el-descriptions
                    :column="1"
                    border
                  >
                      <el-descriptions-item width="100px" label="就诊人信息">{{ info?.patientName }}</el-descriptions-item>
                      <el-descriptions-item label="就诊日期">{{ info?.reserveDate }}</el-descriptions-item>
                      <el-descriptions-item label="就诊医院">{{ info?.hosname }}</el-descriptions-item>
                      <el-descriptions-item label="就诊科室">{{ info?.depname }}</el-descriptions-item>
                      <el-descriptions-item label="医生职称">{{ info?.title }}</el-descriptions-item>
                      <el-descriptions-item label="医生服务费">{{ info?.amount }}</el-descriptions-item>
                      <el-descriptions-item label="挂号订单">{{ info?.outTradeNo }}</el-descriptions-item>
                      <el-descriptions-item label="挂号时间">{{ info?.updateTime }}</el-descriptions-item>
                  </el-descriptions>
                  <div class="button" v-if="status!==1">
                    <el-popconfirm title="是否取消预约?" @confirm="goCancel">
                      <template #reference>
                        <el-button>取消预约</el-button>
                      </template>
                    </el-popconfirm>
                      <el-button type="primary" @click="openDialog">支付</el-button>
                  </div>
                 
              </div>
              <div class="right">
                <el-card class="box-card">
                  <template #header>
                    <div class="card-header">
                      <span>注意事项</span>
                    </div>
                  </template>
                   <template #default>
                    <ul>
                       <li>1、请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</li>
                       <li>2、【取号】就诊当天需在2023-08-1609:00前在医院取号，未取号视为爽约，该号不退不换；</li>
                       <li>3、【退号】在2023-08-15 15:30前可在线退号 ，逾期将不可办理退号退费；</li>
                       <li>4、北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；</li>
                       <li>5、请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。</li>
                    </ul>
                   </template>
                </el-card>
              </div>
        </div>
    </template>
  </el-card>

      <el-dialog
        v-model="dialogVisible"
        title="微信支付"
        width="30%"
        @close="closeDialog"
      >
          <div class="qrcode">
              <img :src="imgUrl" alt="">
              <p>请使用微信扫一扫</p>
              <p>扫描二维码支付</p>
          </div>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
        </template>
      </el-dialog>
</template>

<style scoped lang="scss">
.box-card{
    .card-header{
        span{
            font-size:16px;
            color:#333;
            font-weight:700;
        }
    }

    .top{
      height: 80px;
      width: 1000px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #999999a8;
      .imgInfo{
        width: 364px;
        height: 80px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        img{
          width: 61px;
          height: 61px;
        }
        .info{
          p{
            height: 26px;
            font-size: 16px;
            color:#999;
            text-align: center;
            line-height: 26px;
          }
        }

      }
    }

    .bottom{
      width: 1000px;
      display: flex;
      margin-top: 20px;
      .left{
          flex:4;
          .button{
            margin-top: 10px;
          }
      }

      .right{
        flex:6;
        .box-card{
          width: 550px;
          margin:auto 10px;
          ul{
             display: flex;
             flex-wrap: wrap;
             li{
                margin:8px 5px;
                letter-spacing: 2px;
             }
          }
        }
      }
    }


}
    .qrcode{
      width: 100%;
      height: 250px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
       img{
        width: 210px;
        height: 210px;
       }
       p{
         margin-top: 10px;
       }
    }





</style>
