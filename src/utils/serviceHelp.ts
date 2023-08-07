import { ElLoading } from 'element-plus'
import {nextTick} from 'vue'
let loadingInstance:any;
export const start:any=()=>{
    loadingInstance=  ElLoading.service({ fullscreen: true,
        text:'加载中'
    })
}

export const stop:any=()=>{
    nextTick(()=>{
        loadingInstance.close()
    })
}