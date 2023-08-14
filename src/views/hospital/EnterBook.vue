<script setup lang="ts">
import {onMounted,ref} from 'vue'
import {getEnterBook,getBookingDoctor} from '@/api/hospital/index'
import { useRoute,useRouter } from 'vue-router';
import {BookingScheduleData,BookingDoctorResponseData,BookingScheduleInfo} from '@/api/hospital/type'
import { ElMessage } from 'element-plus'
const $route=useRoute()
const $router=useRouter()
const nowIndex=ref<number>(0)
const booksChedule=ref<BookingScheduleData>() //部门排班表
const booksDoctor=ref<BookingDoctorResponseData>()//选定当天医生安排
const nowPage=ref<number>(1)
const hoscode:string=$route.query.hoscode as string//医院编号
const depcode:string=$route.query.depcode as string//部门编号
const status=ref<number>(0) //-1代表停止挂号 0代表无号 1代表有号 2代表即将挂号
const lastTime=ref<string>('')
onMounted(()=>{
    getEnterBookList()
    getLastTime() //进入页面后开始进行倒计时
})
const getLastTime=()=>{ //用于计算明天挂号倒计时
    setInterval(()=>{
        const nowDate=new Date()
        const relaseDate=new Date(`${nowDate.getUTCFullYear()}-${nowDate.getMonth()+1}-${nowDate.getDate()+1} 08:30:00`)
        const totalseconds= +((relaseDate.getTime()-nowDate.getTime())/1000).toFixed(0)
        const hours=(totalseconds/60/60).toFixed(0)
        const minutes=(totalseconds/60%60).toFixed(0)
        const seconds=(totalseconds%60).toFixed(0)
        lastTime.value=`${hours} 时 ${minutes} 分 ${seconds} 秒`
    },1000)

}
const getStatus=(item:BookingScheduleInfo)=>{ //用于判断挂号状态
   if(item.status===-1){
      status.value=-1
   }else if(item.status===0&&item.availableNumber>0){
      status.value=1
   }else if(item.status===0&&item.availableNumber<=0){
      status.value=0
   }else{
      status.value=2
   }
//    console.log(status.value)
}

const change=(e:any)=>{
//  console.log(nowPage.value,e)
 nowPage.value=e
 getEnterBookList()
}
const getEnterBookList=async ()=>{
    const res =await getEnterBook(nowPage.value,7,hoscode ,depcode )
    booksChedule.value=res.data.data
    // console.log(res.data.data)
    nowIndex.value=0 //每次翻页默认重新获取排班
    getStatus(booksChedule.value.bookingScheduleList[0]) //默认获取当前页第一个的状态
    getBookingDoctorList(booksChedule.value.bookingScheduleList[0],0) //翻页后，默认第一个后读取其对应的医生安排表
}

const getBookingDoctorList=async(item:BookingScheduleInfo,index:number)=>{
    nowIndex.value=index //nowIndex记录当前点击第几个预约日期
    const res:{data:BookingDoctorResponseData}=await getBookingDoctor(hoscode,depcode ,item.workDate)
    getStatus({'status':item.status,'availableNumber':item.availableNumber} as BookingScheduleInfo)
    booksDoctor.value=res.data
    // console.log(res.data)
}

const goRegister=(id:string)=>{
    ElMessage.success('点击成功！')
    $router.push({
        path:'/hospital/register',
        query:{
            id
        }
    })
}
</script>

<template>
 <div class="container">
    <div class="head">
        <span>{{booksChedule?.baseMap.hosname}}</span>
        <span class="split">|</span>
        <span>{{booksChedule?.baseMap.bigname}}</span>
    </div>
    <h2 class="title">{{booksChedule?.baseMap.depname}}</h2>
    <div class="bookTime">
        <h3 class="nowTime">{{booksChedule?.baseMap.workDateString}}</h3>
        <div class="contain-bookTime">
            <div  class="bookTimeList" v-for="(item,index) in booksChedule?.bookingScheduleList" @click="getBookingDoctorList(item as BookingScheduleInfo,index)">
                 <div class="top" :class="{'active':nowIndex===index}">
                    <span>{{ item.workDate }}</span>
                    <span style="font-size: 12px;">{{item.dayOfWeek}}</span>
                 </div>
                 <div class="bottom">
                    <p v-if="item.status===-1" :style="{fontWeight:(nowIndex===index?'700':'')}">停止挂号</p>
                    <p v-else-if="item.status===0&&item.availableNumber>0" :style="{fontWeight:(nowIndex===index?'700':'')}">有号</p>
                    <p v-else-if="item.status===0&&item.availableNumber<=0" :style="{fontWeight:(nowIndex===index?'700':'')}">无号</p>
                    <p v-else :style="{fontWeight:(nowIndex===index?'700':'')}">即将放号</p>
                 </div>
            </div>
        </div>
        <div class="pagination">
            <el-pagination layout="prev, pager, next" :total="booksChedule?.total" @current-change="change"/>
        </div>
    </div>

    <div class="doctor">
        <div class="last-time" v-if="status===2">
            <div class="time-title">明天 <span>08:30</span> 放号</div>
            <div class="count-time">倒 计 时 <span>{{ lastTime }}</span></div>
        </div>
        <div class="detail-doctor" v-else>
                <div class="top">
                     <h2 class="title">上午号源</h2>
                     <div class="top-doctor"  v-for="item in booksDoctor?.data" :key="item.id">
                        <div class="main" v-if="item.workTime===0">
                            <div class="left">
                                 <h2 class="level">{{item.title}} &nbsp;&nbsp;{{ item.docname }}</h2>
                                 <h2 class="info">{{item.skill}}</h2>
                            </div>

                            <div class="right">
                                <p class="fee">￥{{ item.amount }}</p>
                                <div class="button"> 
                                    <el-button type="info" size="large" v-if="status===-1||status===0" @click=" ElMessage.error('预约失败')">剩余{{ item.availableNumber }}</el-button>
                                    <el-button type="primary" size="large" @click="goRegister(item.id)" v-else>剩余{{ item.availableNumber }}</el-button>
                                </div>
                            </div>
                        </div>   
                     </div>
                </div>

                <div class="bottom">
                        <h2 class="title">下午号源</h2>
                        <div class="bottom-doctor" v-for="item in booksDoctor?.data" :key="item.id">
                            <div class="main" v-if="item.workTime===1">
                                <div class="left">
                                    <h2 class="level">{{item.title}}</h2>
                                    <h2 class="info">{{item.skill}}</h2>
                                </div>
                                <div class="right">
                                    <p class="fee">￥{{ item.amount }}</p>
                                    <div class="button">
                                        <el-button type="info" size="large" v-if="status===-1||status===0"  @click=" ElMessage.error('预约失败')">剩余{{ item.availableNumber }}</el-button>
                                        <el-button type="primary" size="large" @click="goRegister(item.id)" v-else>剩余{{ item.availableNumber }}</el-button>
                                    </div>
                                </div>
                            </div>
                            
                     </div>
                </div>
        </div>
    </div>
 </div>

</template>

<style scoped lang="scss">
.container{
    .head{
        display: flex;
        color:#666;
        font-size: 14px;
        .split{
            margin: 0 10px;
            font-weight: 100;
        }
    }

    .title{
        color:#333;
        font-size: 16px;
        margin-top: 20px;
        font-weight: 700;

    }

    .bookTime{
        width: 1000px;
        height: 191px;
        margin-left: 30px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .nowTime{
            width: 1000px;
            height: 19px;
            line-height: 19px;
            text-align: center;
            color:#333;
            font-size: 14px;
            margin-bottom: 20px;
        }
        .contain-bookTime{
            width: 1000px;
            height: 80px;
            display: flex;
            // justify-content: start;
            
            .bookTimeList{
                width: 124px;
                height: 80px;
                cursor: pointer;
                border-radius: 4px;
                border: 1px solid #e8f2ff;
                margin: 0 10px;
                .top{
                    width: 124px;
                    height: 36px;
                    background-color: #e8f2ff;
                    color: #4990f1;
                    font-size: 14px;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    &.active{
                        background-color: #4990f1;
                        color:#e8f2ff;
                    }
                }
                .bottom{
                    width: 124px;
                    height: 40px;
                    color: #4990f1;
                    font-size: 14px;
                    line-height: 40px;
                    text-align: center;
                }
            }
        }
        .pagination{
            margin: 35px 0;
        }
    }

    .doctor{
        width: 1000px;
        height: 81px;
        margin-top: 16px;
        .last-time{
            width: 1000px;
            height: 81px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        .time-title{
            width: 120px;
            height: 21px;
            font-size: 16px;
            color: #333;
            span{
                color:#4490f1;
            }
        }
        .count-time{
            width: 327px;
            height: 40px;
            color:#999;
            font-size: 16px;
            margin-top: 20px;
            span{
                font-size: 30px;
                color:#4490f1;
            }
        }
      }

      .detail-doctor{
        width: 1000px;
        // height: 1000px;
        margin-bottom: 180px;
        .top{
            width:1000px;
            width: 1000px;
            .title{
                color: #999;
                font-size: 14px;
                width: 1000px;
            }
            .title::before{
                display: inline;
                content: '|';
                color:#4490f1
            }
            .top-doctor{
                // margin-top: 40px;
                // width: 1000px;
                // // height: 68px;
                // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                .main{
                 margin-top: 40px;
                width: 1000px;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                width: 1000px;
                height: 68px;
                .left{
                    width: 660px;
                    height: 68px;
                    .level{
                        font-size: 14px;
                        color:#333;
                        width: 660px;
                        margin-bottom: 20px;
                    }
                    .info{
                        margin-top: 10px;
                        width: 660px;
                        font-size: 14px;
                        color:#999;
                    }
                }
                .right{
                    width: 201px;
                    height: 68px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    .fee{
                        font-size: 14px;
                        color:#4490f1;
                    }
                    .buttom{
                        width: 140px;
                        height: 44px;
                    }
                }
            }
            }
        }

        .bottom{
            width: 1000px;
            margin-top: 60px;
            margin-bottom: 180px;
            .title{
                color: #999;
                font-size: 14px;
                width: 1000px;
            }
            .title::before{
                display: inline;
                content: '|';
                color:#4490f1
            } 
            .bottom-doctor{
                // margin-top: 40px;
                // width: 1000px;
                // height: 68px;
                // border-bottom: 1px solid rgba(0, 0, 0, 0.1);

              .main{
                margin-top: 40px;
                width: 1000px;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                width: 1000px;
                height: 68px;
                .left{
                    width: 660px;
                    height: 68px;
                    .level{
                        font-size: 14px;
                        color:#333;
                        width: 660px;
                        margin-bottom: 20px;
                    }
                    .info{
                        margin-top: 10px;
                        width: 660px;
                        font-size: 14px;
                        color:#999;
                    }
                }
                .right{
                    width: 201px;
                    height: 68px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    .fee{
                        font-size: 14px;
                        color:#4490f1;
                    }
                    .buttom{
                        width: 140px;
                        height: 44px;
                    }
                }
             }
            }           
        }
        .bottom::after{
            content: '';
            display: block;
            width: 1000px;
            height: 100px;
        }
      }
    }
}
</style>
