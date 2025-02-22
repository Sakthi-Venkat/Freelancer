const express = require('express');
const { createJob } = require('../controller/jobCreationController');
const { identifer} = require("../middleware/identifer")
const router = express.Router();

router.post("/job-create" , identifer(["client"]) , createJob);

module.exports = router;