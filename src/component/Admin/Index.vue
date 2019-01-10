<template>
  <el-container class="container">
    <el-header>
      <el-row type="flex"
              justify="end">
        <el-col :span="2">
          欢迎{{userName}}
        </el-col>
        <el-col :span="2">
          <el-button size="small"
                     @click="logout()"
                     round>安全退出</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="24">
            <h5>后台管理</h5>
            <el-menu default-active="/admin/menu"
                     class="el-menu-vertical-demo"
                     @open="handleOpen"
                     @close="handleClose"
                     background-color="#545c64"
                     text-color="#fff"
                     router
                     active-text-color="#ffd04b">
              <el-menu-item index="/admin/write">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
              </el-menu-item>
              <el-menu-item index="/admin/article">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="/admin/pay">
                <i class="el-icon-menu"></i>
                <span slot="title">结账</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      userName: 'admin'
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.$router.push('login');
    }
  }
}
</script>
 <style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  text-align: center;
  // line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}

.container {
  position: relative;
  height: 100%;
}
</style>
 