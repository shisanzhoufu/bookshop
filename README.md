## 简介
本项目使用vue构建前端页面，node.js开发接口，mysql搭建数据库，是一个简单的购物商城项目。目前已完成大部分功能。
## 功能
### 已完成功能
- 首页
- 商品分类
- 商品详情
- 添加购物车
- 购物车查看
- 购买商品，生成订单
- 订单查询
- 商品搜索
- 地址管理
- 用户注册登录
- 商家发布、修改商品
- 查看订单
### 待开发功能
- 商品列表排序
- 购物车细节完善
- 商品评价
- 界面优化
## 技术栈
vue-cli3+express+vant+mysql
## 重难点
- 跨域
- 前端向服务端传递图片并保存
  - 前端通过axios，将二进制形式的图片信息传递给后端
  - 后端通过第三方插件multer将图片上传到服务器
  - 将二进制形式转换为图片形式加上时间戳保存在指定目录
  - 将图片的路径保存到数据库
  - 参考资料：https://blog.csdn.net/weixin_43747906/article/details/84996491
## 其他
部分新功能正在开发中，正在更新完善中
