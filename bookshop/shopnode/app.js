let express = require('express')
let session = require('express-session')
let app = express()
let bodyParser = require('body-parser')
let loginRouter = require('./routes/login');
let registerRouter = require('./routes/register')
let uploadRouter = require('./routes/upload')
let homeRouter = require('./routes/home/home')
let categoryRouter = require('./routes/category/category')
let categorysRouter = require('./routes/category/categorys')
let categorylistRouter = require('./routes/category/categorylist')
let productsRouter = require('./routes/products/products')
let buycartRouter = require('./routes/products/buycart')
let buycarRouter = require('./routes/oder/buycar')
let oderRouter = require('./routes/oder/oder')
let addressRouter = require('./routes/oder/address')
let saveaddRouter = require('./routes/oder/saveAdd')
let seeoderRouter = require('./routes/oder/seeoder')
let payRouter = require('./routes/oder/pay')
let commentlistRouter = require('./routes/comment/commentlist')
let addcommentRouter = require('./routes/comment/addcomment')
let checkoderRouter = require('./routes/oder/ckeckoder')
let searchRouter = require('./routes/search')
let addbookRouter = require('./routes/merchant/addbook')
let roleRouter = require('./routes/role')
let editlistRouter = require('./routes/merchant/editlist')
let delbookRouter = require('./routes/merchant/delbook')
let changelistRouter = require('./routes/merchant/changelist')
let updatelistRouter = require('./routes/merchant/updatelist')
let lookoderRouter = require('./routes/merchant/seeoder')
let checkuserRouter = require('./routes/manager/checkuser')
let deluserRouter = require('./routes/manager/deluser')
let changeuserRouter = require('./routes/manager/changeuser')
let updateuserRouter = require('./routes/manager/updateuser')
let delcommentRouter = require('./routes/manager/delcomment')
let cors=require('cors')
let path = require('path')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 配置静态资源目录 整一个文件夹 通过域名能访问
app.use(express.static(path.join(__dirname,"../static")))
//数据模型
//路由配置

//session配置
app.use(session({
  //配置加密字符串，他会在原有的基础上和字符串拼接起来去加密
  //目的是为了增加安全性，防止客户端恶意伪造
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,//无论是否适用Session，都默认直接分配一把钥匙
  cookie: { secure: true }
}))


// 登录路由
app.use('/api/login',loginRouter)
// 注册路由
app.use('/api/register',registerRouter)
// 上传路由
app.use('/api/upload',uploadRouter)

//主页路由
app.use('/api/home',homeRouter)

//分类侧边栏路由
app.use('/api/category',categoryRouter)
//分类九宫格路由
app.use('/api/categorys',categorysRouter)

//分类详情路由
app.use('/api/categorylist',categorylistRouter)
//商品详情路由
app.use('/api/products',productsRouter)
//添加购物车路由
app.use('/api/buycart',buycartRouter)
//购物车详情路由
app.use('/api/buycar',buycarRouter)
//订购详情路由
app.use('/api/oder',oderRouter)
//订购详情路由
app.use('/api/address',addressRouter)
//添加地址路由
app.use('/api/saveadd',saveaddRouter)
//查看预订单地址路由
app.use('/api/seeoder',seeoderRouter)
//提交订单路由
app.use('/api/pay',payRouter)
//评论列表路由
app.use('/api/commentlist',commentlistRouter)
//发表评论路由
app.use('/api/addcomment',addcommentRouter)
//查看订单路由
app.use('/api/ckeckoder',checkoderRouter)
//搜索路由
app.use('/api/search',searchRouter)
//发布图书路由
app.use('/api/addbook',addbookRouter)
//身分认证路由
app.use('/api/role',roleRouter)
//商家图书查询路由
app.use('/api/editlist',editlistRouter)
//商家图书删除路由
app.use('/api/delbook',delbookRouter)
//商家图书修改查询数据路由
app.use('/api/changelist',changelistRouter)
//商家图书修改路由
app.use('/api/updatelist',updatelistRouter)
//商家查看订单路由
app.use('/api/lookoder',lookoderRouter)
//管理员查看用户路由
app.use('/api/checkuser',checkuserRouter)
//管理员删除用户路由
app.use('/api/deluser',deluserRouter)
//管理员修改查询用户路由
app.use('/api/changeuser',changeuserRouter)
//管理员修改用户路由
app.use('/api/updateuser',updateuserRouter)
//管理员删除评论路由
app.use('/api/delcomment',delcommentRouter)

app.listen(3000,function(){
    console.log("服务端正在运行")
})