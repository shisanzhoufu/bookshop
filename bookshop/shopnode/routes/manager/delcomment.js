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
    //   console.log(req)
    let id = req.query.id
        connection.query("DELETE FROM  comment WHERE comment_id = '"+id+"'",function (err,res,fields) {
            
            
                if(err){
                    return  response.send({statusCode:0, msg:'失败'}) 
                }else{
                    return  response.send({statusCode:200, msg:'成功'}) 
                }
                    
    });  
                        
  });

module.exports = router;