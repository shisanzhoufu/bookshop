<template>
  <div id="register">
    <van-form validate-first @submit="onSubmit">

        <!-- 头像上传 -->
      <!-- <van-uploader :after-read='onRead'  v-model="fileList" multiple :max-count='1' image-fit='cover'/> -->
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        v-model="username"
        name="pattern"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <!-- 通过 validator 进行函数校验 -->
      <van-field
        v-model="password"
        type="password"
        name="validator"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <!-- 通过 validator 进行异步函数校验 -->
      <van-field
        v-model="email"
        name="asyncValidator"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <van-field name="radio" label="身份选择">
        <template #input>
          <van-radio-group v-model="radio" direction="horizontal">
            <van-radio name="1">用户</van-radio>
            <van-radio name="2">卖家</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      radio: "1",
      
    };
  },
  methods: {
    onSubmit() {
      let data = {
        userName: this.username,
        userPassword: this.password,
        email: this.email,
        radio: this.radio,
      }
      this.axios.get('/api/register', {
        params: data
      }).then((res) => {
         var code = res.data.statusCode
         var msg = res.data.msg
         if( code == 200) {
             
             Dialog.alert({
            message: msg,
            confirmButtonText:'去登录',
            
          }).then(() => {
              confirm:this.$router.push('/login')
          });
          
          }else {
            
            Dialog.alert({
            message: msg,
            
          }).then(() => {
          confirm:this.$router.go(0)
          });
          }
        
      })
    },


    // 头像图片传到后端
    // onRead (file) {
    //   let data = new FormData();
    //   data.append("file", file.file);//很重要 data.append("file", file);不成功
    //   this.axios.post('/api/upload',data, {
    //       headers: { "content-type": "multipart/form-data" }
    //   }).then(res => {
    //     console.log(res.data)
    //   })
    // }
  }
};
</script>