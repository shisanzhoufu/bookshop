<template>
    <div>
        <van-nav-bar
            title="商品修改"
            
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        
        <van-cell-group>
            <van-field v-model="title" label="商品名称"  />
            <van-field v-model="brief" label="商品描述"  />
            <van-field v-model="price" label="商品价格"  />
            <van-field v-model="stock" label="库存" />
            
        </van-cell-group>
        <!-- 头像上传 -->
    <!-- <p>商品图片</p>
      <van-uploader :after-read='onRead'  v-model="fileList" multiple :max-count='1' image-fit='cover'/> -->
      <van-button type="primary" block @click="onSubmit">确认发布</van-button>
    </div>
</template>

<script>
inject: ['reload']
import axios from 'axios'
import { Dialog } from 'vant';
export default {
    props: ['id'],
    data () {
        return {
            username:'',
            title:'',
            brief:'',
            stock:'',
            price:'',
fileList:[],
        }
    },

    async created () {
    let names  = sessionStorage.getItem('data')
    this.username = JSON.parse(names)

    // console.log(this.id)
    let res=await axios.get('/api/changelist',{params:{id: this.id}}).then(res=>{
      // console.log(res.data[0])
      this.data=res.data
    //   console.log(res.data)
      this.title = res.data[0].title
      this.brief = res.data[0].brief
      this.stock = res.data[0].stock
      this.price = res.data[0].price
    })
    
  },
  methods: {
      onClickLeft(){
            this.$router.go(-1)
        },
      onSubmit() {
      let data = {
          id :this.id,
        userName: this.username,
        title: this.title,
        brief: this.brief,
        price: this.price,
        stock:this.stock,
        img:this.img
      }
      this.axios.get('/api/updatelist', {
        params: data
      }).then((res) => {
         var code = res.data.statusCode
         var msg = res.data.msg
         if( code == 200) {
             console.log(res.data)
             Dialog.alert({
            message: msg,
            
          }).then(() => {
              // confirm:this.$router.push('/merchant')
              this.reload()
          });
          
          }else {
            
            Dialog.alert({
            message: msg,
            
          }).then(() => {
          confirm:this.$router.go(0)
          });
          }
        
      })
    },
  }
}
</script>