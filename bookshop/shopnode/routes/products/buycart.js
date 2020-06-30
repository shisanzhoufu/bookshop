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
    // console.log(name,book,price,img)
    connection.query("SELECT user,title,num FROM cart WHERE user = '"+name+"' AND title = '"+book+"'",function (err,res,fields) {
    let data = res[0]

    // console.log(res[0])
    if(err) {
        throw err
         return;
        }
    if(data==undefined){

        let number = 1
        connection.query('INSERT INTO cart SET  ?',{user:name,title:book,price:price,img:img,num:number},function(err,data){
            if(err){
                response.send({statusCode:0, msg:'加购失败'})
                return 
            } else {
                return  response.send({statusCode:200, msg:'加购成功'})    
            } 
})}else{
        let n = res[0].user
        let b = res[0].title
        if(book==b && name==n){
            let num = res[0].num
            num++
            connection.query('update cart SET  ?',{num:num},function (err,res,fields) {
            
            if(err){
                throw err
            }else{
                // console.log('插入成功')
                response.send({statusCode:200, msg:'加购成功'})
                return 
            }
        
        });
            // console.log(num)
        }
    }

  });


});

module.exports = router;