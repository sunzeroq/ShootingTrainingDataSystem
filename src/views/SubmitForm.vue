<template>
<el-form :model="ruleForm" :rules="rules" @submit.native.prevent="submitForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="名称" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="型号" prop="devtype">
    <el-select v-model="ruleForm.devtype" placeholder="请选择正确型号">
      <el-option label="弹药" value="bullet"></el-option>
      <el-option label="设备" value="device"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="申请时间" required>
    <el-col :span="11">
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="date2">
        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="申请内容" prop="content">
    <el-radio-group v-model="ruleForm.content">
      <el-radio label="维护"></el-radio>
      <el-radio label="报废"></el-radio>
      <el-radio label="新增"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="数量" prop="number">
    <el-input-number v-model="ruleForm.number"></el-input-number>
  </el-form-item>
  <el-form-item label="备注" prop="text">
    <el-input v-model="ruleForm.text" type="textarea"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" native-type="submit">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>    
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          devtype: '',
          date1: '',
          date2: '',
          content: '',
          number: '',
          text: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择申请内容', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写数量', trigger: 'blur' }
          ],
          text: [
            { required: true, message: '请填写备注', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm() {
        this.$http.post('ruleform', this.ruleForm).then(res =>{
          this.$message({
           showClose: true,
           message: '创建成功',
           type: 'success'
          });
        
          console.log(res.data)
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>