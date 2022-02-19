const {Contact} = require("../../models/contact");

const getAll = async (req, res) => {
  const {_id} = req.user;
  const contacts = await Contact.find({owner:_id}).populate("owner","_id name email");
  res.json({
    status: 'success',
    code: 200,
    data:  {
      response: contacts
    }
  })
}


module.exports = getAll;