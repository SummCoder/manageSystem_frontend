<template>
  <div>
    <el-breadcrumb separator="/" style="display: inline-block">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
    </el-breadcrumb>
    <span style="float: right">王小虎</span>
    <el-dropdown style="cursor: pointer; float: right">
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    currentPathName() {
      return this.$store.state.currentPathName;
    }
  },
  watch: {
    currentPathName (newVal, oldVal){
      console.log(newVal)
    }
  }
};
</script>

<style scoped>
</style>