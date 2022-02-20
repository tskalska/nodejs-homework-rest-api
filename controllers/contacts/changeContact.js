const ObjectId = require('mongoose').Types.ObjectId;
const {Contact, schema} = require("../../models/contact");

const changeContact = async (req, res) => {
    const {body} = req;
    const { error } = schema.validate(body, {abortEarly: false, allowUnknown:true});
    const {contactId} = req.params;
    const {_id} = req.user;

  
    if (ObjectId.isValid(contactId)!==true){
      res.status(404).json({
        status:'error',
        code: 404,
        message: `invalid ID`,
      }) 
      return;
    } 
  
    if (error) {
      res.status(422).json({
        status: 'error',
        message: 'Validation error',
        error
      });
      return;
    }
  
    const updateContact = await Contact.findOneAndUpdate({
      _id: contactId,
      owner: _id 
    }, body);

    if (!updateContact)
    {res.status(404).json({
      status:'error',
      code: 404,
      message: 'Not found',
    }) 
    } else {
    res.json({
      status: 'success',
      code: 200,
      message: 'Contact changed', 
    })}
  }

  module.exports = changeContact;
