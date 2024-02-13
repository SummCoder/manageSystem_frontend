<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-aside
        width="220px"
        style="background-color: rgb(238, 241, 246); height: 100%"
      >
        <Aside />
      </el-aside>

      <el-container>
        <el-header
          style="
            font-size: 12px;
            border-bottom: 1px solid #ccc;
            line-height: 60px;
          "
        >
          <Header />
        </el-header>

        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";

export default {
  components: { Aside, Header },
  name: "HomeView",

};
</script>
