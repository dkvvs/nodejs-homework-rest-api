const express = require("express");
const router = express.Router();
const validate = require("./validation");
const contactsController = require("../../controllers/contacts");

router
  .get("/", contactsController.listContacts)
  .post("/", validate.addContact, contactsController.addContact);

router
  .get("/:id", contactsController.getContactById)
  .delete("/:id", contactsController.removeContact)
  .patch("/:id", validate.updateContact, contactsController.updateContact);

module.exports = router;
