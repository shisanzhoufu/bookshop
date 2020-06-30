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

router.get('/', function(req, response, next) {
    let user_name =  req.query.username
    let star =  req.query.star
    let comment =  req.query.comment
        connection.query("INSERT INTO comment SET  ?",{user_name:user_name,star:star,comment:comment},function (err,res,fields) {
            
                    response.send({statusCode:200, msg:'评论成功'})
                        
        });  
  });

module.exports = router;