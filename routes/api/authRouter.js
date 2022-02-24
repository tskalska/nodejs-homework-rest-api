const express = require("express");
const path = require("path");
const {auth : ctrl} = require('../../controllers');
const {getcurrent, logout} = require ('../../controllers')
const {signUpJoiSchema, loginJoiSchema} = require ('../../models/user');
const {validation, authenticate} = require ('../../middlewares');
const multer = require('multer');
const changeAvatar = require("../../controllers/changeAvatar");



const router = express.Router();

const tempDir = path.join(__dirname, '..', '..', 'temp');
const upload = multer({dest: tempDir});


router.post("/signup", validation(signUpJoiSchema), ctrl.signup);
router.post("/login", validation(loginJoiSchema), ctrl.login);
router.get("/current", authenticate, getcurrent);
router.get("/logout", authenticate, logout);
router.patch("/avatars", authenticate, upload.single("image"), changeAvatar);


module.exports = router;
