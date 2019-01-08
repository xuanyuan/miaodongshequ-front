<template>
  <el-form :model="ruleForm"
           status-icon
           :rules="rules"
           ref="ruleForm"
           label-width="100px"
           class="demo-ruleForm">
    <el-form-item label="用户名"
                  prop="username">
      <el-input v-model="ruleForm.username">
      </el-input>
    </el-form-item>
    <el-form-item label="密码"
                  prop="pass">
      <el-input type="password"
                v-model="ruleForm.pass"
                autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button :plain="true"
                 type="primary"
                 @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        pass: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在3到5个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: 'submit!',
            type: 'success'
          });
          this.$router.push('admin');
        } else {
          this.$message({
            message: 'error submit!!',
            type: 'warning'
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  margin: 100px auto;
  width: 400px;
  background: #f2f6fc;
  color: #fff;
  padding: 20px;
}
.font-default {
  color: #fff;
}
</style>

