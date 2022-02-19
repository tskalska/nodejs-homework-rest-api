
const {User} = require("../../models/user");
const {Unauthorized} = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {schema} = require("../../models/contact");



const {SECRET_KEY} = process.env

const signup = async (req, res, next)=> {

        try {
            const { error } = schema.validate(req.body, {abortEarly: false, allowUnknown:true});
            if(error){
                throw new Error(400, error.message)
            }
            
            const {email, password} = req.body;
            const user = await User.findOne({email});
            const compareResult = await bcrypt.compare(password, user.password);

            if(!user || !compareResult){
                throw new Unauthorized ("Email or password is wrong");
            }

            const payload = {
                id: user._id
            }
            const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
            await User.findByIdAndUpdate(user._id, {token});
            res.json({
                status:"success",
                code:200,
                token,
                data: {
                        token
                }
            })
        } catch (error) {
            next(error);
        }

}
module.exports = signup;