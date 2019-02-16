const express = require('express');
const app = express();
const path = require("path");
const fs = require('fs');
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

app.post('/tree', function (req, res) {
    fs.readFile('./db/tree.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let sports = JSON.parse(data);  
            res.send(sports);            
        }
    });
});

app.post('/layouts', function (req, res) {
    fs.readFile('./db/layouts.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let layouts = JSON.parse(data);  
            res.send(layouts);          
        }
    });
});

app.post('/matches', function (req, res) {
    fs.readFile('./db/matches.json', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
        } else {
            let matches = JSON.parse(data);  
            let targetMatchId = req.body.value;
            let targetMatchs = matches.filter(match => {
                return match.id == targetMatchId;
            });
            res.send(targetMatchs);         
        }
    });
});


app.listen(port, () => {
    console.log(`Server started - http://localhost:${port}/`);
});