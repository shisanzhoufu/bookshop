import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
import register from '../views/register.vue'
import category from '../views/category.vue'
import categoryList from '../views/categorylist.vue'
import products from '../views/products.vue'
import personal from '../views/personal.vue'
import buycar from '../views/buycar.vue'
import oder from '../views/oder.vue'
import comment from '../views/comment.vue'
import addComment from '../views/addComment.vue'
import checkoder from '../views/checkoder.vue'
import merchant from '../views/merchant.vue'
import publish from '../views/publish.vue'
import bookedit from '../views/bookedit.vue'
import editlist from '../views/editlist.vue'
import changelist from '../views/changelist.vue'
import seeoder from '../views/seeoder.vue'
import manager from '../views/manager.vue'
import userInfo from '../views/userInfo.vue'
import changeuser from '../views/changeuser.vue'
import commentInfo from '../views/commentInfo.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    
  },
  {
    path: '/register',
    name: 'register',
    component:register
  },
  {
    path: '/category',
    name: 'category',
    component:category
  },
  {
    path: '/categoryList/:name',
    name: 'categoryList',
    component:categoryList,
    props:true
  },
  {
    path: '/products/:name',
    name: 'products',
    component:products,
    props:true
  },
  {
    path: '/personal',
    name: 'personal',
    component:personal,
    props:true,
    meta: { 
      needLogin:true
     }
  },
  {
    path: '/buycar',
    name: 'buycar',
    component:buycar,
    props:true,
    meta: { 
      needLogin:true
     }
  },
  {
    path: '/oder/:name',
    name: 'oder',
    component:oder,
    props:true,
    meta: { 
      needLogin:true
     }
  },
  {
    path: '/comment',
    name: 'comment',
    component:comment,
    props:true,
  },
  {
    path: '/addComment',
    name: 'addComment',
    component:addComment,
    props:true,
    meta: { 
      needLogin:true
     }
  },
  {
    path: '/checkoder',
    name: 'checkoder',
    component:checkoder,
    props:true,
  },
  {
    path: '/merchant',
    name: 'merchant',
    component:merchant,
    props:true,
  },
  {
    path: '/publish',
    name: 'publish',
    component:publish,
    props:true,
  },
  {
    path: '/bookedit',
    name: 'bookedit',
    component:bookedit,
    props:true,
  },
  {
    path: '/editlist',
    name: 'editlist',
    component:editlist,
    props:true,
  },
  {
    path: '/changelist/:id',
    name: 'changelist',
    component:changelist,
    props:true,
  },
  {
    path: '/seeoder',
    name: 'seeoder',
    component:seeoder,
    props:true,
  },
  {
    path: '/manager',
    name: 'manager',
    component:manager,
    props:true,
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component:userInfo,
    props:true,
  },
  {
    path: '/changeuser/:name',
    name: 'changeuser',
    component:changeuser,
    props:true,
  },
  {
    path: '/commentInfo',
    name: 'commentInfo',
    component:commentInfo,
    props:true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
