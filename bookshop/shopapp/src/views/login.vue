<template>
    <div id="login">
        <van-form @submit="onSubmit">
        <van-field
            v-model="userName"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
            提交
            </van-button>
        </div>
        <router-link tag='a' class="aa" to="/register">还没有帐号，去注册</router-link>
        </van-form>
    </div>
</template>

<script>
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Dialog } from 'vant';
export default {
     data() {
    return {
      userName: '',
      password: '', 
      role:''
    };
  },
  methods: {
     onSubmit () {
      let data = {
        userName: this.userName,
        userPassword: this.password
      }
      this.axios.get('/api/login', {
        params: data
      }).then((res) => {
        // console.log(res)
         var code = res.data.statusCode
         var msg = res.data.msg
         if( code == 200) {
          //  console.log(res.data)
            var ses = window.sessionStorage
            var d = JSON.stringify(res.data.name)
            ses.setItem('data',d)
            
            // this.$router.go(-1)
            this.role = res.data.role
            if(this.role==1){
              confirm:this.$router.push('/personal')
            }else if(this.role==2){
              confirm:this.$router.push('/personal')
            }
            else if(this.role==3){
              confirm:this.$router.push('/manager')
            }
           
            
          }else {
            Dialog.alert({
            message: msg,
          }).then(() => {
          // on close
          });
          }
        
      })
    }
  },
}
</script>

<style>

.aa{
    position: absolute;
    right: 5px;
    font-size: 15px;
    color:grey;
    text-decoration: none;
    margin-top: 5px;
}
</style>