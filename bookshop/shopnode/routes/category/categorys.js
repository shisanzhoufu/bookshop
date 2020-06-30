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
        
    }
    
});

router.get('/', function(req, response, next) {
    //   console.log(req)
    var date = []
    let arr = []
    
    connection.query("SELECT * FROM  category_child",function (err,res,fields) {
        // let child = res
        let child = []
        child.push(res)
        arr.push(child)
        connection.query("SELECT * FROM category_letter",function (err,res,fields) {
            let letter = []
            letter.push(res)
            arr.push(letter)
        
            connection.query("SELECT * FROM category_science",function (err,res,fields) {
                let science = []
                science.push(res)
                arr.push(science)
                
                
                    // let letter = res   
                    connection.query("SELECT * FROM category_society",function (err,res,fields) {
                        // let society = res
                        let society = []
                        society.push(res)
                        arr.push(society)
                    response.send(arr)
                        })
                    
                    })
                    
                    
                }); 
            });   
  });

module.exports = router;