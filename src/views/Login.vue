<template>
  <div class="wrapper">
    <div
      style="
        margin: 200px auto;
        background-color: #fff;
        width: 350px;
        height: 300px;
        padding: 20px;
        border-radius: 10px;
      "
    >
      <div style="margin: 20px 0; text-align: center; font-size: 24px">
        <b>登 录</b>
      </div>
      <el-form :rules="rules" :model="user" ref="userForm">
        <el-form-item prop="username">
          <el-input
            placeholder="用户名"
            size="medium"
            style="margin: 10px 0"
            prefix-icon="el-icon-user"
            v-model="user.username"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            size="medium"
            style="margin: 10px 0"
            prefix-icon="el-icon-lock"
            show-password
            v-model="user.password"
          ></el-input>
        </el-form-item>

        <div style="margin: 10px 0; text-align: right">
          <el-button
            type="primary"
            size="small"
            autocomplete="off"
            style="margin-right: 20px"
            @click="$router.push('/register')"
            >注册</el-button
          >
          <el-button
            type="warning"
            size="small"
            autocomplete="off"
            @click="login"
            >登录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>


<script>
export default {
  name: "Login",
  data() {
    return {
      user: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字节",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          this.request.post("/user/login", this.user).then((res) => {
            if (res.code === 200) {
              localStorage.setItem("user", JSON.stringify(res.data));
              this.$router.push("/");
              this.$message.success("登陆成功");
            } else {
              this.$message.error(res.message);
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
  background-image: linear-gradient(to bottom right, #fc4668, #3f5efb);
  overflow: hidden;
}
</style>