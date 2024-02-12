<template>
  <div style="height: 100%;">
    <el-container style="height: 100%;">
      <el-aside width="220px" style="background-color: rgb(238, 241, 246); height: 100%;">
        <el-menu :default-openeds="['1', '3']" style="height: 100%;" 
                  background-color="rgb(48, 65, 86)"
                  text-color="#fff"
                  active-text-color="#ffd04b">
          <div style="height: 60px; line-height: 60px; text-align: center;">
            <img src="../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px; margin-right: 5px;">
            <b style="color: white;">后台管理系统</b>
          </div>        
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>导航三</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header style="text-align: right; font-size: 12px; border-bottom: 1px solid #ccc; line-height: 60px;">
          <el-dropdown style="cursor: pointer;">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>


        
        <el-main>
          <div style="margin-bottom: 30px;">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <div style="margin: 10px 0;">
            <el-input style="width: 200px;" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="username"></el-input>
            <el-button style="margin-left: 5px;" type="primary" @click="load">搜索</el-button>
          </div>

          <div style="margin: 10px 0;">
            <el-button type="primary" @click="handleAddUser">新增 <i class="el-icon-circle-plus-outline"></i></el-button>
          </div>

          <el-table :data="tableData" border stripe>
            <el-table-column prop="create_time" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column label="操作">
              <template v-slot="scope">
                <el-button type="success" @click="handleEditUser(scope.row)">编辑 <i class="el-icon-edit"></i></el-button>
                <el-button type="danger" @click="handleDeleteUser(scope.row.id)">删除 <i class="el-icon-remove-outline"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="padding: 10px 0;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>

          <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="saveUser">确 定</el-button>
            </div>
          </el-dialog>

          <el-dialog title="修改信息" :visible.sync="dialogFormVisible1">
            <el-form :model="form1">
              <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form1.username" :readonly="true" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form1.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input v-model="form1.address" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="editUser">确 定</el-button>
            </div>
          </el-dialog>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 1,
      pageSize: 5,
      username: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      form: {},
      form1: {},
      formLabelWidth: '120px',
      userid: 0
    }
  },
  created() {
    // 请求分页查询数据
    this.load()
  },
  methods: {
    load(){
      this.request.get("/user/page", {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          username: this.username
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data
        this.total = res.total
      })
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum){
      this.pageNum = pageNum
      this.load()
    },
    handleAddUser(){
      this.dialogFormVisible = true
      this.form = {}
    },
    saveUser(){
      this.request.post("/user", this.form).then(res => {
        if(res){
          this.$message.success("新增成功")
        }else{
          this.$message.error("新增失败")
        }
        this.dialogFormVisible = false
        this.load()
      })
    },
    handleEditUser(row) {
      this.form1 = Object.assign({}, row)
      this.userid = row.id
      console.log(this.userid)
      this.dialogFormVisible1 = true
    },
    editUser(){
      this.request.put("/user/" + this.userid, this.form1).then(res => {
        if(res){
          this.$message.success("修改成功")
        }else{
          this.$message.error("修改失败")
        }
        this.dialogFormVisible1 = false
        this.load()
      })
    },
    handleDeleteUser(id){
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.request.delete("/user/" + id).then(res => {
          if(res){
            this.$message.success("删除成功!")
          }else{
            this.$message.error("删除失败")
          }
          this.load()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

  }
}
</script>
