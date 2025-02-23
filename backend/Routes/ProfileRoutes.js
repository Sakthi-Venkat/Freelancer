const express   = require('express');
const router = express.Router();
const { identifer} = require("../middleware/identifer")
const {getProfile, updateProfile} = require("../controller/profileController")

router.get("/profile", identifer(['client','freelancer']) , getProfile );

 module.exports = router