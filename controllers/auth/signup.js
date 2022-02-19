const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const {signUpJoiSchema} = require("../../models")


const signup = async (req, res, next)=> {
    try {
        const {error} = signUpJoiSchema.validate(req.body);
        if(error){
            throw new Error (400, error.message);
        }
        const {name, email, password} = req.body;
        const user = await User.findOne({email});
        
        if(user){
            throw new Conflict(`User with email ${email} alredy exists`);
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        await User.create({name, email, password: hashPassword});
        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                user: {
                    name,
                    email,
                }
            }
        })
            
        } catch (error) {
            next(error)
    }
}

module.exports = signup;