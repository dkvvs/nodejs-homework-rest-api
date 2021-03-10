const express = require("express");
const router = express.Router();
const validate = require("./validation");
const userController = require("../../../controllers/users");
const guard = require("../../../helpers/guard");

router.post("/auth/register", validate.regUser, userController.reg);
router.post("/auth/login", validate.loginUser, userController.login);
router.post("/auth/logout", guard, userController.logout);

router.get("/current", guard, userController.currentUser);

module.exports = router;
