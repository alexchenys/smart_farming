const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const fs = require("fs");
const file = "data.db";
const sqlite3 = require("sqlite3").verbose();


router.get('/', function(req, res){
    res.render('api/index', {layout: 'layouts/default_layout.ejs'})
})
router.get('/realtime', function(req, res){
    let db = new sqlite3.Database(file, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to SQlite database.');
    });
    db.serialize(() => {
        db.each(`SELECT Humidity,Celsius,Fahrenheit,Dirt,Water,Rain FROM DASH WHERE no = 1`, (err, row) => {
          if (err) {
            console.error(err.message);
          } else {
            res.json(row)
          }
        });
    });
})


module.exports = router