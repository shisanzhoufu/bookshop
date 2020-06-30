<template>
    <div id="categoryList">
        <!-- 顶部tabBartabBar -->
        <van-nav-bar
            :title="name"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        

        <!-- 顶部导航栏 -->


            <!-- 九宫格内容 -->
            <!-- <div v-if="item.plist"> -->
            <van-grid column-num="2">
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
            <!-- </div> -->
        <!-- </van-tab> -->

    </div>
</template>

<script>
import axios from 'axios'
export default {
    props: ['name'],
    data () {
        return {
           data:{} 
        }
    },
    computed: {
        gridList(){
         
      if(this.data){
        return this.data
      }else{
        return []

        }
        }
    },
    async created () {
    // console.log(this.id)
    
    //  let res=await axios.get('/api/categorylist',{params:{ id: this.id }})
     let res=await axios.get('/api/categorylist',{params:{ name: this.name }}).then(res=>{
      this.data=res.data
    //  console.log(res.data[0].book_img)
     })
    },

    methods: {
        onClickLeft(){
            this.$router.go(-1)
        }
    }
}
</script>

<style>
.van-grid-item{
    overflow: hidden;
    box-sizing: border-box;
}
.price{
    color :red;
}
.van-ellipsis{
    width: 100%;
    padding: 0 10px;
    margin: 0px;
}
</style>