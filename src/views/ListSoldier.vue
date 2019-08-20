<template>
  <el-table :data="soldierForm.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand-left">
          <el-form-item label="名字">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          
          <el-form-item label="序号">
            <span>{{ props.row.ordernumber }}</span>
          </el-form-item>
          <el-form-item label="职务">
            <span>{{ props.row.job }}</span>
          </el-form-item>
          <el-form-item label="上级单位">
            <span>{{ props.row.higherClass }}</span>
          </el-form-item>
          <el-form-item label="基层单位">
            <span>{{ props.row.basicClass }}</span>
          </el-form-item>
          <el-form-item label="靶型">
            <span>{{ props.row.targetType }}</span>
          </el-form-item>
          <el-form-item label="靶位">
            <span>{{ props.row.targetNum }}</span>
          </el-form-item>
          <el-form-item label="靶机型号">
            <span>{{ props.row.targetDronetype }}</span>
          </el-form-item>
          <el-form-item label="成绩评价">
            <span>{{ props.row.grade }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="序号" prop="ordernumber"></el-table-column>
    <el-table-column label="名字" prop="name"></el-table-column>
    <el-table-column label="上级单位" prop="higherClass"></el-table-column>
    <el-table-column label="基层单位" prop="basicClass"></el-table-column>
    <el-table-column label="操作" width="240">
    <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
    </template>
    <template slot-scope="scope">
        <el-button @click="remove(scope.row._id)" icon="el-icon-delete" type="danger" >删除</el-button>
        <el-button @click="datacanvas(scope.row._id)" icon="el-icon-s-data" type="primer">成绩</el-button>
    </template>
    </el-table-column>
  </el-table>
</template>

<style>
  .demo-table-expand-left {
    font-size: 0;
  }
  .demo-table-expand-left label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand-left .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .demo-table-expand-right {
    font-size: 0;
  }
  .demo-table-expand-right label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand-right .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 20%;
  }
</style>

<script>
export default {
    data() {
      return{
        soldierForm: [],
        search: '',
   


      };
    },
    methods:{
      
      fetch(){
        this.$http.get('soldierform').then(res =>{
        this.soldierForm = res.data
        //成绩动态展示

        console.log(this.soldierForm)
      })
      },
      remove(id){
        this.$http.delete(`soldierform/${id}`).then(res =>{
          this.$message({
           showClose: true,
           message: '删除成功',
           type: 'success'
          });
          this.fetch()
          console.log(res.data)
        })
      },
      datacanvas(id){
        this.$router.push(`soldierform/${id}/canvas`)
      }
      
    },
    
    created(){
      this.fetch()
 
    },
      
  };
</script>