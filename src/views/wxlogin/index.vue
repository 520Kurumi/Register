<script setup lang="ts">
import {setUserLoginInfoItem} from '@/utils/storage'
import { useRoute } from 'vue-router';
import {DetailPhoneCodeResponseData} from '@/api/user/type'
const $route=useRoute()
setUserLoginInfoItem($route.query  as unknown as DetailPhoneCodeResponseData)
const html:any=document.querySelector('html')
html.style.display='none'
</script>

<template>
 <div>

</div>

</template>

<style scoped lang="scss">

</style>
