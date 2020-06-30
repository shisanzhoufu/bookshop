const express = require('express')
const multer  = require('multer')
const fs=require('fs');
var path = require('path');
let router = express.Router();

var upload=multer({dest:'uploads/'})
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
    let name = req.query.userName
    // console.log(name)
    let title = req.query.title
    let brief = req.query.brief
    let price = req.query.price
    let stock = req.query.stock
    let img = req.query.img

console.log(name,title,brief,price,stock,img)
connection.query('INSERT INTO detailbook SET  ?',{title:title,brief:brief,price:price,img:img,stock:stock,merchant:name},function(err,data){
    connection.query('INSERT INTO booklist SET  ?',{book_name:title,book_price:price,merchant:name,book_img:img},function(err,data){
        if(err){
            throw err
        } else {
        console.log('插入数据成功');
        return response.send({err:200,msg:'发布成功'})
        }
        })
        
})       
})
module.exports = router;