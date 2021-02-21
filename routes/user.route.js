const express = require("express");
const user = require("../controller/user.controller");
const router = express.Router();

router.post("/register", user.register);
router.post("/login", user.login);
router.post("/changeUserName", user.changeUserName);

module.exports = router;
