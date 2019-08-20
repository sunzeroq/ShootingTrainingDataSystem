<template>
  <div class="home">
    <el-table :data="bullets.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))">
        <el-table-column prop="name" label="弹药型号" width="240">
        </el-table-column>

        <el-table-column prop="num" label="弹药库存" width="240">
        </el-table-column>

        <el-table-column prop="money" label="每日收入" width="240">
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
          </template>
          
          <template slot-scope="scope">
            <el-button @click="remove(scope.row._id)" icon="el-icon-delete"
              type="danger"  >删除</el-button>
            <el-button @click="edit(scope.row._id)" icon="el-icon-edit"
              type="primary" >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
        <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
        <ve-bar :data="chartMoney"></ve-bar>
        
  </div>

  
</template>



<script>
export default {
    data() {
      this.chartSettings = {
        dimension: 'id',
        metrics: 'number'
      }
      return{
        bullets: [],
        chartData: {
          columns: ['id', 'number'],
          rows: [
          ]
        },
        chartMoney: {
          columns: ['型号', '收入'],
          rows: [
          ]
        },
        search: ''
      
      };
    },
    methods:{
      updata(){
        this.$http.get('bullets').then(response => {
       
        let arr = response.data
          for (let index = 0; index < arr.length; index++) {
            const element = arr[index]
            let name = arr[index].name
            this.$set(this.chartData.rows, index, {'id':name, 'number':arr[index].num})
            this.$set(this.chartMoney.rows, index, {'型号':name, '收入':arr[index].money})
            }
          
        //  this.chartData.rows=[
        //               { 'id': res[0].name, 'number': res[0].num},
        //               { 'id': res[1].name, 'number': res[1].num},
        //               { 'id': res[2].name, 'number': res[2].num}
        //              ]
        //  this.chartMoney.rows=[
        //               { '型号': res[0].name, '收入': res[0].money},
        //               { '型号': res[1].name, '收入': res[1].money},
        //               { '型号': res[2].name, '收入': res[2].money}
        //              ]
                     
      })
      },
      fetch(){
        this.$http.get('bullets').then(res =>{
        this.bullets = res.data
        
      })
      },
      edit(id){
        this.$router.push(`/bullets/${id}/edit`)
      },
      remove(id){
        this.$http.delete(`bullets/${id}`).then(res =>{
          this.$message({
           showClose: true,
           message: '删除成功',
           type: 'success'
          });
          this.fetch()
          
        })
      }
    },
    created(){
      this.fetch()
      this.updata()
      
    },
      
  };
</script>
