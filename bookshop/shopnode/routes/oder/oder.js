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
    let name = req.query.user
    let img = req.query.img
    let book = req.query.book
    let price = req.query.price
    // let reg= /(\S*)\(/g;
    price = price.split('(')[0]
    console.log(price)

        connection.query('INSERT INTO oder SET  ?',{user_name:name,book_name:book,price:price,img:img},function(err,data){
            if(err){
                response.send({statusCode:0, msg:'失败'})
                return 
            } else {
                return  response.send({statusCode:200, msg:'成功'})    
            } 

})
});

module.exports = router;