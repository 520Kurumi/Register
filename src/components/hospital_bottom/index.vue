<script setup lang="ts">

</script>

<template>
 <div class="container">
     <div class="content">
        <span class="record">京ICP备13018369号</span>
        <span class="phone">电话挂号010-56253825</span>
     </div>

     <div class="action">
        <span>联系我们</span>
        <span>合作伙伴</span>
        <span>用户协议</span>
        <span>隐私协议</span>
     </div>
 </div>
 <div class="blank"></div>
</template>


<style lang="scss" scoped>
.container{
   background-color: #fafafa;
   border-top: 1px solid #e4dede;
   width: 100vw;
   height: 50px;
   position: fixed;
   bottom: 0;
   display: flex;
   align-items: center;
   justify-content: space-around;
   .content{
      width: 300px;
      height: 50px;
      span{
         color: #bbb;
         font-size: 12px;
         line-height: 50px;
      }
      .phone{
         margin:0 0 0 42px;
      }
   }
   .action{
      width: 341px;
      height: 50px;
      display: flex;
      justify-content: space-around;
      span{
         line-height: 50px;
         color: #666;
         font-size: 12px;
         cursor: pointer;
      }
      span:hover{
         color:#4490f1;
      }

   }
}
.blank{
   height: 50px;
   width: 100vw;
}
</style>