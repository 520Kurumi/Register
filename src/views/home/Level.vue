<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {getHospitalLevelAndRegion} from '@/api/home/index'
import {HospitalLevelAndRegionArr} from '@/api/home/type'
const levelArr=ref<HospitalLevelAndRegionArr>()
const isSelect=ref<string>('')
const emit=defineEmits(['selectLevel'])
onMounted(()=>{
    getLevel()
})
const getLevel=async ()=>{
    const res = await getHospitalLevelAndRegion('HosType') //BeiJIn
    levelArr.value=res.data.data
    // console.log( res.data.data)
}
const selectLevel=(value:string)=>{
    isSelect.value=value
    emit('selectLevel',value)
}
</script>

<template>
 <div class="level">
    <span>等级：</span>
      <ul>
            <li :class="{'active':isSelect===''}" @click="selectLevel('')">全部</li>
            <li :class="{'active':isSelect===item.value}" v-for="item in levelArr" :key="item.id"  @click="selectLevel(item.value)">{{ item.name }}</li>
      </ul>
</div>

</template>

<style scoped lang="scss">
 .level{
    display: flex;
    span{
        font-size: 14px;
        color: #999;
    }
    ul{
        display: flex;
        li{
            margin-left:26px;
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
