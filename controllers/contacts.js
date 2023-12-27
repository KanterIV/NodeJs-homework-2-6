const { HttpError, ctrlWrapper } = require("./../helpers");

const { Contact } = require("../models/contact");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const favoriteQuery = favorite ? { favorite } : {};
  const query = { ...owner, ...favoriteQuery };
  const skip = (page - 1) * limit;
  const allContacts = await Contact.find(query, "", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.json(allContacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contact = await Contact.findOne({ _id: contactId, owner });
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contact = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const updatedContactById = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    { new: true }
  );
  if (!updatedContactById) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updatedContactById);
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const updatedContactById = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    { new: true }
  );
  if (!updatedContactById) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updatedContactById);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
