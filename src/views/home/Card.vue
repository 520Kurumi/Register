<script setup lang="ts">
import {renderHosHomeData} from '@/api/home/type'
import {useRouter} from 'vue-router'
const res:renderHosHomeData=defineProps<renderHosHomeData>()
const $router=useRouter()
// console.log(res.hoscode)
const goDetail=(hoscode:string)=>{
    // console.log(hoscode)
    $router.push({
       path: '/hospital',
        query:{
            hoscode
        }
    })
}
</script>

<template>
    <el-card class="box-card" shadow="hover" @click="goDetail(res.hoscode)">
      <div class="content">
            <div class="left">
                <div class="hospital-title">{{hosname}}</div>
                <div class="container-bottom">
                    <div class="bottom-left">
                        <svg t="1691385188765" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2282" width="16" height="16"><path d="M832 364.8h-147.2s19.2-64 32-179.2c6.4-57.6-38.4-115.2-102.4-121.6h-12.8c-51.2 0-83.2 32-102.4 76.8l-38.4 96c-32 64-57.6 102.4-76.8 115.2-25.6 12.8-121.6 12.8-128 12.8H128c-38.4 0-64 25.6-64 57.6v480c0 32 25.6 57.6 64 57.6h646.4c96 0 121.6-64 134.4-153.6l51.2-307.2c6.4-70.4-6.4-134.4-128-134.4z m-576 537.6H128V422.4h128v480z m640-409.6l-51.2 307.2c-12.8 57.6-12.8 102.4-76.8 102.4H320V422.4c44.8 0 70.4-6.4 89.6-19.2 32-12.8 64-64 108.8-147.2 25.6-64 38.4-96 44.8-102.4 6.4-19.2 19.2-32 44.8-32h6.4c32 0 44.8 32 44.8 51.2-12.8 102.4-32 166.4-32 166.4l-25.6 83.2h243.2c19.2 0 32 0 44.8 12.8 12.8 12.8 6.4 38.4 6.4 57.6z" p-id="2283"></path></svg>
                        <span>{{hostypeString}}</span> 
                    </div>
                    <div class="bottom-right">
                        <svg t="1691385278976" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3490" width="16" height="16"><path d="M917.333333 512c0-223.850667-181.482667-405.333333-405.333333-405.333333S106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333z m-425.984-5.333333a21.333333 21.333333 0 0 0 6.101334 20.928l124.8 116.394666a21.333333 21.333333 0 0 0 29.12-31.189333l-118.08-110.122667L533.333333 501.333333v-170.666666a21.333333 21.333333 0 0 0-42.666666 0v170.666666c0 1.834667 0.213333 3.626667 0.682666 5.333334zM149.333333 512c0-200.298667 162.368-362.666667 362.666667-362.666667s362.666667 162.368 362.666667 362.666667-162.368 362.666667-362.666667 362.666667S149.333333 712.298667 149.333333 512z m612.501334 305.002667a21.333333 21.333333 0 1 0-30.336 29.994666l74.304 75.157334a21.333333 21.333333 0 1 0 30.336-29.994667l-74.304-75.157333z m-480.362667 29.994666a21.333333 21.333333 0 0 0-30.336-29.994666L176.832 892.16a21.333333 21.333333 0 1 0 30.336 29.994667l74.304-75.157334zM778.496 128A117.525333 117.525333 0 0 1 896 245.333333a21.333333 21.333333 0 0 0 42.666667 0C938.666667 157.077333 866.901333 85.333333 778.496 85.333333h-20.992a21.333333 21.333333 0 1 0 0 42.666667h20.992zM245.504 85.333333C157.098667 85.333333 85.333333 157.077333 85.333333 245.333333a21.333333 21.333333 0 0 0 42.666667 0C128 180.629333 180.672 128 245.504 128h20.992a21.333333 21.333333 0 1 0 0-42.666667h-20.992z" fill="#3D3D3D" p-id="3491"></path></svg>
                        <span>每天{{releaseTime}}放号</span>
                    </div>
                </div>
            </div>

            <div class="right">
                <img :src="`data:image/jpeg;base64,${imgSrc}`" alt="">
            </div>
      </div>

    </el-card>

</template>

<style scoped lang="scss">

    .box-card{
        width: 440px;
        height: 110px;
        margin:  5px 1px;
        cursor: pointer;
        .content{
            display: flex;
            .left{
                width: 318px;
                height: 76px;

                .hospital-title{
                    width: 318px;
                    height: 42px;
                }
                .container-bottom{
                    display: flex;
                    width: 250px;
                    height: 20px;
                    justify-content: space-between;
                    .bottom-left{
                        display: flex;
                        align-items: center;
                    }
                    .bottom-right{
                        display: flex;
                        align-items: center;
                    }
                    span{
                        font-size: 14px;
                        color: #999;
                        margin-left: 5px;
                    }
                }
            }

            .right{
                width: 80px;
                height: 80px;
                img{
                    width: 80px;
                    height: 80px;    
                    border-radius: 50%;               
                }
            }
        }
    }
</style>
