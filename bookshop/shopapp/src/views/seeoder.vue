<template>
    <div id="checkoder">
        <van-nav-bar
            title="订单查询"
            left-arrow
            @click-left="onClickLeft"
        />
    <div class="list">
            <div class="cartlist" v-for="(item,index) in book" :key="index">
               
                <van-image width="70" height="70" :src="require('C:/00inbox/wamp/www/web/bookshop/shopnode/static/img/1592973133986.jpeg')" />
                <div class="proBreif">
                    <div class="proTitle">{{item.book_name}}</div>
                    <p class="breif">{{item.address}}</p>
                    <p class="price">￥{{item.price}} <span class="user_name">{{item.user_name}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
inject: ['reload']
export default {
    data () {
        return {
            data:{},
            username:'',
            
        }
    },
    async created () {
    let names  = sessionStorage.getItem('data')
    this.username = JSON.parse(names)

    // console.log(data)
    let res=await axios.get('/api/lookoder',{params:{username: this.username}}).then(res=>{
      // console.log(res.data[0])
      this.data=res.data
      console.log(res.data)
    })
    
  },
  methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
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
}
</script>

<style scoped>
.user_name{
    text-align: right;
}
</style>