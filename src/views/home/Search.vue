<script setup lang="ts">
import {Search} from '@element-plus/icons-vue'
</script>

<template>
    <div class="searchList">
          <el-autocomplete
        v-model="state1"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-50"
        placeholder="点击输入医院名称"
        @select="handleSelect"
        :icon="Search"
      />
      <el-button type="primary" :icon="Search" size="large">搜索</el-button>
    </div>


</template>

<style scoped lang="scss">
.searchList{
  margin-top: 20px;

:deep(.el-input__wrapper){
  width: 800px;
  height: 40px;
}
}

</style>
