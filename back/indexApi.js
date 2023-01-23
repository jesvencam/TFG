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
    app.get("/api/datas/:year", (req, res, next) => {
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

    //Delete a data from his id_data
    app.delete("/api/datas/:id_data",(req, res, next) => {
      var id = req.params.id_data;
      console.log(id);
      var sql = `DELETE FROM datas WHERE id_data=${id}`
      var params = []
      db.run(sql, params, (err, rows) => { 
          if (err) {
            res.sendStatus(500,'INTERNAL SERVER ERROR');
            return;
          }
          if(rows==0) {
            res.sendStatus(500,'NO Database Datas')
            
          }else{
            res.sendStatus(200,"OK");
          }
         
        });
  });

   

   




    

}

