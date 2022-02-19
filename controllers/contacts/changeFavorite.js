const ObjectId = require('mongoose').Types.ObjectId;
const {Contact, joiUpdateFavoriteSchema} = require("../../models/contact");
const changeFavorite = async(req, res)=> {
    const {contactId} = req.params;
  
    if (ObjectId.isValid(contactId)!==true){
      res.status(404).json({
        status:'error',
        code: 404,
        message: `invalid ID`,
      }) 
      return;
    } 
  
    const { error } = joiUpdateFavoriteSchema.validate(req.body);
  
    if (error) {
      res.status(422).json({
        status: 'error',
        message: 'Validation error',
        error
      });
      return;
    }
        
    const newContact = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
    if(!newContact) {res.status(404).json({
      status:'error',
      code: 404,
      message: 'Not found',
    })
    } else {
    res.json({
      status: 'success',
      code: 200,
      data: {response: newContact}
    })}
  }

module.exports = changeFavorite;