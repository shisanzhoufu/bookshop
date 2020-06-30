let express = require('express');
let router = express.Router();
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
    }
    
});


//获取客户端数据
router.get('/', function(req, response, next) {
    let name = req.query.userName
    // console.log(name)
    let pwd = req.query.userPassword
    let email = req.query.email
    let radio = req.query.radio

    // 查找数据表中是否已经存在名字
    connection.query("SELECT * FROM user_info WHERE user = '"+name+"'",function (err,res,fields) {
        
        let uName = res[0]
        
        if(uName==undefined){
        //    不存在时插入数据
            connection.query('INSERT INTO user_info SET  ?',{user:name,password:pwd,email:email,role:radio},function(err,data){
                if(err){
                    response.send({statusCode:0, msg:'注册失败，请重试'})
                    return 
                } else {
                    response.send({statusCode:200, msg:'注册成功'})
                    return 
                } 
    })
        }else{
             
            response.send({statusCode:0, msg:'用户名已存在'})
}
})

});
module.exports = router;