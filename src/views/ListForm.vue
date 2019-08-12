<template>
  <div class="home">
    <el-table :data="ruleForm.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))">
        <!-- <el-table-column prop="data1" label="日期" width="120">
        </el-table-column>
        <el-table-column prop="data2" label="时间" width="120">
        </el-table-column> -->
        <el-table-column prop="name" label="型号" width="120">
        </el-table-column>
        <el-table-column prop="content" label="内容" width="120">
        </el-table-column>
        <el-table-column prop="number" label="数量" width="120">
        </el-table-column>
        <el-table-column prop="text" label="备注" width="120">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button @click="remove(scope.row._id)" icon="el-icon-delete"
              type="danger"  >问题已解决</el-button>
          </template>
        </el-table-column>
      </el-table>


  </div>

  
</template>



<script>
export default {
    data() {
      return{
        ruleForm: [],
        search: ''
      
      };
    },
    methods:{
      fetch(){
        this.$http.get('ruleForm').then(res =>{
        this.ruleForm = res.data
      })
      },
      remove(id){
        this.$http.delete(`ruleForm/${id}`).then(res =>{
          this.$message({
           showClose: true,
           message: '删除成功',
           type: 'success'
          });
          this.fetch()
          console.log(res.data)
        })
      }
    },
    created(){
      this.fetch()
    },
      
  };
</script>
