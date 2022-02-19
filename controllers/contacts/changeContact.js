const ObjectId = require('mongoose').Types.ObjectId;
const {Contact, schema} = require("../../models/contact");

const changeContact = async (req, res) => {
    const {body} = req;
    const { error } = schema.validate(body, {abortEarly: false, allowUnknown:true});
    const {contactId} = req.params;
  
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
  
      const updateContact = await Contact.findByIdAndUpdate(contactId, body);
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
        data: {response: updateContact}
      })}
  }

  module.exports = changeContact;
