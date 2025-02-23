const express   = require('express');
const router = express.Router();
const { identifer} = require("../middleware/identifer")
const {getProfile, updateProfile} = require("../controller/profileController")

router.get("/profile", identifer(['client','freelancer']) , getProfile );

router.put("/profile", identifer(['client','freelancer']) , updateProfile );

 module.exports = router