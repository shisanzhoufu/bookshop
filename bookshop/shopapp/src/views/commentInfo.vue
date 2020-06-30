<template>
    <div class="comment">
        <van-nav-bar
            title="评论列表"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
<!-- <van-icon name="edit" color="#1989fa" to="/addComment"  size="40"/><span>发表评论</span> -->
        <!-- 评论列表 -->
        <div id="commentlist" >
            
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            
        <!-- <div v-for="(item,index) in commentList" :key="index" class="list">  -->
            <div class="cartlists" v-for="(item,index) in commentList" :key="index">
            <van-swipe-cell >
            <!-- <van-icon name="friends-o" color="#1989fa" size="40"/> -->
            <span class="name">{{item.user_name}}</span> <van-rate v-model="item.star" readonly/>
   		    <div>{{item.comment}}</div>
            <h6 class="time">{{item.time}}</h6>
        <!-- </div> -->
        <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="delcomment(item.comment_id)"/>
        </template>
        </van-swipe-cell>
        </div>
        </van-list>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import { Dialog } from 'vant';
inject: ['reload']
import tabBar from '../components/tabBar.vue'
export default {
    data () {
        return {
            data:{},
            list: [],
            loading: false,
            finished: false,
        }
    },
  computed: {
    commentList(){
        if(this.data){
        return this.data
      }else{
        return []
      }
    }  
  },
   methods: {
       onClickLeft(){
            this.$router.go(-1)
        },
       delcomment(val){
        axios.get('/api/delcomment',{params:{id: val}}).then(res=>{
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
            
            //   this.$router.go(-1)
           this.reload()
            
          }else {
            Dialog.alert({
            message: msg,
          }).then(() => {
          // on close
          this.reload()
          });
          }
            })
        },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  },
  async created () {
    // console.log(api)
    let res=await axios.get('/api/commentlist').then(res=>{
      // console.log(res.data[0])
      this.data=res.data
    //   console.log(res.data)
    })
    
  }
}
</script>
<style>

.list{
    margin-top: 10px;
    border-top: 1px solid gray;
}
.time{
    text-align: right;
    color: gray;
}
.name{
    font-size: 25px;
    text-align: left;
    margin-left: 10px;
}

.title{
    text-align: center;
}
</style>