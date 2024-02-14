<template>
  <div class="wrapper">
    <div
      style="
        margin: 200px auto;
        background-color: #fff;
        width: 350px;
        height: 400px;
        padding: 20px;
        border-radius: 10px;
      "
    >
      <div style="margin: 20px 0; text-align: center; font-size: 24px">
        <b>注 册</b>
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

        <el-form-item prop="address">
          <el-input
            placeholder="地址"
            size="medium"
            style="margin: 10px 0"
            prefix-icon="el-icon-house"
            v-model="user.address"
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

        <el-form-item prop="confirmPassword">
          <el-input
            placeholder="确认密码"
            size="medium"
            style="margin: 10px 0"
            prefix-icon="el-icon-lock"
            show-password
            v-model="user.confirmPassword"
          ></el-input>
        </el-form-item>

        <div style="margin: 10px 0; text-align: right">
          <el-button
            type="primary"
            size="small"
            autocomplete="off"
            style="margin-right: 20px"
            @click="$router.push('/login')"
            >登录</el-button
          >
          <el-button
            type="warning"
            size="small"
            autocomplete="off"
            @click="register"
            >注册</el-button
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
        confirmPassword: [{ required: true, message: "请输入密码", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
    };
  },
  methods: {
    register() {
      this.$refs["userForm"].validate((valid) => {
        if (this.user.password !== this.user.confirmPassword) {
          this.$message.error("两次输入密码不一致");
          return false;
        }
        if (valid) {
          this.request.post("/user/register", this.user).then((res) => {
            if (res.code === 200) {
              localStorage.setItem("user", JSON.stringify(res.data));
              this.$router.push("/");
              this.$message.success("注册成功");
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