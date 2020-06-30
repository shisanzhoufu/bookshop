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
      // console.log(req)
    // var date = []
    let bookname = req.query.bookname
    let name = req.query.username
    let aid = req.query.aid
    // console.log(bookname)
    // console.log(name)
        connection.query("SELECT * FROM oder WHERE book_name = '"+bookname+"' AND user_name = '"+name+"'",function (err,res,fields) {
          if(err){
            throw err
          }  
        //   console.log(res)
            let oid = res[0].oder_id
            let user_name = res[0].user_name
            let book_name = res[0].book_name
            let price = res[0].price
            let img = res[0].img
            connection.query("SELECT * FROM address WHERE id = '"+aid+"'",function (err,res,fields) {
                if(err){
                  throw err
                }  
                // console.log(res)
                let user_id = res[0].user_id
                let receipt_name = res[0].name
                let address = res[0].address
                let tel = res[0].tel
                connection.query("SELECT * FROM detailbook WHERE title = '"+book_name+"'",function (err,res,fields) {
                  let stock = res[0].stock
                  let merchant = res[0].merchant
                    if(err){
                        response.send({statusCode:0, msg:'失败'})
                        return 
                    } else {
                connection.query('INSERT INTO pay SET  ?',{user_id:user_id,user_name:user_name,receipt_name:receipt_name,book_name:book_name,price:price,address:address,tel:tel,img:img,shop:merchant},function(err,data){
                      
                        console.log(stock)
                        stock = stock-1
                        connection.query("UPDATE detailbook SET stock = ? WHERE title = ?",[stock,book_name ],function (err,res,fields) {
                          
                          if(err){
                          throw err
                          }else{
                            console.log('更新成功')
                          }
                        })
                      })
                        connection.query("DELETE FROM oder WHERE oder_id = '"+oid+"'",function (err,res,fields) {
                            if(err){
                                throw err 
                            } else {
                                // console.log('删除成功')
                                // return  response.send({statusCode:200, msg:'成功'})    
                            } 
                
                })
                        // console.log('ok')
                        response.send({statusCode:200, msg:'购买成功'})    
                    } 
        
        })
                              
              });  
                        
        });  
  });

module.exports = router;