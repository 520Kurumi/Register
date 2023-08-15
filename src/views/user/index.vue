<script setup lang="ts">
import {useRoute,useRouter} from 'vue-router'
import { onMounted } from 'vue';
import {Menu,House,Memo,Setting,InfoFilled,Search} from '@element-plus/icons-vue'
// import {getHospitalDetail} from '@/api/hospital/index'
// import {storeToRefs} from 'pinia'
const $route=useRoute()
const $router=useRouter()


const hoscode:string=$route.query.hoscode as string
const scheduleId:string=$route.query.scheduleId as string
const patientId:string=$route.query.patientId as string
onMounted( ()=>{

})
const changeActive=(path:string)=>{
    // console.log(path)
    $router.push({
        path,
        query:{
            hoscode,
            scheduleId,
            patientId
        }
    })
}
</script>

<template>
    <div class="main">
        <el-row>
            <el-col :span="2"></el-col>
            <el-col :span="2">
                <div class="showHosInfo">
                    <el-icon><House></House></el-icon>&nbsp;
                    <p> / 会员中心</p>
                </div>
                <el-menu
                :default-active="$route.path"
                router
                >

                    <el-menu-item  index="/user/identify"  @click="changeActive(`/user/identify`)">
                        <el-icon><Menu></Menu></el-icon>
                    <p>实名认证</p>
                    </el-menu-item>

                    <el-menu-item index="/user/order"  @click="changeActive(`/user/order`)">
                        <el-icon><Memo /></el-icon>
                    <p>挂号订单</p>
                    </el-menu-item>

                    <el-menu-item index="/user/vistor"  @click="changeActive(`/user/vistor`)">
                        <el-icon><Setting /></el-icon>
                    <p>就诊人管理</p>
                    </el-menu-item>

                    <el-menu-item index="/user/account"  @click="changeActive(`/user/account`)">
                        <el-icon><InfoFilled /></el-icon>
                    <p>账号信息</p>
                    </el-menu-item>

                    <el-menu-item index="/user/suggest"  @click="changeActive(`/user/suggest`)">
                        <el-icon><Search /></el-icon>
                    <p>意见反馈</p>
                    </el-menu-item>

                </el-menu>
            </el-col>
            <el-col :span="20">
                 <div class="showInfo">
                    <keep-alive>
                         <router-view></router-view>
                    </keep-alive>                     
                 </div>
            </el-col>
        </el-row>
    </div>
</template>

<style scoped lang="scss">
.main{
    height: 100vh;
    .showHosInfo{
        display: flex;
        margin: 20px auto 20px 20px;
    }

    .showInfo{
        margin: 30px;
        width: 1000px;
        // height: 700px;
    }
}
</style>