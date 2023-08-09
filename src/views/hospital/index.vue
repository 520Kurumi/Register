<script setup lang="ts">
import {useRoute,useRouter} from 'vue-router'
import { onMounted } from 'vue';
import {Menu,House,Memo,Setting,InfoFilled,Search} from '@element-plus/icons-vue'
// import {getHospitalDetail} from '@/api/hospital/index'
import {useHospitalDetailStore} from '@/store/hospital/hospitalDetail'
// import {storeToRefs} from 'pinia'
const $route=useRoute()
const $router=useRouter()
const hospitalDetail=useHospitalDetailStore()
onMounted( ()=>{
    hospitalDetail.getHospitalDetailAction($route.query.hoscode as string)
    hospitalDetail.getHospitalDepartmentAction($route.query.hoscode as string)
})
const changeActive=(path:string)=>{
    // console.log(path)
    $router.push({
        path,
        query:{
            hoscode:$route.query.hoscode
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
                    <p> / 医院信息</p>
                </div>
                <el-menu
                :default-active="$route.path"
                router
                >
                    <el-menu-item index="/hospital/book"  @click="changeActive(`/hospital/book`)">
                        <el-icon><Menu></Menu></el-icon>
                    <p>预约挂号</p>
                    </el-menu-item>

                    <el-menu-item index="/hospital/detail"  @click="changeActive(`/hospital/detail`)">
                        <el-icon><Memo /></el-icon>
                    <p>医院详细</p>
                    </el-menu-item>

                    <el-menu-item index="/hospital/required"  @click="changeActive(`/hospital/required`)">
                        <el-icon><Setting /></el-icon>
                    <p>预约需知</p>
                    </el-menu-item>

                    <el-menu-item index="/hospital/info"  @click="changeActive(`/hospital/info`)">
                        <el-icon><InfoFilled /></el-icon>
                    <p>停诊信息</p>
                    </el-menu-item>

                    <el-menu-item index="/hospital/search"  @click="changeActive(`/hospital/search`)">
                        <el-icon><Search /></el-icon>
                    <p>查询/取消</p>
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