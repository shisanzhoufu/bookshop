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
    let username = req.query.username
        connection.query("SELECT * FROM detailbook WHERE merchant = '"+username+"'",function (err,res,fields) {
            
                    response.send(res)
                        
        });  
  });

module.exports = router;