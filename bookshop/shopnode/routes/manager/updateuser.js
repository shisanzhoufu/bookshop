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
    
    // console.log(name)
    let user = req.query.user
    let email = req.query.email
    let role = req.query.role
    let id = req.query.id
    console.log(user,id)
    

// console.log(name,title,brief,price,stock)
connection.query("SELECT * FROM user_info WHERE user_id = '"+id+"'",function (err,res,fields) {
    // let book_name = res[0].title 
    // console.log(book_name)
    connection.query("UPDATE user_info SET user = ?, email=?,role=? WHERE user_id=?",[user, email,role,id ],function(err,data){

            
                if(err){
                    throw err
                } else {
                console.log('插入数据成功');
                return response.send({err:200,msg:'修改成功'})
                }
        
            })
})       
})
module.exports = router;