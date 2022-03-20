
const {User, loginJoiSchema} = require("../../models/user");
const {Unauthorized} = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {SECRET_KEY} = process.env

const login = async (req, res, next)=> {

        try {
            const { error } = loginJoiSchema.validate(req.body, {abortEarly: false, allowUnknown:true});
            if(error){
                throw new Error(400, error.message)
            }
            
            const {email, password} = req.body;
            const user = await User.findOne({email});

            if (!user) {
                throw new Unauthorized ("User not found");
            }
            if (!user.varify) {
                throw new Unauthorized ("User not varify");
            }
            const compareResult = await bcrypt.compare(password, user.password);

            if(!compareResult){
                throw new Unauthorized ("Email or password is wrong");
            }

            const payload = {
                id: user._id
            }
            const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "6h"});
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
module.exports = login;