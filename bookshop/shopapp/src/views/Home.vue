<template>
  <div class="home">
        <!-- <img :src="require('C:/00inbox/wamp/www/web/bookshop/shopnode/static/img/1592961791517.jpeg')" alt=""> -->

    <!-- <img :src="" alt=""> -->
   <!-- 搜索框 -->
   <form action="/">
  <van-search
    v-model="value"
    show-action
    placeholder="百万好书等你来搜"
    @search="onSearch"
    @cancel="onCancel"
  />
</form>

<van-grid column-num="2" v-show="isShow">
                <van-grid-item  v-for="(item,index) in gridList" :key="index" :to="'/products/'+item.book_name">
                    <van-image
                        width="100"
                        height="100" 
                        :src="item.book_img" alt=""
                        />
                        <h4 class="van-ellipsis">{{item.book_name}}</h4>
                        <p class="price">{{item.book_price}}</p>
                </van-grid-item>
             </van-grid>

     <!-- 轮播图 -->
     <div v-show="isHome">
<van-swipe :autoplay="3000" width="100%" height="200">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image.homeswiper_img" class="swiperimg"/>
      </van-swipe-item>
    </van-swipe>

    <!-- 分类宫格 -->
    <van-grid  :column-num="5">
        <van-grid-item v-for="(item,index) in channal" :key="index" :icon="item.homegrid_img" :to="'/categoryList'" :text="item.homegrid_name"/>
    </van-grid>

    <!-- 热门图书 -->
    
          <van-panel title="热门图书">
            <van-grid :border="false" :column-num="2" >
                <van-grid-item v-for="(goodsList,index5) in hotbook" :key="index5" >
                <van-image :src="goodsList.homebook_img" lazy-load/>
                <h5 class="title2">{{goodsList.homebook_name}}</h5>
                <h6 class="price">{{goodsList.homebook_price}}</h6>
              </van-grid-item>
            </van-grid>
          </van-panel> 
<!-- 底部导航栏 -->
    <div>
      <tab-bar></tab-bar>
    </div>
     </div>
    
    
  </div>
</template>

<script>
import axios from 'axios'
import tabBar from '../components/tabBar.vue'
import search from '../components/search'
// 懒加载导入
import Vue from 'vue';
import { Lazyload } from 'vant';
Vue.use(Lazyload);
export default {
  data () {
    return {
    data:{},
    value: '',  
    isHome:true,
    isShow:false 
    }
  },
  components: {
    tabBar,
  },
  computed:{
    images:function(){
      if(this.data){
        // console.log('轮播图导入成功')
        return this.data.banner

      }else{
        // console.log('轮播图导入失败')
        return []
      }
    },
    
    channal(){
      if(this.data.channal){
        return this.data.channal
      }else{
        return []
      }
    },
    hotbook(){
      if(this.data.hotbook){
        return this.data.hotbook
      }else{
        return []
      }
    },
    gridList(){
         
      if(this.data){
        return this.data
      }else{
        return []

        }
        }
  },
   methods: {
    onSearch(val) {
      this.isHome = false
      this.isShow = true
      this.axios.get('/api/search',{params:{value: val}}).then(res=>{
      // console.log(res.data[0])
      this.data=res.data
      // console.log(res.data)
    })
    },
    onCancel() {
      this.isHome = true
      this.isShow = false
      confirm:this.$router.go(0)
    },
  },
  async created () {
    // console.log(api)
    let res=await axios.get('/api/home').then(res=>{
      // console.log(res.data[0])
      this.data=res.data
      // console.log(res.data)
    })
    
  }

}
</script>

<style>

#nav{
  padding: 0px;
}
  .swiperimg{
   width:100%;
   height:100%;
  }
  .price{
    /* position: absolute;
    bottom:1px;
    left:10px; */
    color:rgb(161, 14, 14);
    margin: 0px;
  }
</style>
