<template>
    <div>
 <!-- 搜索框 -->
   <form action="/">
  <van-search
    v-model="value"
    show-action
    placeholder="百万好书等你来搜"
    @search="onSearch"
  />
</form>

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

    </div>
</template>
<script>
export default {
    data () {
        return {
           value: '', 
        }
    },
    methods: {
    onSearch(val) {
      this.axios.get('/api/search',{params:{value: val}}).then(res=>{
      // console.log(res.data[0])
      this.data=res.data
      console.log(res.data)
    })
    },
  },
  computed: {
        gridList(){
         
      if(this.data){
        return this.data
      }else{
        return []

        }
        }
    }
}
</script>