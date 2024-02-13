<template>
  <div>
    <div style="margin: 10px 0">
      <el-input
        style="width: 200px"
        placeholder="请输入名称"
        suffix-icon="el-icon-search"
        v-model="username"
      ></el-input>
      <el-button style="margin-left: 5px" type="primary" @click="load"
        >搜索</el-button
      >
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAddUser"
        >新增 <i class="el-icon-circle-plus-outline"></i
      ></el-button>
    </div>

    <el-table :data="tableData" border stripe>
      <el-table-column prop="create_time" label="日期" width="140">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="success" @click="handleEditUser(scope.row)"
            >编辑 <i class="el-icon-edit"></i
          ></el-button>
          <el-button type="danger" @click="handleDeleteUser(scope.row.id)"
            >删除 <i class="el-icon-remove-outline"></i
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
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
          <el-input
            v-model="form1.username"
            :readonly="true"
            autocomplete="off"
          ></el-input>
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
  </div>
</template>


<script>
export default {
  name: "User",
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
      formLabelWidth: "120px",
      userid: 0,
    };
  },
  created() {
    // 请求分页查询数据
    this.load();
  },
  methods: {
    load() {
      this.request
        .get("/user/page", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            username: this.username,
          },
        })
        .then((res) => {
          console.log(res);
          this.tableData = res.data;
          this.total = res.total;
        });
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.load();
    },
    handleCurrentChange(pageNum) {
      this.pageNum = pageNum;
      this.load();
    },
    handleAddUser() {
      this.dialogFormVisible = true;
      this.form = {};
    },
    saveUser() {
      this.request.post("/user", this.form).then((res) => {
        if (res) {
          this.$message.success("新增成功");
        } else {
          this.$message.error("新增失败");
        }
        this.dialogFormVisible = false;
        this.load();
      });
    },
    handleEditUser(row) {
      this.form1 = Object.assign({}, row);
      this.userid = row.id;
      console.log(this.userid);
      this.dialogFormVisible1 = true;
    },
    editUser() {
      this.request.put("/user/" + this.userid, this.form1).then((res) => {
        if (res) {
          this.$message.success("修改成功");
        } else {
          this.$message.error("修改失败");
        }
        this.dialogFormVisible1 = false;
        this.load();
      });
    },
    handleDeleteUser(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.request.delete("/user/" + id).then((res) => {
            if (res) {
              this.$message.success("删除成功!");
            } else {
              this.$message.error("删除失败");
            }
            this.load();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
</style>