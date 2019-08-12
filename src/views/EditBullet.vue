<template>
<el-form @submit.native.prevent="saveBullet" ref="form" :model="bullet" label-width="80px">
  <el-form-item label="弹药型号">
    <el-input v-model="bullet.name"></el-input>
  </el-form-item>

  <el-form-item label="弹药数量">
    <el-input  v-model="bullet.num"></el-input>
  </el-form-item>
  <el-form-item label="弹药收入">
    <el-input  v-model="bullet.money"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" native-type="submit">保存</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
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
        this.$http.put(`bullets/${this.$route.params.id}`, this.bullet).then(res =>{
          this.$message({
           showClose: true,
           message: '更改成功',
           type: 'success'
          });
        this.$router.push('/bullets/index')
          console.log(res.data)
        })
         
        
      },
      fetch(){
        this.$http.get(`bullets/${this.$route.params.id}`).then(res =>{
          this.bullet = res.data
        })
      }
    },
    created(){
      this.fetch()
    }
  };
</script>