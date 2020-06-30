<template>
  <div id="oder">
    <!-- 顶部tabBartabBar -->
    <van-nav-bar title="提交订单" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 联系人卡片 -->
    <van-contact-card
      :type="cardType"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="showList = true"
    />
    <!-- 地址列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </van-popup>

    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="bottom">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </van-popup>

    <div class="card">
        <van-card
        :price="book.price"
        :title="book.book_name"
        :thumb="book.img"
        />
    </div>
    

    <van-submit-bar :price="book.price*100" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
// import { ContactCard, ContactList, ContactEdit,AddressEdit,Area } from 'vant';
import axios from "axios";
import areaList from "../assets/js/area";
import { Dialog } from 'vant';
// import { SubmitBar } from 'vant';

export default {
    props: ['name'],
  data() {
    return {
      username: "",
      areaList,
      searchResult: [],
      data: {},
      goods:{},
      chosenContactId: null,
      editingContact: {},
      showList: false,
      showEdit: false,
      isEdit: false,
      chosenAddressId: null,
      list: []
    };
  },
  computed: {
    cardType() {
      return this.chosenAddressId !== null ? "edit" : "add";
    },

    currentContact() {
      const id = this.chosenAddressId;
      return id !== null ? this.list.filter(item => item.id === id)[0] : {};
    },
    book(){
      if(this.goods[0]){
        return this.goods[0]
      }else{
        return []
      }
    }  
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSubmit() {
        // 调接口提交订单
        // console.log(this.list)
        // console.log(this.currentContact.id)
       this.axios.get("/api/pay", {params: {bookname: this.name,username: this.username,aid:this.currentContact.id }}).then(res => {
        this.data = res.data
        
        var code = res.data.statusCode
         var msg = res.data.msg
         if(code == 200) {
             Dialog.alert({
            message: msg,
          }).then(() => {
          // on close
          this.$router.push('/checkoder')
          });
          
          // this.$router.go(0)
         }else{
             Dialog.alert({
            message: msg,
          }).then(() => {
          // on close
          });
         }
      });
    },
    onAdd() {
      this.editingContact = { id: this.list.length };
      this.isEdit = false;
      this.showEdit = true;
    },
    onSelect() {
      this.showList = false;
    },
    onEdit(item) {
      this.isEdit = true;
      this.showEdit = true;
      this.editingContact = item;
    },
    onSave(content) {
      let name
       let phone
       let province
       let city
       let region
       let detail_addr
    //    let group_message
    //    let areaCode
      let data = {
        username:this.username,
        name: content.name,
        phone: content.tel,
        province: content.province,
        city: content.city,
        region: content.county,
        detail_addr: content.addressDetail,
        // group_message: content.isDefault,
        // areaCode: content.areaCode
      };

    //   console.log(this.province);
    // 调接口插入新地址
       this.axios.get("/api/saveadd", { params: data }).then(res => {
        this.data = res.data
        console.log(this.data)
        var code = res.data.statusCode
         var msg = res.data.msg
         if(code == 200) {
             Dialog.alert({
            message: msg,
          }).then(() => {
          // on close
          });
          this.$router.go(-1)
         }else{
             Dialog.alert({
            message: msg,
          }).then(() => {
          // on close
          });
         }
      });
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {}
  },
  async created() {
    let names = sessionStorage.getItem("data");
    this.username = JSON.parse(names);

    // console.log(this.username)
    //   调接口获取oder订单渲染card
      await axios.get("/api/seeoder", {params: {bookname: this.name,username: this.username } }).then(res => {
        //   console.log(res.data)
        this.goods = res.data;
        // console.log(this.list )
      });
    //   调接口获取地址列表
      await axios.get("/api/address", { params: { username: this.username } })
      .then(res => {
        //   console.log(res.data)
        this.list = res.data;
        // console.log(this.list )
      });
      
  },
  async mounted () {
  }  
};
</script>

<style>
</style>