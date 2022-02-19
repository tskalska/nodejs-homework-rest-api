const {Contact} = require("../../models/contact");
const ObjectId = require('mongoose').Types.ObjectId;


const deleteById = async (req, res) => {
    const{contactId}=req.params;

    if (ObjectId.isValid(contactId)!==true){
        res.status(404).json({
        status:'error',
        code: 404,
        message: `invalid ID`,
        }) 
        return;
    } 

    const newContacts = await Contact.findByIdAndDelete(contactId);
    if (!newContacts)
        {res.status(404).json({
        status:'error',
        code: 404,
        message: `Contact with id ${contactId} not found`,
        }) 
    } else {
        res.json({
        status: 'success',
        code: 200,
        message:'contact deleted'
        })
    }
}

module.exports = deleteById;
