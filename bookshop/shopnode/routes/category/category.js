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
    //   console.log(req)
    var date = []
        connection.query("SELECT * FROM category_grid",function (err,res,fields) {
            
            let grid = res
                    let date = {
                        grid:grid

                    }
                    response.send(date)
                        
        });  
  });

module.exports = router;