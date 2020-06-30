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
    let name = req.query.username
    // console.log(name,book,price,img)
// console.log(name)
        connection.query("SELECT * FROM  user_info WHERE user = '"+name+"'",function(err,res,fields){
            if(err){
                    throw err
            } else {
                let uid = res[0].user_id
                connection.query("SELECT * FROM address WHERE user_id = '"+uid+"'",function(err,res,fields){
                    if(err){
                        response.send({statusCode:0, msg:'失败'})
                        return 
                    } else {
                        response.send(res)    
                    } 
        
        }) 
            } 

})
});

module.exports = router;