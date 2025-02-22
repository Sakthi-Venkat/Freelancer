const express = require("express");
const { register , login , signOut} = require("../controller/authController")

const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/signout", signOut);

module.exports = router;