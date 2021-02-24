const express = require("express");
const router = express.Router();
const Contacts = require("../../model/index");
const validate = require("./validation");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", validate.addContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id);
    if (contact) {
      await Contacts.removeContact(req.params.id);
      return res.json({
        status: "success",
        code: 200,
        message: "Contact deleted",
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", validate.updateContact, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    if (!body.name && !body.email && !body.phone) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing fields",
      });
    }
    const contactId = await Contacts.getContactById(id);
    if (contactId) {
      await Contacts.updateContact(id, body);
      const contact = await Contacts.getContactById(id);
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
