const sqlite3 = require("sqlite3").verbose();


//Conexion con la bd

let database = new sqlite3.Database("model/own/bd/dataBase",(err)=>{
    if (err) {
        console.log(err.message);

    }
    console.log("Connected to database");
})


module.exports = database;
    
