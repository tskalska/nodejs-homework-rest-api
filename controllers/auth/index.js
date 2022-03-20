const signup = require ('./signup');
const login = require ('./login');
const {varifyMail} = require('./varifyMail');
const{varifyMailConfirmation} = require('./varifyMail');
module.exports = {
    signup,
    login,
    varifyMail,
    varifyMailConfirmation
}