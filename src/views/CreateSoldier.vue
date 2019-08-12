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
    <el-button @click.prevent="removeDomain(domain)">删除</el-button>
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
    <el-form-item label="成绩评价" prop="grade" >
      <el-radio-group v-model="SoldierForm.grade">
        <el-radio :label="1">不及格</el-radio>
        <el-radio :label="2">及格</el-radio>
        <el-radio :label="3">良好</el-radio>
        <el-radio :label="4">优秀</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-col>
</el-row>
  
  <el-form-item>
    <el-button type="primary" native-type="submit">提交</el-button>
    <el-button @click="addDomain">新增成绩</el-button>
    <el-button @click="resetForm('SoldierForm')">重置</el-button>
  </el-form-item>
</el-form>
</el-card>
</template>


<script>
  export default {
    data() {
      return {
        SoldierForm: {
          domains: [
          {value: '',text:1},{value: '',text:2},{value: '',text:3},{value: '',text:4},{value: '',text:5},
          ],
          name: '',
          ordernumber: '',
          higherClass: '',
          basicClass: '',
          targetType: '',
          targetNum: '',
          targetDronetype: '',
          grade: '',
          job: '',

        },
        
      };
    },
    methods: {
      submitForm() {
        this.$http.post('soldierform', this.SoldierForm).then(res =>{
          this.$message({
           showClose: true,
           message: '创建成功',
           type: 'success'
          });
        
          console.log(res.data)
        })
       
      },
      resetForm(id) {
        this.$refs[id].resetFields();
      },
      removeDomain(item) {
        var index = this.SoldierForm.domains.indexOf(item)
        if (index !== -1) {
          this.SoldierForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.SoldierForm.domains.push({
          value: '',
          key: Date.now(),
          text: this.SoldierForm.domains.length+1,
        });
      }
    }
  }
</script>
