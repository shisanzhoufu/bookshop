let express = require('express');
let router = express.Router();
// var CircularJSON = require('circular-json');
//————————————连接数据库——————————
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'bookshop'
});
 
connection.connect((err)=>{
    if(err){
     console.log(err)
    }else{
        // console.log("数据库连接成功")
    }
    
});
//获取客户端数据
router.get('/', function(req, response, next) {
  // 把从客户端传来的名字，密码赋值到新的变量
    let name = req.query.userName
    let pwd = req.query.userPassword
    // 通过名字查询数据库用户表得到密码
      connection.query("SELECT * FROM user_info WHERE user = '"+name+"'",function (err,res,fields) {
        // 当没有查找到密码时
        // console.log(res[0].user)
              if(err) {
              throw err
               return;
              }else{
              if(res.length>0){
                //将数据库传来的数据转化为JSON格式

              let uPasswordString = JSON.stringify(res[0].password);
              let userPassword = JSON.parse(uPasswordString);
              let uUser = JSON.stringify(res[0].user);
              let user = JSON.parse(uUser);
              let role = res[0].role;
              // let user = res[0].user;
              // req.session.user = user
              // req.session.password = userPassword
              
              // response.send(pn)
                if(userPassword == pwd){
                  //将数据库的密码userPassword 和服务端 传来的密码相等
                  // console.log(req.session)
                  response.send({statusCode:200, msg:'登录成功',name:user,role:role})
                  return
              }else{
              response.send({ statusCode:0, msg:'密码不正确'})  
              return
            } 
              }
              } 
              //如果没有数据，说明用户名填写错误 
              response.send({ statusCode:0, msg:'用户名不正确'})    
                
             
      });   
});
module.exports = router;