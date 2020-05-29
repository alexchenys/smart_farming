const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts'); // Layout Folder
const path = require('path');

const app = express()

const indexRouter = require('./routes/index')
const dashRouter = require('./routes/dash')
const apiRouter = require('./routes/api')
const contactRouter = require('./routes/contact')
app.use(express.static(path.resolve('./public')));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use('/', indexRouter);
app.use('/dash', dashRouter);
app.use('/api', apiRouter);
app.use('/contact', contactRouter)
app.listen(3000, function(){
    console.log('Server is on')
})

