const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const BASE_API_URL = "api/v1";

module.exports.register = (app,db) =>{

    //Obtener la tabla de aves de la bd

    app.get("/api/birds", (req, res, next) => {
        var sql = "SELECT * FROM birds"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
              res.sendStatus(400,);
              return;
            }else{
              res.send(JSON.stringify(rows,null,2));
            }
          });
    });

    //Obtener tabla datos de analisis
    app.get("/api/datas", (req, res, next) => {
        var sql = "SELECT * FROM datas"
        var params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
              res.sendStatus(500,'INTERNAL SERVER ERROR');
              return;
            }
            if(rows==0) {
              res.sendStatus(500,'NO Database Datas')
              
            }else{
              res.send(JSON.stringify(rows,null,2));
            }
           
          });
    });

    app.get("/api/datas/prueba/:year",(req,res)=>{
      var sql = "SELECT * FROM datas"
      var params = []
      var year = req.query.year;
      var from = req.query.from;
      var to = req.query.to;
      for(var i = 0; i<Object.keys(req.query).length;i++){
        var element = Object.keys(req.query)[i];
        if(element != "year" && element != "from" && element != "to" && element != "limit" && element != "offset"){
            res.sendStatus(400, "BAD REQUEST");
            return;
        }
    }
    if(from>to){
        res.sendStatus(400, "BAD REQUEST");
        return;
    }else{
      db.all(sql, params, (err, rows) => {
        if (err) {
          res.sendStatus(500,'INTERNAL SERVER ERROR');
          return;
        }
        if(rows==0) {
          res.sendStatus(500,'NO Database Datas')
          
        }else{
          console.log(JSON.stringify(rows));
          console.log(year)
          
        }
       
      });

    }
        


    });




 //Función paginación 
    function paginacion(req, lista){

        var res = [];
        const limit = req.query.limit;
        const offset = req.query.offset;
        
        if(limit < 1 || offset < 0 || offset > lista.length){
            res.push("BAD PARAMS");
            return res;
        }

        res = lista.slice(offset,parseInt(limit)+parseInt(offset));
        return res;

    }
    

}

