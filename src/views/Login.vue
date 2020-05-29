<template>
  <div class="login-content">
    <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <div class="title">
      <h1>教务管理系统</h1>
      <p>Academic Affairs Management</p>
    </div>
    <el-form-item prop="account">
      <el-input 
        prefix-icon="el-icon-user" 
        type="text" 
        v-model="ruleForm2.account" 
        auto-complete="off" 
        placeholder="请输入用户名称"
      ></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input 
      prefix-icon="el-icon-lock"
      type="password" 
      v-model="ruleForm2.checkPass" 
      auto-complete="off" 
      placeholder="请输入登录密码"
      ></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
  import { login } from '../api/api';
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { loginName: this.ruleForm2.account, pwd: this.ruleForm2.checkPass };
            this.logining = true;
            login(loginParams).then(data => {
              this.logining = false;

              if (data.code == 0) {
                this.logining = false;
                sessionStorage.setItem("user",data.data.userName)
                sessionStorage.setItem("userId",data.data.userId)
                sessionStorage.setItem("token",data.data.token)
                this.$router.push({ path: '/studentList' });
                this.$message({
                  message: "欢迎使用！",
                  type: 'success'
                });
              } else {
                this.$message({
                  message: data.message,
                  type: 'error'
                });
                this.logining = false;
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-content{
    width: 100%;
    height: 100%;
    background: url("../images/admin_bg.jpg") no-repeat;
    background-size: cover;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .login-container {
    border-radius: 5px;
    background-clip: padding-box;
    width: 300px;
    padding: 35px 35px 15px 35px;
    background: rgba(255,255,255,.9);
    box-shadow: 0 0 5px #cac6c6;
    margin-right: 150px;

    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #409EFF;

      h1,p{
        margin:5px 0!important;
      }
    }

    .remember {
      margin: 0px 0px 35px 0px;
    }

  }
</style>