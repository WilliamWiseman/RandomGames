const express = require("express");
const app = express();
const path = require('path');
const Pool = require("pg").Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'nama_db_kamu',
    password: 'example',
    port: 5432
});


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

app.get("/toDo", function(req, res){
    res.sendFile(path.join(__dirname, 'views', '../ToDoListFront.html'));

});

app.get("/toDo/API", function(req, res){

});

app.put("/toDo/API", function(req, res){

});

app.post("/toDo/API", function(req, res){
    //INSERT INTO `todo` (`taskName`,`isDone`) VALUES ( 'Give tables rights', false);

});

app.listen(3000, function(){
    console.log('Listening on port 3000');
});