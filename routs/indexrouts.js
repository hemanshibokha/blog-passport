const express = require('express')
const multer = require('multer')
const fs = require('fs');

const image = require('../config/table')

const file = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const routs = express.Router();
const imagedata = multer({ storage: file }).single('image');
const controller = require('../controller/indexcontroller');
const passport = require('passport');

routs.get('/', controller.login)
routs.get('/register', controller.register)
routs.post('/logindata', passport.authenticate('local', { failureRedirect: '/' }), controller.logindata)
routs.post('/registerdata', controller.registerdata)
routs.get('/index', passport.checkauthentication, controller.index)
routs.get('/table', passport.checkauthentication, controller.table)
routs.get('/form', passport.checkauthentication, controller.form)
routs.post('/formdata', imagedata, controller.formdata)
routs.get('/deletedata', controller.deletedata)
routs.get('/editdata', controller.editdata) 
routs.post('/updatedata',imagedata, controller.updatedata)
routs.get('/signout', controller.signout)

module.exports = routs;