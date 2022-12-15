const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const BASE_API_URL = "api/v1";

module.exports.register = (app,db) =>{


    //Obtener la tabla de pajaros de la bd 
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

            /*
            res.json({
                "message":"success",
                "data":rows
            })*/
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

