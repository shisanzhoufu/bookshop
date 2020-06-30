<template>
    <div>
        <van-nav-bar
            title="商品发布"
            
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        
        <van-cell-group>
            <van-field v-model="user" label="用户名"  />
            <van-field v-model="email" label="邮箱"  />
            <van-field v-model="role" label="身份"  />
            <!-- <van-field v-model="stock" label="库存" /> -->
            
        </van-cell-group>
        <!-- 头像上传 -->
    <!-- <p>商品图片</p>
      <van-uploader :after-read='onRead'  v-model="fileList" multiple :max-count='1' image-fit='cover'/> -->
      <van-button type="primary" block @click="onSubmit">确认修改</van-button>
    </div>
</template>

<script>
inject: ['reload']
import axios from 'axios'
import { Dialog } from 'vant';
export default {
    props: ['name'],
    data () {
        return {
            username:'',
            user:'',
            email:'',
            role:'',
            id:'',
fileList:[],
        }
    },

    async created () {
    let names  = sessionStorage.getItem('data')
    this.username = JSON.parse(names)

    // console.log(this.id)
    let res=await axios.get('/api/changeuser',{params:{user: this.name}}).then(res=>{
      // console.log(res.data[0])
      this.data=res.data
    //   console.log(res.data)
      this.user = res.data[0].user
      this.email = res.data[0].email
      this.role = res.data[0].role
      this.id = res.data[0].user_id
    //   this.price = res.data[0].price
    })
    
  },
  methods: {
      onClickLeft(){
            this.$router.go(-1)
        },
      onSubmit() {
      let data = {
        id :this.id,
        // userName: this.username,
        user: this.user,
        email: this.email,
        role: this.role,
      }
      this.axios.get('/api/updateuser', {
        params: data
      }).then((res) => {
         var code = res.data.statusCode
         var msg = res.data.msg
         if( code == 200) {
             console.log(res.data)
             Dialog.alert({
            message: msg,
            
          }).then(() => {
              // confirm:this.$router.push('/merchant')
              this.reload()
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
  }
}
</script>