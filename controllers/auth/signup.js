const { User, signUpJoiSchema } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require('gravatar');
const { v4 } = require("uuid");
const sendMail = require("../../helppers/sendMail");


const signup = async (req, res, next) => {
    try {
        const { error } = signUpJoiSchema.validate(req.body);
        if (error) {
            throw new Error(400, error.message);
        }
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            throw new Conflict(`User with email ${email} alredy exists`);
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const avatarURL = gravatar.url(email, { s: '200' });
        const verificationToken = v4();
    
        await User.create({ name, email, verificationToken, password: hashPassword, avatar: avatarURL });
        const mail = {
            to: email,
            subject: "first email",
            html: `<a target="blanc" href="http://localhost:3000/app/users/verify/:${verificationToken}"> Подтвердить email </a>`
        }
        await sendMail(mail);
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
        console.log('тут',error);
        next(error)
    }
}

module.exports = signup;
