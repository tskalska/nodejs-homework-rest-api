const express = require('express');
const todoContacts = require('../../models/contacts');
const Joi = require('joi');


const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  phone: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/).required(),
});


const router = express.Router()

router.get('/', async (req, res) => {
  const contacts = await todoContacts.listContacts();
  res.json({
    status: 'success',
    code: 200,
    data:  {
      response: contacts
    }
  })
})

router.get('/:contactId', async (req, res) => {
  const{params}=req;
  const contact = await todoContacts.getContactById(params.contactId);
  if(!contact){ 
    res.status(404).json({
    status:'error',
    code: 404,
    message: `Contact with id ${params.contactId} not found`,
    }) 
  } else {
    res.json({
    status: 'success',
    code: 200,
    data:  {
    response: contact
    }
  });}
   
})

router.post('/', async (req, res) => {

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
      
  const newContact = await todoContacts.addContact({name,email,phone});

  res.json({
    status: 'success',
    code: 201,
    data:  {response: newContact},
  });
});

router.delete('/:contactId', async (req, res) => {
  const{params}=req;
  const newContacts = await todoContacts.removeContact(params.contactId);
  if (!newContacts)
   {res.status(404).json({
    status:'error',
    code: 404,
    message: `Contact with id ${params.contactId} not found`,
   }) 
  } else {
    res.json({
    status: 'success',
    code: 200,
    message:'contact deleted'
    })
  }
})

router.put('/:contactId', async (req, res) => {
  const {body} = req;
  const { error } = schema.validate(body, {abortEarly: false, allowUnknown:true});

  if (error) {
    res.status(422).json({
      status: 'error',
      message: 'Validation error',
      error
    });
    return;
  }

  const {contactId} = req.params;
  const updateContact = await todoContacts.updateContact(contactId, body);
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
   data: {responce: updateContact}
   })
 }})

module.exports = router
