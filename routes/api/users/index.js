const express = require("express");
const router = express.Router();
const validate = require("./validation");
const userController = require("../../../controllers/users");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");

router.post("/auth/register", validate.regUser, userController.reg);
router.post("/auth/login", validate.loginUser, userController.login);
router.post("/auth/logout", guard, userController.logout);
router.get("/current", guard, userController.currentUser);

router.patch(
  "/avatars",
  [guard, upload.single("avatar"), validate.validateUploadAvatar],
  userController.avatars
);

router.get("/auth/verify/:token", userController.verify);

module.exports = router;
