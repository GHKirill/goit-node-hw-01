const fs = require("fs/promises");
const { v4 } = require("uuid");
const contactsPath = require("./db/filePath");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return await JSON.parse(contacts);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = await allContacts.find((contact) => contactId === contact.id);
  return contact || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (!index) {
    return null;
  }
  const contacts = allContacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return allContacts[index];
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
