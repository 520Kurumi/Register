import {createRouter,createWebHistory} from 'vue-router'
export default createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:()=>import('@/views/home/index.vue')},
        {path:'/hospital',component:()=>import('@/views/hospital/index.vue')}
    ],
    scrollBehavior(){
        return{
            left:0,
            top:0
        }
    }
})