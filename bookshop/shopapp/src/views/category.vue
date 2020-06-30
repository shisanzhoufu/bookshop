<template>
    <div id="category">
        <!-- 侧边栏 -->
        <van-tree-select
            :items="items"
            :main-active-index.sync="mainActiveIndex"
            @click-nav="changeRight"
            height="100vh - 54px"
        >

        <!-- 九宫格 -->
        <template slot="content">
        <van-grid :border="false" :column-num="3" >
            <van-grid-item v-for="(item,index) in subCategoryList" :key="index" :icon="item.img" :text="item.name" :to="'/categoryList/'+item.name">
                
            </van-grid-item>
        </van-grid>
        </template>
    </van-tree-select>

        <!-- 导航栏 -->
        <tab-bar></tab-bar>
    </div>
</template>

<script>
import tabBar from '../components/tabBar'
import axios from 'axios'
export default {
    data () {
        return {
            searchData:"",
            mainActiveIndex: 0,
            subCategoryList:[],
            data:{}
        }
    },
    async created ()  {
    let res=await axios.get('/api/category').then(res=>{
      this.data=res.data
    //   console.log(res.data)
    })
  },
    components: {
        tabBar,
    },
    computed: {
      items:function(){
      if(this.data.grid==undefined){
            return []
      }else{
        let arr=[]
        // console.log(this.data.grid)
        this.data.grid.forEach((item,index)=>{
            item.text=item.categorygrid_name
            arr.push(item)
        })
        // console.log(arr)
        return arr
      }
    }
  },
  methods: {
        changeRight:function(index){
            // console.log(index)
            this.mainActiveIndex=index
        }
    },
    watch: {
        mainActiveIndex:async function(){
        if(this.items.length!==0){  
            // console.log(this.mainActiveIndex)
            let id=this.mainActiveIndex
            // console.log(id)

            let res=await axios.get('/api/categorys')
            // console.log(res.data)
            res.data.forEach((item,index)=>{
                // console.log(item)
                if(id === index){
                    // console.log(index)
                    this.subCategoryList = item[0]
                } 
        })
        // console.log(this.subCategoryList[0])
            
        }else{
            this.subCategoryList=[]
            // console.log('list')
        }
    }
    },
}
</script>

<style>

</style>