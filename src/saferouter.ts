import router from './router'
// 类型定义
// 引入pinia仓库

import pinia from '@/store'
import {useUserStore} from '@/store/user/user';
const userStore = useUserStore(pinia);

//存储用户未登录可以访问路由得路径
const whiteList = ["/home", '/hospital/required', '/hospital/detail', '/hospital/book', '/hospital/info', '/hospital/search'];
router.beforeEach((to:any,from:any,next:any)=>{
   const token= userStore.nameAndToken.token
   if(token){
        next()
   }else{
      if(whiteList.includes(to.path)){
            next()
      }else{
        userStore.isVisable = true;
        next({ path: '/home', query: { redirect: to.fullPath } })
      }
   }
    next()
})

