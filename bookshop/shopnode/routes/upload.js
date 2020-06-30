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
router.post('/', upload.single('file'), function(req, response) {

    //读取文件路径
    fs.readFile(req.file.path,(err,data)=>{
        //如果读取失败
    if(err){return response.send('上传失败')}
    //如果读取成功
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let time=Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    //拓展名
    let extname=req.file.mimetype.split('/')[1]
    //拼接成图片名
    let keepname=time+'.'+extname
    //三个参数
    //1.图片的绝对路径
    //2.写入的内容
    //3.回调函数
    fs.writeFile(path.join(__dirname,'../static/img/'+keepname),data,(err)=>{
        if(err){
            throw err
            return res.send('写入失败')
        }else{
            // require('C:/00inbox/wamp/www/web/bookshop/shopnode/static/img/1592961791517.jpeg')
            // require('C:/00inbox/wamp/www/web/bookshop/shopnode/static/img/1592960562288.jpeg'
            let ava = 'C:/00inbox/wamp/www/web/bookshop/shopnode/static/img/'+keepname
            ava = "require(\'"+ava+"\')"
        return response.send(ava)
        }
        
        // connection.query('INSERT INTO detailbook SET  ?',{img:ava},function(err,data){
        //     connection.query('INSERT INTO booklist SET  ?',{book_img:ava},function(err,data){
        //         if(err){
        //             response.send({err:0,msg:'发布失败，请重试'})
        //         } else {
        //         console.log('插入数据成功');
        //         connection.query("SELECT * FROM detailbook WHERE img = '"+ava+"'",function(err,res,fields){
        //             if(err){
        //                 response.send("查找失败")
        //             } else {
        //                 response.send(res)
        //             }
        //             })
        //         // response.send({err:200,msg:'发布成功'})
        //         }
        //         })
                
                
        // })       
    })
 })
})
module.exports = router;