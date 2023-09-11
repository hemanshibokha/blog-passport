const express = require('express');
const port = 8080;
const app = express();
const path = require('path');
app.set("view engine", "ejs");
const passport = require('passport');
const passportlocal = require('./config/passportlocal');
const session = require('express-session');
app.use(session({
    name: 'name',
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}))
app.use(express.urlencoded());
app.use(passport.session());
app.use(passport.initialize());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/public', express.static(path.join(__dirname, 'public')))
const formtbl = require('./config/table');
const database = require('./model/mongoose');
app.use(passport.setauthentication);
app.use('/', require('./routs/indexrouts'));
app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    else{
        console.log("Done " + port);
    }
})