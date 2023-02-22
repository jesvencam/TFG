const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db.js");
const cors = require("cors");

const app = express();

app.use(cors());
//Puerto del servidor
var port = process.env.PORT || 8080;


app.get("/", (req, res) => {
    res.sendStatus(200,"OK");
});

app.listen(port, () =>{
    console.log(`Server ready at port ${port}`);
})


const api = require("./back/indexApi.js");

api.register(app,db);



//En el caso de otra petición. 
app.use(function(req, res){
    res.status(404);
});


