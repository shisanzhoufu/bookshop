<template>
    <div>
        <van-nav-bar
            title="商品发布"
            
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
        />
        
        <van-cell-group>
            <van-field v-model="title" label="商品名称" placeholder="请输入商品名称" />
            <van-field v-model="brief" label="商品描述" placeholder="请输入商品描述" />
            <van-field v-model="price" label="商品价格" placeholder="请输入商品价格" />
            <van-field v-model="stock" label="库存" placeholder="请输入库存" />
            
        </van-cell-group>
        <!-- 头像上传 -->
    <p>商品图片</p>
      <van-uploader :after-read='onRead'  v-model="fileList" multiple :max-count='1' image-fit='cover' enctype="multipart/form-data"/>
      <van-button type="primary" block @click="onSubmit">确认发布</van-button>
    </div>
</template>
<script>
inject: ['reload']
import { Uploader } from 'vant';
import axios from 'axios'
import { Dialog } from 'vant';
export default {
    data () {
        return {
            username:'',
            title:'',
            brief:'',
            price:'',
            stock:'',
            fileList: [],
            img:img
        }
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        onSubmit() {
      let data = {
        userName: this.username,
        title: this.title,
        brief: this.brief,
        price: this.price,
        stock:this.stock,
        img:this.img
      }
      this.axios.get('/api/addbook', {
        params: data
      }).then((res) => {
         var code = res.data.statusCode
         var msg = res.data.msg
         if( code == 200) {
            //  console.log(res.data)
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
    // 头像图片传到后端
    onRead (file) {
      let data = new FormData();
      data.append("file", file.file);//很重要 data.append("file", file);不成功
      this.axios.post('/api/upload',data, {
          headers: { "content-type": "multipart/form-data" }
      }).then(res => {
        console.log(res.data)
        // res.data.id
        this.img = res.data
        this.fileList.push(res.data) 
      })
    }
    },
   created () {
    let names  = sessionStorage.getItem('data')
    this.username = JSON.parse(names)
    // console.log(this.username)
    // console.log(api)
    // let res=await axios.get('/api/products',{params:{ name: this.name }}).then(res=>{
    //   // console.log(res.data[0])
    //   this.data=res.data
    //   console.log(res.data)


    // })
    
  },
}
</script>