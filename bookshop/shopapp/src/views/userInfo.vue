<template>
    <div>
        <van-nav-bar
            title="用户管理"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="cartlists" v-for="(item,index) in user" :key="index">
    <van-swipe-cell >
        <van-cell-group :title="item.user">
        <van-cell title="身份" :value="item.role" />
        <van-cell title="邮箱" :value="item.email" />
    </van-cell-group>
        <!-- <van-cell title="用户名" :value="item.user" />
        <van-cell title="身份" :value="item.role" />
        <van-cell title="邮箱" :value="item.email" /> -->
        <!-- <h3>{{item.user}}</h3>
        <p>{{item.role}}</p>
        <p>{{item.email}}</p> -->
        <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="deluser(item.user)"/>
            <van-button square type="primary" text="修改" class="delete-button" :to="'/changeuser/'+item.user"/>
        </template>
        </van-swipe-cell>
        </div>
    </div>
</template>

<script>
 inject: ['reload']
import axios from 'axios'
import { Dialog } from 'vant';
export default {
    data () {
        return {
            data:{},
            username:'',
            role:''
        }
    },
    methods: {
        
        onClickLeft(){
            this.$router.go(-1)
        },
        deluser(val){
        axios.get('/api/deluser',{params:{user: val}}).then(res=>{
            // console.log(res.data[0])
            this.data=res.data
            // console.log(res.data)
             var code = res.data.statusCode
         var msg = res.data.msg
         if( code == 200) {
          Dialog.alert({
            message: msg,
          }).then(() => {
          // on close
          this.reload()
          });
            
              this.$router.go(-1)
        //    this.reload()
            
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
    computed: {
    user(){
      if(this.data){
        return this.data
      }else{
        return []
      }
    }, 
  },
    async created () {
    let names  = sessionStorage.getItem('data')
    this.username = JSON.parse(names)

    // console.log(data)
    let res=await axios.get('/api/checkuser').then(res=>{
      // console.log(res.data[0])
      this.data=res.data
    //   console.log(res.data)
    })
    
  },
}
</script>

<style>
.cartlists{
    margin: 5px 0px;
}
</style>