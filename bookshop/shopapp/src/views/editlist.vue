<template>
    <div>
        <van-nav-bar
            title="商品管理"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="cartlists" v-for="(item,index) in book" :key="index">
    <van-swipe-cell>
        <van-card
        :num="item.stock"
        :price="item.price"
        :desc="item.brief"
        :title="item.title"
        class="goods-card"
        :thumb="require('C:/00inbox/wamp/www/web/bookshop/shopnode/static/img/1592970362066.jpeg')"
        />
        <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="delbook(item.title)"/>
            <van-button square type="primary" text="修改" class="delete-button" :to="'/changelist/'+item.id"/>
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
            list:[],
        }
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        delbook(val){
        axios.get('/api/delbook',{params:{title: val}}).then(res=>{
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
           this.reload()
            
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
    book(){
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
    let res=await axios.get('/api/editlist',{params:{username: this.username}}).then(res=>{
      // console.log(res.data[0])
      this.data=res.data
      // console.log(res.data.length)
      // for(let i = 0;i++;i<res.data.length){
      //   let obj={
      //     url:red.data[i].img
      //   }
      //   this.list.push(obj)
        
      // }
      // console.log()
      
    })
    
  },
}
</script>

<style>
  /* .goods-card {
    margin: 0;
    background-color: white;
  }

  .delete-button {
    height: 100%;
  } */
</style>