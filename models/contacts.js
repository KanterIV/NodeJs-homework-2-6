const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contactsArr = JSON.parse(await fs.readFile(contactsPath));
  return contactsArr;
};

const getContactById = async (contactId) => {
  const contactsArr = await listContacts();
  const contactIdSrt = String(contactId);

  const foundСontact = contactsArr.find(
    (contact) => contact.id === contactIdSrt
  );
  return foundСontact || null;
};

const removeContact = async (contactId) => {
  const contactsArr = await listContacts();
  const contactIdSrt = String(contactId);
  const contactIdx = contactsArr.findIndex(
    (contact) => contact.id === contactIdSrt
  );
  if (contactIdx === -1) return null;

  const deleteContact = contactsArr.splice(contactIdx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArr));
  return deleteContact;
};

const addContact = async (body) => {
  const contactsArr = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };

  contactsArr.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArr));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsArr = await listContacts();
  const contactIdSrt = String(contactId);
  const contactIdx = contactsArr.findIndex(
    (contact) => contact.id === contactIdSrt
  );
  if (contactIdx === -1) return null;
  contactsArr[contactIdx] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactsArr));
  return contactsArr[contactIdx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
