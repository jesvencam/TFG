const bodyParser = require("body-parser");
const { json } = require("express");
const sqlite3 = require("sqlite3").verbose();
const BASE_API_URL = "api/v1";
const { Configuration, OpenAIApi } = require("openai");
const { type } = require("os");


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


  //Obtener tabla datos de analisis
  app.get("/api/tempDatas", (req, res, next) => {
    var sql = "SELECT * FROM temp"

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
      console.log("Ejecutando el proceso");

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
      console.log("En la api ejecutando botón... ")

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
      var sql = `DELETE FROM datas WHERE id_data=${id}`
      var params = []
      db.run(sql, params, (err, rows) => { 
          if (err) {
            res.sendStatus(500,'INTERNAL SERVER ERROR');
            return;
          }
          if(rows==0) {
            res.sendStatus(500,'DATA DOESN´T EXIST')
            
          }else{
            res.sendStatus(200,"OK");
          }
         
        });
  });


  app.get("/api/birdInfo/:bird", async (req, res, next) => {
    console.log("En la api");
    var bird = req.params.bird;
    let resultado = conexionApiOpenAI(bird,res);
    
    
  });
   

   function conexionApiOpenAI(bird,res){
      const config = new Configuration({
        apiKey: "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",
      });
      
      const openai = new OpenAIApi(config);
      
      const runPrompt = async () => {
        const prompt = `Dame informacion general sobre el pajaro ${bird},una url de google fotos buscando este pájaro y busca el nombre en xeno-canto y devuelve la página , en formato json del siguiente estilo:
         {
          "Information":
          "URL":
          "AudioFile"
        }`;
      
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: 2048,
          temperature: 1,
        });
      
          console.log(JSON.parse(response.data.choices[0].text));


          res.send(JSON.parse(response.data.choices[0].text));
          return response.data.choices[0].JSON;

      };
      
      runPrompt();


      // para pruebas

      
      // res.send(JSON.parse(`{
      //   "Information": "The Rock Pigeon (Columba livia), also known as the common pigeon, is a member of the bird family Columbidae. It is believed to be the ancestor of all domestic pigeons. Rock Pigeons are large, stout birds with a small head and a short neck. They have short, strong legs and small feet. They have a compact body and a short tail. Rock Pigeons have colored feathers on their neck, head and back, and patterns on their wings. They have a wingspan of 40–60 cm (16–24 in).",
      //   "URL": "https://upload.wikimedia.org/wikipedia/commons/3/37/Columba_livia_-_Reserva_Nacional_Lachay_-_Peru.jpg",
      //   "AudioFile": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Rock_pigeon_MP4_Audio.ogg"
      // }`));
      

    
   }




    

}

