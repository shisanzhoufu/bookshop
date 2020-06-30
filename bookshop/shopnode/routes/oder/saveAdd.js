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
    let uname = req.query.username
    let name = req.query.name
    let phone = req.query.phone
    let province = req.query.province
    let city = req.query.city
    let region = req.query.region
    let detail_addr = req.query.detail_addr
    let address = province+city+region+detail_addr
    // console.log(name,book,price,img)
// console.log(address)
        connection.query("SELECT * FROM  user_info WHERE user = '"+uname+"'",function(err,res,fields){
            if(err){
                throw err
            } else {
                
                let uid = res[0].user_id
                // console.log(res)
                // console.log( uid) 
                connection.query('INSERT INTO address SET  ?',{user_id: uid,name:name,address:address,tel:phone},function(err,data){
                    if(err){
                        response.send({statusCode:0, msg:'失败，请重试'})
                        return 
                    } else {
                        response.send({statusCode:200, msg:'添加地址成功'})
                        return 
                    } 
        })
            } 

})
});

module.exports = router;