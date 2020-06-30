<template>
    <div class="comment">
        <h2 class="title">评论列表</h2>
        <van-button type="primary"  color="#1989fa" class="btn" to="/addComment">发表评论</van-button>
<!-- <van-icon name="edit" color="#1989fa" to="/addComment"  size="40"/><span>发表评论</span> -->
        <!-- 评论列表 -->
        <div id="commentlist" >
            <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            
        <div v-for="(item,index) in commentList" :key="index" class="list"> 
            <!-- <van-icon name="friends-o" color="#1989fa" size="40"/> -->
            <span class="name">{{item.user_name}}</span> <van-rate v-model="item.star" readonly/>
   		    <div>{{item.comment}}</div>
            <h6 class="time">{{item.time}}</h6>
        </div>
        </van-list>
        </div>
        


<!-- 底部导航栏 -->
    <div>
      <tab-bar></tab-bar>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
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
    components: {
    tabBar
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