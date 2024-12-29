const express = require("express");
const app = express();
app.use(express.json());

const path = require('path');
const Pool = require("pg").Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'dbname',
    password: 'example',
    port: 5432
});

        /**
         * 
         * NOW YOU FIGURE OUT DELETES
         * 
         */


app.get("/", function (req, res) {
    console.log(req.log);
    //return res.send("Hello World");
    res.sendFile(path.join(__dirname, 'pages', './homePage.html'));
});

app.get("/snake", function (req, res) {
    res.sendFile(path.join(__dirname, 'pages', './SNAKE.html'));
});

app.get("/willaga", function (req, res) {
    res.sendFile(path.join(__dirname, 'pages', './Willaga.html'));
});

app.get("/CarrotClickerV2", function (req, res) {
    res.sendFile(path.join(__dirname, 'pages', './CarrotClickerV2.html'));
});

app.get("/GameEngine", function (req, res) {
    res.sendFile(path.join(__dirname, 'pages', './GameEngine.html'));
});

app.get("/Weather", function (req, res) {
    res.sendFile(path.join(__dirname, 'pages', './Weather.html'));
});

app.get("/animation", function (req, res) {
    res.sendFile(path.join(__dirname, 'pages', './animation.html'));
});

app.get("/container_object", function (req, res) {
    res.sendFile(path.join(__dirname, 'pages', './container_object.html'));
});

app.get("/rooms", function (req, res) {
    res.sendFile(path.join(__dirname, 'pages', './rooms.html'));
});

/**
 * Advanced section for th4e TODO app
 */

//Todo UI
app.get("/toDo", function (req, res) {
    res.sendFile(path.join(__dirname, 'pages', './ToDoListFront.html'));

});

// Get TODO items
app.get("/toDo/API", function (req, res) {
    console.log('in GET route');
    const query = 'SELECT * FROM "todo" ORDER BY "id";';
    pool.query(query).then((results) => {
        console.log(req.query);
        console.log(results);
        res.send(results.rows); 
    }).catch((error) => {
        console.log('Error making GET query', error);
        res.sendStatus(500);
    });
});

// Update TODO items
app.put("/toDo/API/:id", function (req, res) {
    console.log('in POST route');
    const query = `UPDATE "todo" set "isdone" = $1 WHERE id = $2`;

    let isDone = 0;
    if (req.body.isDone) {
        isDone = 1; 
    }
    
    pool.query(query, [isDone, req.params.id])
        .then(() => {
            res.send({}); 
        }).catch((error) => {
            console.log('Error making insert query', error);
            res.sendStatus(500);
        });
});

// Create TODO items
app.post("/toDo/API", function (req, res) {
    //INSERT INTO `todo` (`taskName`,`isDone`) VALUES ( 'Give tables rights', false);
    console.log('in POST route');
    console.log(req.body);
    const query = `INSERT INTO "todo" ("taskname", "isdone")
	VALUES($1, $2);`;

    let isDone = 0;
    if (req.body.isDone) {
        isDone = 1; 
    }

    pool.query(query, [req.body.taskName, isDone])
        .then(() => {
            res.send({}); 
        }).catch((error) => {
            console.log('Error making insert query', error);
            res.sendStatus(500);
        });
});

// Delete todo items
app.delete("/toDo/API", function (req, res) {
    //INSERT INTO `todo` (`taskName`,`isDone`) VALUES ( 'Give tables rights', false);
    console.log('in POST route');
    const query = `DELETE FROM "todo" WHERE id = $1`;

    pool.query(query, [req.body.id])
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error making insert query', error);
            res.sendStatus(500);
        });
});



/**
 * Start the server
 */
app.listen(3000, function () {
    console.log('Listening on port 3000');
});