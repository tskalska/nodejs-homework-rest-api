const { User,verificationEmailSchema } = require("../../models/user");
const { NotFound } = require("http-errors");
const sendMail = require("../../helppers/sendMail");


const varifyMail = async (req, res, next) => {
    try {
        const {verificationToken} = req.params;
        const user = await User.findOne({verificationToken});
        if(!user){
            throw new NotFound ("User not found");
        }
        await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: ""});
        res.json({
            message: 'Verification successful'
        })
    } catch (error) {
        next(error);
    }
};

const varifyMailConfirmation = async (req, res, next) => {
    try{
        const{error} = verificationEmailSchema.validate(req.body);
        if (error) {
            throw NotFound ("Missing required field email");
        }
        const user = await User.findOne(req.email);
        if (user.verify){
            throw NotFound ("Verification has already been passed");
        }
        const mail = {
            to: req.email,
            subject: "first email",
            html: `<a target="blanc" href="http://localhost:3000/app/users/verify/:${user.verificationToken}"> Подтвердить email </a>`
        }
        await sendMail(mail);
        res.json({
            message: 'VVerification email sent'
        })
    } catch(error) {
        next(error);
    }

}


module.exports = {
    varifyMail,
    varifyMailConfirmation
};