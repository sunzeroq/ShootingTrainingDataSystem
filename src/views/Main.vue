<template>
 <el-container style="height: 100vh">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="['1','3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>日常管理</template>
        <el-menu-item-group>
          <template slot="title">弹药收入相关</template>
          <el-menu-item index="/bullets/index">子弹管理</el-menu-item>
          <el-menu-item index="/bullets/create">增加弹药</el-menu-item>

          <el-menu-item-group title="日常流程相关">
          <el-menu-item index="/submitform">流程申请</el-menu-item>
          <el-menu-item index="/listform">流程详单</el-menu-item>
          </el-menu-item-group>
       
          
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-pie-chart"></i>打靶数据相关</template>
        <el-menu-item index="/createsoldier">打靶数据录入</el-menu-item>
        <el-menu-item index="/listsoldier">打靶数据查询</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-user"></i>用户登录注册相关</template>
        <el-menu-item index="/register">注册</el-menu-item>
        <el-menu-item index="/login">登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>登录</el-dropdown-item>
          <el-dropdown-item>注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span></span>
    </el-header>
    
    <el-main>
      <router-view></router-view>
      
    </el-main>
  </el-container>
</el-container>
 
</template>


<style>
html,body{
  padding: 0;
  margin: 0;
}
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      return {
    
      };
    },
   
  };
</script>