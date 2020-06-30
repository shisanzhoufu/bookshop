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
    //   console.log(req)
    // let username = req.query.username
    // console.log(username)
        connection.query("SELECT * FROM user_info",function (err,res,fields) {
            if(err){
                throw err
            }else{
                response.send(res)
            }
                    
                        
        });  
  });

module.exports = router;