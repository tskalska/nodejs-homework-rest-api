const {Contact, schema} = require("../../models/contact");


const add = async (req, res) => {
    const {_id} = req.user;
    const {name,email,phone} = req.body;

    const { error } = schema.validate({name, email, phone}, {abortEarly: false, allowUnknown:true});

    if (error) {
        res.status(422).json({
        status: 'error',
        message: 'Validation error',
        error,
        });
        return;
    }

    const newContact = await Contact.create({name,email,phone,owner:_id});
    res.json({
        status: 'success',
        code: 201,
        data:  {response: newContact},
    });
};


module.exports = add;