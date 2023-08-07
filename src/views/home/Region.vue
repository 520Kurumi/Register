<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {getHospitalLevelAndRegion} from '@/api/home/index'
import {HospitalLevelAndRegionArr} from '@/api/home/type'
const regionlArr=ref<HospitalLevelAndRegionArr>()
const isSelect=ref<string>('')
const emit=defineEmits(['selectRegion'])
onMounted(()=>{
    getLevel()
})
const getLevel=async ()=>{
    const res = await getHospitalLevelAndRegion('BeiJin') //BeiJIn
    regionlArr.value=res.data.data
    // console.log( res.data.data)
}
const selectRegion=(value:string)=>{
    isSelect.value=value
    emit('selectRegion',value)
}
</script>

<template>
 <div class="region">
    <span>等级：</span>
      <ul>
            <li :class="{'active':isSelect===''}" @click="selectRegion('')">全部</li>
            <li :class="{'active':isSelect===item.value}" @click="selectRegion(item.value)"  v-for="item in regionlArr">{{ item.name }}</li>
      </ul>
</div>

</template>

<style scoped lang="scss">
 .region{
    margin: 16px auto;
    display: flex;
    span{
        font-size: 14px;
        color: #999;
        white-space: nowrap;
    }
    ul{
        display: flex;
        flex-wrap: wrap;
        li{
            margin:0 0 10px 26px;
            cursor: pointer;
            color: #666;
            font-size: 14px;
            &.active{
                color: #4490f1;
            }
        }
        li:hover{
            color: #55a6fe;
        }
    }
 }
</style>
