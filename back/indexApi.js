const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const BASE_API_URL = "api/v1";
const { Configuration, OpenAIApi } = require("openai");


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

    function recordRealTime(){
      const {spawn}  = require("child_process"); // Para generar un subproceso 
      const process1 = spawn("python3",["/Users/jesusvenacampos/Universidad/CUARTO/TFG/Repositorio/TFG/model/own/itMod.py"]);
      
      let res1 = "";
      
      process1.stdout.on("data",function(data){
          res1 += data.toString();
      });
      
      process1.stdout.on("end",function(){
          console.log("PROCESO TERMINADO");
          
      });      
      process1.stdin.end()

    
    }

    app.get("/api/pruebaDeBoton", (req, res, next) => {
      recordRealTime();
      var sql = "SELECT * FROM birds"
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


  app.get("/api/birdInfo/:bird", async (req, res, next) => {
    var bird = req.params.bird;
    let resultado = conexionApiOpenAI(bird,res);
    
    
  });
   

   function conexionApiOpenAI(bird,res){
      const config = new Configuration({
        apiKey: "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",
      });
      
      const openai = new OpenAIApi(config);
      
      const runPrompt = async () => {
        const prompt = `Give me some information about the ${bird} and an url picture in this json format:{
          Information:
          URL:
        }`;
      
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 2048,
          temperature: 1,
        });
      
          console.log(response.data.choices[0].text);
          res.send(response.data.choices[0].text)
          return response.data.choices[0].text;

      };
      
      runPrompt();
      

    
   }




    

}

