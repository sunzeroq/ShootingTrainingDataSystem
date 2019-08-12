<template>

<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>添加子弹</span>
  </div>
  <div class="text item">
    <el-form @submit.native.prevent="saveBullet" ref="form" :model="bullet" label-width="80px">
      <el-form-item label="弹药型号">
      <el-input v-model="bullet.name"></el-input>
     </el-form-item>

    <el-form-item label="弹药库存">
      <el-input v-model="bullet.num"></el-input>
    </el-form-item>
     <el-form-item label="弹药收入">
      <el-input v-model="bullet.num"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
    </el-form>
  </div>
</el-card>


</template>

<script>
  export default {
    data() {
      return {
        bullet: {}
      };
    },
    methods: {
      saveBullet() {
        this.$http.post('bullets', this.bullet).then(res =>{
          this.$message({
           showClose: true,
           message: '创建成功',
           type: 'success'
          });
        this.$router.push('/bullets/index')
          console.log(res.data)
        })
         
        
      }
    }
  };
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 800px;
    margin-top: 50px;
    margin-left: 200px;
  }
</style>