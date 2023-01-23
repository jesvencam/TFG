
const spawn  = require("child_process").spawnpm; // Para generar un subproceso 
const process1 = spawn("python3",["../../../model/own/hola.py"]);

let res1 = "";

process1.stdout.on("data",function(data){
    res1 += data.toString();
});

process1.stdout.on("end",function(){
    console.log(res1);
});

process1.stdin.write("Fifinfinfifi");

process1.stdin.end()

alert('Ejecutandose el modelo.');