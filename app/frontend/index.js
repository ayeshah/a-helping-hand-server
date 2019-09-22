const app = module.exports = require('express')();
// const transaction_methods = require('./transaction_methods')
const { twoDigits } = require('../util/common.js')

Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};


//define the endpoints

//Authentication
app.post('/login', require("./authentication/login")) //done
app.post('/signup', require("./authentication/signup"))
app.post('/reset_password', require('./authentication/resetPassword'))
app.post('/update_password', require('./authentication/updatePassword'))
app.get('/email/:key', require("./authentication/email"))

//Recipient
//app.post('/recipient/register', require("./recipient/register.js"))
//app.post('/recipient/verify', require("./recipient/verify"))
app.get('/recipient/profile/:id', require("./recipient/profile"))
app.get('/recipient/transactions/:id', require("./recipient/transactions"))
//app.post('/recipient/purchase', require("./recipient/purchase"))
//app.post('recipient/classify', require("./recipient/classify"))

//Donor
//app.post('/donor/register', require("./donor/register"))
//app.post('/donor/donate', require("./donor/donate"))

//test endpoint
app.post('/test', require("./test"))
