<template>
    <div class="personal">
        <!-- 个人信息编辑 -->
        <div class="edit">
            <div class="edit-header">
                <div class="avater">
                    <img src="" alt="" >
                </div>
                <div class="brief">
                    <p>{{username}}</p>
                </div>
            </div>

        </div>
        <van-skeleton title avatar :row="3" />

        <!-- 九宫格 -->
        <div class="grid" v-show="isUser">
            <van-grid :column-num="3">
                <van-grid-item icon="notes-o" text="订单" to="/checkoder"/>
                <van-grid-item icon="star-o" text="收藏" />
                <van-grid-item icon="location-o" text="地址管理" />
                <van-grid-item icon="coupon-o" text="优惠券" />
                <van-grid-item icon="gem-o" text="会员中心" />
                <van-grid-item icon="balance-list-o" text="售后服务" />
                <van-grid-item icon="passed" text="账号安全" />
                <van-grid-item icon="service-o" text="客服" />
                <van-grid-item icon="envelop-o" text="意见反馈" />
            </van-grid>
        </div>

        <!-- <img src="/bookshop/shopnode/static/img" alt=""> -->
            <div class="grid" v-show="isMerchant">
            <van-grid :column-num="3">
                <van-grid-item icon="notes-o" text="订单管理" to="/seeoder"/>
                <van-grid-item icon="gem-o" text="商品管理" to="/editlist"/>
                <van-grid-item icon="location-o" text="商品发布" to="publish"/>
                <van-grid-item icon="coupon-o" text="优惠券" />
                <van-grid-item icon="star-o" text="被收藏" />
                <van-grid-item icon="passed" text="意见反馈" />
            </van-grid>
            </div>
        <!-- 退出 -->
        <div class="exit">
            <van-button type="primary" block color="red" plain @click="exit">退出登录</van-button>
        </div>

        <!-- 底部导航栏 -->
        <div>
        <tab-bar></tab-bar>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import tabBar from '../components/tabBar'

export default {
    data () {
        return {
            username:'',
            isUser:false,
            isMerchant:true
        }
    },
    components: {
        tabBar
    },
    methods: {
        exit(){
            window.sessionStorage.removeItem('data');
            // window.location.reload()
            this.$router.push('/')
        }
    },
    async created () {
    name  = sessionStorage.getItem('data')
    this.username = JSON.parse(name)
    // console.log(this.username)
    let res=await axios.get('/api/role',{params:{username: this.username }}).then(res=>{
    //   console.log(res.data[0].role)
    if(res.data[0].role == 1){
        this.isUser = true
        this.isMerchant = false
    }else if(res.data[0].role == 2){
        this.isMerchant = true
        this.isUser = false
    }

    })
  }
}
</script>

<style>
.personal{
    background-color: #f3f3f3;
}
.edit{
    
    height: 50px;
    margin:0px 8px;
}
.grid{
    border: 1px solid white;
    border-radius: 3%;
    background-color:white;
    height: 300px;
    /* margin-top: 10px; */
    margin:8px 8px;
}
.exit{
    border: 1px solid white;
    border-radius: 3%;
    background-color:white;
    /* height: 100px; */
    margin-bottom: 50px;
    margin-left:8px; 
    margin-right: 8px;  
}
.edit-header{
    /* margin: 25px; */
    height: 100px;
    /* width: 100%; */
    position: absolute;
}
.avater
img
{
    height: 80px;
    width: 80px;
    border-radius: 50%;
    float: left;
}
.brief{
    float: left;
    height: 60px;
    width: 200px;
    margin-bottom: 20px;
}
.brief
p{
    margin: 0px;
    padding: 0px;
}
</style>