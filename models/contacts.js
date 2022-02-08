const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname,'contacts.json');
const { v4: uuidv4 } = require('uuid');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId)
  return contact;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {...body, id: uuidv4()};
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return (newContact);
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);
  if (idx === -1){
      return null;
  }
  contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(contact => contact.id === contactId);
    if(idx === -1){
        return null;
    }
  contacts[idx] = {...contacts[idx], ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
