<template>
    <div id="products">
        <!-- 顶部tabBartabBar -->
        <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />

        <!-- 轮播图 -->
        <!-- <div v-for="(item, index) in data" :key="index"> -->
        <van-swipe :autoplay="3000">
            <van-swipe-item >
                <img v-lazy="book.img" :src="book.img" class="swiperimg"/>
            </van-swipe-item>
        </van-swipe>
        <div class="info">
            <span>30天无忧退货</span>
            <span>48小时快速退款</span>
            <span>满88元免邮费</span>
        </div>
            <div>
                
                <h3 class="title">{{book.title}}</h3>
                <h6 class="gooodsbrief">{{book.brief}}</h6>
                <P class="price">￥{{book.price}}</P>
                <p class="stock">库存:{{book.stock}}</p>
                <p class="cell"><van-icon name="shop"  color="#1989fa" size="25" /> <span class="shop">{{book.merchant}}</span></p>
                <!-- <van-cell title="商家：" :value="book.merchant"  class="cell"/><van-icon name="chat-o" /> -->
            </div>
        <!-- </div> -->
        <!-- 商品导航 -->
        <van-goods-action safe-area-inset-bottom>

            <van-goods-action-icon icon="cart-o" text="购物车" to="/buycar" />
            <van-goods-action-icon icon="star-o" text="收藏" color="#ff5000" />
            <van-goods-action-button square type="warning" @click="onBuyCar"  text="加入购物车" />
            <van-goods-action-button square type="danger" @click="onOder" text="立即购买" :to="'/oder/'+book.title"/>
        </van-goods-action>
        
    </div>
</template>

<script>
import axios from 'axios'
import { Dialog } from 'vant';
export default {
    props: ['name'],
    data () {
        return {
            data:{},
            username:''
        }
    },
    async created () {
    let names  = sessionStorage.getItem('data')
    this.username = JSON.parse(names)
    // console.log(this.username)
    // console.log(api)
    let res=await axios.get('/api/products',{params:{ name: this.name }}).then(res=>{
      // console.log(res.data[0])
      this.data=res.data
      console.log(res.data[0].img)


    })
    
  },
  computed: {
    book(){
      if(this.data[0]){
        return this.data[0]
      }else{
        return []
      }
    }  
  },
  methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        onBuyCar(){
            let data = {
                user:this.username,
                img:this.book.img,
                book:this.book.title,
                price:this.book.price,
            }
        axios.get('/api/buycart',{
        params: data
      }).then(res=>{
        var code = res.data.statusCode
        var msg = res.data.msg
        // console.log(res.data)
            if(code == 200) {
                    Dialog.alert({
                    message: msg,
                    }).then(() => {
                    // on close
                    });
                    }
            })
        },
        onOder(){
            let data = {
                user:this.username,
                img:this.book.img,
                book:this.book.title,
                price:this.book.price,
            }
        axios.get('/api/oder',{
        params: data
      }).then(res=>{
        var code = res.data.statusCode
        var msg = res.data.msg
        // console.log(res.data)
            })
        }
    }
    
}
</script>

<style>
.info{
        display: flex;
        justify-content: space-around;
        color: #999;
        font-size: 12px;
        background-color: #efefef;
        height: 24px;
        line-height: 24px;
    }
     .gooodsbrief{
        text-align: left;
        color: rgb(151, 151, 151);
        margin-block-start:0.5em;
        margin-block-end:1em;
    }
    .price{
        color: red;
        text-align: left;
    }
   .stock{
       text-align: right;
       margin: 5px;
       font-size: 10px;
       
   }
    .title{
        text-align: left;
        /* margin-block-start:0em; */
        margin-block-end:0.5em;
    }
    .value{
        width: 260px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .cell{
        margin: 10px;
margin-bottom: 70px;
    }
    .shop{
        margin-bottom: 10px;
    }
</style>