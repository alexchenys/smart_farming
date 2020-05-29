const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/', function(req, res){
    res.render('data/index', {layout: 'layouts/default_layout.ejs'})
})



module.exports = router