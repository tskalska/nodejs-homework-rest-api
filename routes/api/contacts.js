const express = require('express');
const {Contact, schema, joiUpdateFavoriteSchema} = require("../../models/contact");

const router = express.Router()

router.get('/', async (req, res) => {
  const contacts = await Contact.find({});
  res.json({
    status: 'success',
    code: 200,
    data:  {
      response: contacts
    }
  })
})

router.get('/:contactId', async (req, res) => {
  const{contactId}=req.params;
  const contact = await Contact.findById(contactId);;
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
  const newContact = await Contact.create({name,email,phone});
  res.json({
    status: 'success',
    code: 201,
    data:  {response: newContact},
  });
});

router.delete('/:contactId', async (req, res) => {
  const{contactId}=req.params;
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
})

router.put('/:contactId', async (req, res) => {
  const {body} = req;
  const { error } = schema.validate(body, {abortEarly: false, allowUnknown:true});
  const {contactId} = req.params;

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
})

 
router.patch("/:contactId/favorite", async(req, res)=> {
  const {contactId} = req.params;

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
})

module.exports = router;
