<template>
  <el-menu
    :default-openeds="['1', '3']"
    style="height: 100%"
    background-color="rgb(48, 65, 86)"
    text-color="#fff"
    active-text-color="#ffd04b"
    router=""
  >
    <div style="height: 60px; line-height: 60px; text-align: center">
      <img
        src="../assets/logo.png"
        alt=""
        style="width: 20px; position: relative; top: 5px; margin-right: 5px"
      />
      <b style="color: white">后台管理系统</b>
    </div>
    <el-menu-item index="/"><template slot="title"><i class="el-icon-message"></i>主页</template></el-menu-item>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-menu"></i>系统管理</template>
        <el-menu-item index="/user">用户管理</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
};
</script>

<style scoped>
</style>