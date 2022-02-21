const ObjectId = require('mongoose').Types.ObjectId;
const {Contact, joiUpdateFavoriteSchema} = require("../../models/contact");
const changeFavorite = async(req, res)=> {
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
  
    const { error } = joiUpdateFavoriteSchema.validate(req.body);
  
    if (error) {
      res.status(422).json({
        status: 'error',
        message: 'Validation error',
        error
      });
      return;
    }
        
    const changeContactStatus = await Contact.findOneAndUpdate({
      _id: contactId,
      owner: _id
    }, req.body);
    if(!changeContactStatus) {res.status(404).json({
      status:'error',
      code: 404,
      message: 'Not found',
    })
    } else {
    res.json({
      status: 'success',
      code: 200,
      message: 'Favorite status changed'
    })}
  }

module.exports = changeFavorite;