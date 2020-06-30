<template>
<div>
    <router-view/>
    <van-tabbar route v-model="active" bind:change="onChange">
      <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
      <!-- <van-tabbar-item icon="shopping-cart-o" to="/buycar">购物车</van-tabbar-item> -->
      <van-tabbar-item icon="records" to="/comment">留言板</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/personal">我的</van-tabbar-item>
    </van-tabbar>
</div>

</template>

<script>
export default {
    data () {
        return {
            active: 0,
        }
    },
    mounted () {
         switch (this.$router.path) {
                case "/category":
                    this.$router.path=2;
                    break;
                case "/":
                    this.$router.path=0;
                    break;
                default:
                    this.$router.path=0;
                    break;
            }
    }
}
</script>