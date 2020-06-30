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
    let name = req.query.name
    // name = name.replace(/\s/g,"")

    // console.log(name)
    connection.query("SELECT * FROM `detailbook` WHERE `title` LIKE '"+name+"'",function (err,res,fields) {
        
        if(err){
            throw err
        }else{
            // console.log(res)
            response.send(res)
            
        }
    
    }); 
  });

module.exports = router;