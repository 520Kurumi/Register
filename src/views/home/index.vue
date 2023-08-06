<script setup lang="ts">
import Carousel from '@/views/home/Carousel.vue'
import Search from '@/views/home/Search.vue'
</script>

<template>
    <div class="home">
      <Carousel></Carousel>
      <Search></Search>
    </div>


</template>

<style scoped lang="scss">
.home{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>