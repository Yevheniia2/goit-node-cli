const fs = require('node:fs/promises');
const path = require('node:path');
const shortid = require('shortid');

const CONTACT_PATH = path.join(__dirname, 'db', 'contacts.json');

const readAllContacts = async () => {
  const data = await fs.readFile(CONTACT_PATH, { encoding: 'utf-8' });

  return JSON.parse(data);
};

const getContactById = async (id) => {
  const data = await readAllContacts();

  const contact = data.find((el) => el.id === id);
  return contact || null;
};

const addContact = async (contact) => {
  const contactsList = await readAllContacts();

  const newContact = {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    id: shortid(),
  };
  contactsList.push(newContact);

  await fs.writeFile(CONTACT_PATH, JSON.stringify(contactsList, null, 2));
  return newContact;
};

const removeContact = async (id) => {
  const contactsList = await readAllContacts();

  const index = contactsList.findIndex((el) => el.id === id);
  if (index === -1) return null;

  const [removedContact] = contactsList.splice(index, 1);

  await fs.writeFile(CONTACT_PATH, JSON.stringify(contactsList, null, 2));
  return removedContact || null;
};

module.exports = {
  readAllContacts,
  getContactById,
  addContact,
  removeContact,
};