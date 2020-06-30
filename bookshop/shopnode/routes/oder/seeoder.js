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
    // console.log(bookname)
    // console.log(name)
        connection.query("SELECT * FROM oder WHERE book_name = '"+bookname+"' AND user_name = '"+name+"'",function (err,res,fields) {
          if(err){
            throw err
          }  
          // console.log(res)
            // let grid = res
            //         let date = {
            //             grid:grid

            //         }
                    response.send(res)
                        
        });  
  });

module.exports = router;