const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");

const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath, "utf8"));
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const selectedСontact = contacts.find(
    (contact) => contact.id.toString() === id
  );
  return selectedСontact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContacts = { id: uuid(), name, email, phone };
  const editContacts = [...contacts, newContacts];
  await fs.writeFile(contactsPath, JSON.stringify(editContacts));
  return newContacts;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const filterContacts = contacts.filter(
    (contact) => contact.id.toString() !== id
  );
  await fs.writeFile(contactsPath, JSON.stringify(filterContacts));
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id.toString() === id
  );
  contacts[contactIndex] = {
    ...contacts[contactIndex],
    ...body,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
