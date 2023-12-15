const express = require("express");

const ctrl = require("../../controllers/contacts");

const { validateBody, isValidId, isEmptyReqBody } = require("../../midlwares");

const { schemes } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrl.getAllContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemes.addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  isEmptyReqBody,
  validateBody(schemes.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemes.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
