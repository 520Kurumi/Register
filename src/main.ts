import { createApp } from 'vue'
import '@/style/reset.scss'
import App from './App.vue'
import HospitalTop from '@/components/hosipital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
import Login from '@/components/login/index.vue'
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import pinia from '@/store/index'
import './saferouter'
const app=createApp(App)
app.component('HospitalTop', HospitalTop)
app.component('HospitalBottom', HospitalBottom)
app.component('Login',Login)
app.use(router)
app.use(ElementPlus,{
    locale: zhCn
})
app.use(pinia)
app.mount('#app')
