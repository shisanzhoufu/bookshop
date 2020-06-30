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
    let id = req.query.id
    // console.log(name)
    let title = req.query.title
    let brief = req.query.brief
    let price = req.query.price
    let stock = req.query.stock
    

console.log(name,title,brief,price,stock)
connection.query("SELECT * FROM detailbook WHERE id = '"+id+"'",function (err,res,fields) {
    let book_name = res[0].title 
    console.log(book_name)
    connection.query("UPDATE booklist SET book_price=? WHERE book_name = ?",[price,book_name ],function(err,data){

            if(err){
            throw err
            }else{
                console.log(res)
    connection.query("UPDATE detailbook SET stock = ?,title = ?,brief=?,price=? WHERE id = ?",[stock,title,brief,price,id],function(err,data){
            
                if(err){
                    throw err
                } else {
                console.log('插入数据成功');
                return response.send({err:200,msg:'修改成功'})
                }
                })
            }
});

        
        
})       
})
module.exports = router;