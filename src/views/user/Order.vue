<script setup lang="ts">
import {onMounted,ref} from 'vue'
import {postOrder} from '@/api/user/index'
import { useRoute } from 'vue-router';
import  DetailOrder from '@/views/user/order/DetailOrder.vue'
import  AllOrder from '@/views/user/order/AllOrder.vue'
const $route=useRoute()
// const $router=useRouter()
const orderId=ref<number>(-1)

onMounted(async ()=>{
  const hoscode:string=$route.query.hoscode as string
  const scheduleId:string=$route.query.scheduleId as string
  const patientId:string=$route.query.patientId as string
  const resOrderId=await postOrder(hoscode,scheduleId,patientId)
  // console.log(hoscode,scheduleId,patientId)
  orderId.value=resOrderId.data.data
  // console.log(resOrderId.data.data)
})

</script>

<template>
 <div>
      <DetailOrder :orderId="orderId" v-if="orderId!==-1"></DetailOrder>
      <AllOrder v-else></AllOrder>
 </div>

</template>

<style scoped lang="scss">

</style>
