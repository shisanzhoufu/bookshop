<template>
    <div>
         <div class="grid" >
            <van-grid :column-num="2">
                <van-grid-item icon="notes-o" text="用户管理" to="/userInfo"/>
                <van-grid-item icon="gem-o" text="留言管理" to="/commentInfo"/>
            </van-grid>
            </div>
            <div class="exit">
            <van-button type="primary" block color="red" plain @click="exit">退出登录</van-button>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            
        }
    },
    methods: {
        exit(){
            window.sessionStorage.removeItem('data');
            // window.location.reload()
            this.$router.push('/')
        },
    }
}
</script>

<style scoped>
.grid{
    margin-top: 150px;
}
</style>