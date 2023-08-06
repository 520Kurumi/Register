<script setup lang="ts">

</script>

<template>
  <div>
    <el-carousel height="350px" >
        <el-carousel-item v-for="item in 4" :key="item">
            <img src="@/assets/images/web-banner-1.png" alt="">
        </el-carousel-item>
    </el-carousel>
  </div>

</template>

<style scoped lang="scss">
img{
  height: 350px;
  width: 1200px;
}
// .all{
//   height: 350px;
//   width: 1200px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
:deep(.el-carousel){
  height: 350px;
  width: 1200px;
}
</style>
