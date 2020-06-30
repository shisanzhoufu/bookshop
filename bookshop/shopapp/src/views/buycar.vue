<template>
    <div id="buycar">
        <van-nav-bar
            title="购物车"
            left-arrow
            @click-left="onClickLeft"
        />

        <div class='info'>
            <span>30天无忧退货</span>
            <span>48小时快速退款</span>
            <span>满88元免邮费</span>
        </div>
        <!-- 商品列表 -->
        <div class="list">
            <div class="cartlist" v-for="(item,index) in book" :key="index">
                <van-checkbox v-model="item.checked" @change="changeEvent($event,item)"></van-checkbox>
                <van-image width="70" height="70" :src="item.img" />
                <div class="proBreif">
                    <div class="proTitle">{{item.title}}<span class="num">×{{item.num}}</span></div>
                    <!-- <p class="breif">{{item.goods_specifition_name_value}}</p> -->
                    <p class="price">￥{{item.price}}</p>
                </div>
            </div>
        </div>

        <!-- 提交订单 -->
        <van-submit-bar :price="100" button-text="提交订单" @submit="onSubmit">
            <van-checkbox v-model="checkedAll" @click="checkAll">全选</van-checkbox>
        </van-submit-bar>
        
    </div>
</template>

<script>
// import {mapState} from 'vuex'
import axios from 'axios'
export default {
    data () {
        return {
            data:{},
            username:'',
            checkedAll:false,
        }
    },
    async created () {
    let names  = sessionStorage.getItem('data')
    this.username = JSON.parse(names)

    // console.log(data)
    let res=await axios.get('/api/buycar',{params:{username: this.username}}).then(res=>{
      // console.log(res.data[0])
      this.data=res.data
      console.log(res.data)
    })
    
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
  methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        checkAll(){

        },
        
     onSubmit(){
        
    }
  },
}
</script>

<style>
   .info{
        display: flex;
        justify-content: space-around;
        color: #999;
        font-size: 12px;
        /* background-color: #efefef; */
        height: 24px;
        line-height: 24px;
    }
    van-image{
    background-color: #efefef;
    }
    .cartlist{
        display: flex;
        align-items: center;
        padding: 10px 5px;
        
    }
    .proTitle{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .proBreif{
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        height: 70px;
    }
    
    .breif{
        font-size: 12px;
        color: #999;
    }
    
    .goods-card {
        margin: 0;
        background-color: white;
    }
    .van-swipe-cell__right
.delete-button
     {
        height: 104px;
    }
</style>