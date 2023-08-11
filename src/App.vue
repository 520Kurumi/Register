<script setup lang="ts">
import {useUserStore} from '@/store/user/user'
const user=useUserStore()
</script>

<template>
  <div>
    <HospitalTop></HospitalTop>
    <router-view></router-view>
    <HospitalBottom></HospitalBottom>
    <Login v-if="user.isVisable"></Login>
  </div>

</template>

<style scoped>

</style>
