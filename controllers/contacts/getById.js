const ObjectId = require('mongoose').Types.ObjectId;
const {Contact} = require("../../models/contact");


const getById = async (req, res) => {
    
    const{contactId} = req.params;
  
    if (ObjectId.isValid(contactId)!==true){
      res.status(404).json({
        status:'error',
        code: 404,
        message: `invalid ID`,
      }) 
      return;
    } 
  
    const contact = await Contact.findById(contactId);
      if(!contact){ 
        res.status(404).json({
        status:'error',
        code: 404,
        message: `Contact with id ${contactId} not found`,
        }) 
      } else {
        res.json({
        status: 'success',
        code: 200,
        data:  { response: contact }
        });
      }
  }

module.exports = getById;
