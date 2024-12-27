const express = require("express");
const app = express();
const path = require('path');


app.get("/", function(req, res) {
    console.log(req.log);
    //return res.send("Hello World");
    res.sendFile(path.join(__dirname, 'views', '../homePage.html'));
});

app.get("/snake", function(req, res){
    res.sendFile(path.join(__dirname, 'views', '../SNAKE.html'));

});

app.get("/willaga", function(req, res){
    res.sendFile(path.join(__dirname, 'views', '../Willaga.html'));

});

app.listen(3000, function(){
    console.log('Listening on port 3000');
});