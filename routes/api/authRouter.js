const express = require("express");
const {auth : ctrl} = require('../../controllers');
const {getcurrent, logout} = require ('../../controllers')
const {signUpJoiSchema, loginJoiSchema} = require ('../../models/user');
const {validation, authenticate} = require ('../../middlewares');

const router = express.Router();

router.post("/signup", validation(signUpJoiSchema), ctrl.signup);
router.post("/login", validation(loginJoiSchema), ctrl.login);
router.get("/current", authenticate, getcurrent);
router.get("/logout", authenticate, logout);


module.exports = router;
