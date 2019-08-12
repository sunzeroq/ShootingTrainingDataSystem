<template>
<el-container>
  <el-header></el-header>
  <el-main>

  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/register' }">注册</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/login' }">登录</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>登录</span>
    </div>
    <div class="text item">
      <el-form @submit.native.prevent="saveUser" ref="form" :model="user" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">登录</el-button>
        <el-button @click="jump()">注册</el-button>
      </el-form-item>
      </el-form>
    </div>
  </el-card>
  </el-main>
</el-container>


</template>
<script>
  export default {
    data() {
      return {
        user: {}
      };
    },
    methods: {
      saveUser() {
        this.$http.post('login', this.user).then(res =>{
          localStorage.setItem('token', res.data.token)
          this.$message({
           showClose: true,
           message: '登录成功',
           type: 'success'
          });
        sessionStorage.token = res.data.token
        this.$router.push('/bullets/index')
        
        })
         
        
      },
      jump(){
        this.$router.push('/register')
      }
    }
  };
</script>