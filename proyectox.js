var express = require('express');
var app = express();
let path = require('path');

app.get('/', function(req, res) {
    let file = path.resolve("index.html");
  
    res.sendFile(file);
});


app.get('/register', function(req, res) {
    let file = path.resolve("login.html");
  
    res.sendFile(file);
});

app.get("*", function(req,res){
    if(req.url.includes(".")){
        
        let file = path.resolve("./"+ req.url)
        return res.sendFile(file)
    }
    
})



app.listen(3000, function() {
  console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});
