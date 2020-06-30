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
    }else{
        console.log("数据库连接成功")
    }
    
});

router.get('/', function(req, response, next) {
    //   console.log(req)
    var date = []
        connection.query("SELECT * FROM home_swiper",function (err,res,fields) {
            // 轮播图
            let banner = res
            
            connection.query("SELECT * FROM  home_grid",function (err,res,fields) {
                // 九宫格
                let channal = res
                
                connection.query("SELECT * FROM home_book",function (err,res,fields) {
                    // 热门图书
                    let hotbook = res
                    let date = {
                        banner:banner,
                        channal:channal,
                        hotbook:hotbook
                    }
                    response.send(date)
                }); 
            }); 
        });  
  });

module.exports = router;