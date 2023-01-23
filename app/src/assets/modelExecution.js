
const spawn  = require("child_process").spawn; // Para generar un subproceso 
const process1 = spawn("python3",["../../../model/own/itMod.py"]);

let res = "";

process1.stdout.on("data",function(data){
    res += data.toString();
});

process1.stdout.on("end",function(){
    console.log(res);
});

process1.stdin.write("Fifinfinfifi");

process1.stdin.end()