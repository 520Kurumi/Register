<script setup lang="ts">
import {useUserStore} from '@/store/user/user'
import { ArrowDown } from '@element-plus/icons-vue'
import {removeUserLoginInfoItem} from '@/utils/storage'
import { ElMessage } from 'element-plus';
const user=useUserStore()
const logout=()=>{
    removeUserLoginInfoItem()
    user.nameAndToken={}
    ElMessage.success('退出登录成功！')             
}
</script>

<template>
<div class="nav">
    <div class="container">
        <div class="wraper">
            <div class="head" @click="$router.push('/home')">
                <img src="../../assets/images/logo.png">
                <span>好大夫 预约挂号统一平台</span>
            </div>
            <div class="blank"></div>
        </div>
        <div class="main">
            <span>帮助中心</span>
            <span v-if="JSON.stringify(user.nameAndToken)==='{}'" @click="user.isVisable=true">登录/注册</span>
            <el-dropdown v-else>
                <span class="el-dropdown-link">
                 {{ user.nameAndToken.name }}
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>实名认证</el-dropdown-item>
                    <el-dropdown-item>挂号订单</el-dropdown-item>
                    <el-dropdown-item>就诊人管理</el-dropdown-item>
                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

</div>    
    <div class="ocuupy"></div>
</template>

<style scoped lang="scss">
.nav{
    z-index: 2;
    width: 100vw;
    height: 70px;
    background-color: #fff;
    border-bottom: 1px solid #e4dede;
    position: fixed;
    top:0;
    .container{
        width: 100vw;
        height: 70px;
        display: flex;
        align-items:center;
        z-index: 6;
        .wraper{
            margin-left:70px;
            height: 70px;
            width: 1200px;
            display:flex;
            align-items:center;
            .head{
                display:flex;
                align-items:center;
                line-height:50px;
                height: 50px;
                width: 320px;
                cursor: pointer;
                img{
                    width: 50px;
                    height: 50px;
                } 
                span{
                    margin-left:10px;
                    font-size:22px;
                    color:#4490f1;

                }
            }

            .blank{
                width:500px;
                height:70px;
            }
        }
        .main{
            width: 166px;
            height: 20px;
            display: flex;
            align-items: center;
            span{
                margin: auto 10px;
                font-size:14px;
                color:#666;
                white-space: nowrap;
                cursor: pointer;
            }
            span:hover{
                color: #4490f1;
            }
        }
    }

}
  .ocuupy{
    width: 100vw;
    height: 70px;
  }

</style>