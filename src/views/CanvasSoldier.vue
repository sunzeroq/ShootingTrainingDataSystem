<template>
    
<el-card class="box-card">
<el-form :model="SoldierForm" @submit.native.prevent="submitForm" ref="SoldierForm" label-width="100px" class="demo-dynamic">

<el-row>
  <el-col :span="6">
    <el-form-item prop="ordernumber" label="序号"  >
      <el-input v-model="SoldierForm.ordernumber"></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item prop="name" label="名字">
      <el-input v-model="SoldierForm.name"></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="8">
    <el-form-item prop="job" label="职务">
      <el-input v-model="SoldierForm.job"></el-input>
    </el-form-item>
  </el-col>
</el-row>

<el-row>
  <el-col :span="12">
    <el-form-item prop="higherClass" label="上级单位" >
      <el-input v-model="SoldierForm.higherClass"></el-input>
    </el-form-item>
  </el-col>
  <el-col :span="12">
    <el-form-item prop="basicClass" label="基层单位">
      <el-input v-model="SoldierForm.basicClass"></el-input>
    </el-form-item>
  </el-col>
</el-row>
  
  <el-row>
  <el-col :span="12">
    <el-form-item
    v-for="(domain, index) in (SoldierForm.domains)"
    :label="'第' + domain.text + '枪成绩'"
    :key="domain.key"
    :prop="'domains.' + index + '.value'"
  >
    <el-input v-model="domain.value"></el-input>
  </el-form-item>
  </el-col>
  
  <el-col :span="12">
    <el-form-item label="靶型" prop="targetType">
      <el-select v-model="SoldierForm.targetType" placeholder="请选择正确型号">
        <el-option label="胸环靶" value="胸环靶"></el-option>
        <el-option label="胸迷彩靶" value="胸迷彩靶"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="靶位" prop="targetNum">
      <el-select v-model="SoldierForm.targetNum" placeholder="请选择正确靶位">
        <el-option label="1" value="1"></el-option>
        <el-option label="2" value="2"></el-option>
        <el-option label="3" value="3"></el-option>
        <el-option label="4" value="4"></el-option>
        <el-option label="5" value="5"></el-option>
        <el-option label="6" value="6"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="靶机型号" prop="targetDronetype">
      <el-select v-model="SoldierForm.targetDronetype" placeholder="请选择正确型号">
        <el-option label="声学靶" value="声学靶"></el-option>
        <el-option label="电子靶" value="电子靶"></el-option>
      </el-select>
    </el-form-item>
   
  </el-col>
</el-row>
<ve-histogram :data="chartData"></ve-histogram>
</el-form>
</el-card>


</template>

<script>
  export default {
    data() {
      return {
        SoldierForm: {},
        chartData: {
          columns: ['靶次', '成绩'],
          rows: [
          ]
        },
      };
    },
    methods: {
      fetch(){
        this.$http.get(`soldierform/${this.$route.params.id}`).then(res =>{
          this.SoldierForm = res.data
  
          let arr = res.data.domains
          for (let index = 0; index < arr.length; index++) {
            const element = arr[index]
            let num = arr[index].text
            // this.chartData.rows[index] = {'靶次':num, '成绩':arr[index].value} 
            this.$set(this.chartData.rows, index, {'靶次':num, '成绩':arr[index].value})
            }
          })
      },
    
    },
    created(){
        this.fetch()
        this.$http.get(`soldierform/${this.$route.params.id}`).then(res =>{

         console.log(this.chartData.rows)
 
      })
    }
  };
</script>