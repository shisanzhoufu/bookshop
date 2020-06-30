<template>
    <div id="addComment">
        
          对本站评价：<van-rate v-model="value" />
        <van-field
            v-model="message"
            rows="2"
            autosize
            label="留言"
            type="textarea"
            maxlength="50"
            placeholder="请输入评论"
            show-word-limit
        />
        <van-button type="primary" block color="#1989fa" @click="add">发表评论</van-button>
    </div>
</template>

<script>
import axios from 'axios'
import tabBar from '../components/tabBar.vue'
export default {
    data () {
        return {
            value:3,
            message:'',
            username:''
        }
    },
    methods: {
        add(){
            
        this.axios.get('/api/addcomment',{params: {username:this.username,star:this.value,comment:this.message}}).then(res=>{
      // console.log(res.data[0])
    //   this.data=res.data
    //   console.log(res.data)
    var code = res.data.statusCode
         var msg = res.data.msg
         if( code == 200) {
            this.$router.push('/comment')
          }else {
            Dialog.alert({
            message: msg,
          }).then(() => {
          // on close
          });
          }
    })
    
        }
    },
    async created() {
    let names = sessionStorage.getItem("data");
    this.username = JSON.parse(names);
    }
}
</script>
<style>
#addComment{
    /* text-align: center; */
    margin: 50px 5px;
}
</style>