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
            {path:'required',component:()=>import('@/views/hospital/Required.vue')}
         ]},
         {path:'/wxlogin',component:()=>import('@/views/wxlogin/index.vue')}
    ],
    scrollBehavior(){
        return{
            left:0,
            top:0
        }
    }
})