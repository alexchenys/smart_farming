const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const passport = require('passport')
const POP3Strategy = require('passport-pop3')

passport.use(new POP3Strategy({
    host: 'mail.uch.edu.tw',
    port: 110,
    enabletls: false,
    usernameField: 'sid',
    passwordField: 'password',
  }
));

router.get('/', function(req, res){
    res.render('login',{layout: 'layouts/none_layout.ejs'})
})
router.post('/', urlencodedParser, function(req, res){
    var user = req.body.sid;
    passport.authenticate('pop3', function(err, user, info){
        if (err) return res.status(500).send('Internal Server Error')
        if (!user) return res.status(400).redirect('/')
        return res.status(200).redirect('/dash')
    })(req, res)
})




module.exports = router