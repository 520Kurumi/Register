import {createRouter,createWebHistory} from 'vue-router'
export default createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:()=>import('@/views/home/index.vue')},
        {path:'/hospital',component:()=>import('@/views/hospital/index.vue'),redirect:'/hospital/book',
         children:[
            {path:'book',component:()=>import('@/views/hospital/Book.vue')},
            {path:'detail',component:()=>import('@/views/hospital/Detail.vue')},
            {path:'info',component:()=>import('@/views/hospital/Info.vue')},
            {path:'search',component:()=>import('@/views/hospital/Search.vue')},
            {path:'required',component:()=>import('@/views/hospital/Required.vue')},
            {path:'enterbook',component:()=>import('@/views/hospital/EnterBook.vue')},
            {path:'register',component:()=>import('@/views/hospital/Register.vue')}
         ]},
         {path:'/wxlogin',component:()=>import('@/views/wxlogin/index.vue')},
         {path:'/user',component:()=>import('@/views/user/index.vue'),redirect:'/user/order',
         children:[
            {path:'identify',component:()=>import('@/views/user/Identify.vue')},
            {path:'account',component:()=>import('@/views/user/Account.vue')},
            {path:'order',component:()=>import('@/views/user/Order.vue')},
            {path:'suggest',component:()=>import('@/views/user/Suggest.vue')},
            {path:'vistor',component:()=>import('@/views/user/Vistor.vue')},

         ]},
    ],
    scrollBehavior(){
        return{
            left:0,
            top:0
        }
    }
})