<template>
    <div>
        <van-nav-bar
            title="信息修改"
            
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
      <van-uploader :after-read='onRead'  v-model="fileList" multiple :max-count='1' image-fit='cover'/>
      <van-button type="primary" block @click="onSubmit">确认发布</van-button>
    </div>
</template>

<script>
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
            fileList:[],
            img:img
        }
    },
    created () {
    let names  = sessionStorage.getItem('data')
    this.username = JSON.parse(names)
    // console.log(this.username)
    // console.log(api)
    this.axios.get('/api/products',{params:{ name: this.name }}).then(res=>{
      // console.log(res.data[0])
      this.data=res.data
    //   console.log(res.data)


    })
    
  },
}
</script>